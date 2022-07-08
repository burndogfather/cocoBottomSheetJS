'use strict';
class cocoButtomSheetJS{
	constructor({
		//입력데이터
		htmlcode,
		overlayer,
		min,
		max,
		autofilloffset
	}){
		//초기설정
		if(/(iPod|iPhone|Android|BlackBerry|SymbianOS|SCH-M\d+|Opera Mini|Windows CE|Nokia|SonyEricsson|webOS|PalmOS)/i.test(window.navigator.userAgent)){
			this.ismobile = true;
		}else{
			this.ismobile = false;
		}
		this.moving = false; //드래그중인지 flag
		this.is_show = false; //바텀시트가 열림감지
		this.code = htmlcode; //바텀시트에 들어갈 데이터
		this.overlayer = overlayer; //바텀시트 뒷배경을 넣을것인지
		this.min = min; //바텀시트의 최소높이값 (최소높이값보다 낮으면 꺼짐)
		this.max = max; //바텀시트의 최대높이값 (최대높이값보다 높으면 채워짐)
		this.autofilloffset = autofilloffset; //바텀시트 자동제어 오프셋크기
		
		this.translatePOS = 0; //바텀시트위치좌표
		this.starttouchY = 0; //마우스최초좌표
		this.newlytouchY = 0; //바로직전의 마우스좌표
		
		if(this.overlayer){
			//오버레이어 구성
			this.BSoverElement = document.createElement('article');
			this.BSoverElement.classList.add('cocoButtomSheet_overlayer');
			this.BSoverElement.addEventListener('click', (e)=>{
				//클릭시 닫음
				this.hide();
			});
		}
		this.BSElement = document.createElement('article');
		this.BSElement.classList.add('cocoButtomSheet');
		if(this.ismobile){
			this.BSElement.innerHTML = '<button class="cocoButtomSheet_handle"></button>'+ this.code;
		}else{
			this.BSElement.innerHTML = this.code;
		}
		
		document.querySelector('body').prepend(this.BSElement);
		
		if(this.overlayer){
			document.querySelector('body').prepend(this.BSoverElement);
		}
		
		//추가적인 스크립트
		this.jsData = null;
		this.callback = null;
		
		console.log('test');
		this.init();
	};
	
	//클래스 선언시 자동실행
	init(){
		//min 사이즈 재정의
		if(/^[0-9]+$/.test(this.min)){
			this.min = parseInt(this.min);
		}else{
			if(this.min.indexOf('%') !== -1){
				this.min = parseInt(this.min.replace('%',''))/100 * document.body.scrollHeight;
			}else if(this.min.indexOf('vh') !== -1){
				this.min = parseInt(this.min.replace('vh',''))/100 * window.innerHeight;
			}else if(this.min.indexOf('vw') !== -1){
				this.min = parseInt(this.min.replace('vw',''))/100 * window.innerWidth;
			}else{
				this.min = parseInt(this.min);
			}
		}
		
		//max 사이즈 재정의
		if(/^[0-9]+$/.test(this.max)){
			this.max = parseInt(this.max);
		}else{
			if(this.max.indexOf('%') !== -1){
				this.max = parseInt(this.max.replace('%',''))/100 * document.body.scrollHeight;
			}else if(this.max.indexOf('vh') !== -1){
				this.max = parseInt(this.max.replace('vh',''))/100 * window.innerHeight;
			}else if(this.max.indexOf('vw') !== -1){
				this.max = parseInt(this.max.replace('vw',''))/100 * window.innerWidth;
			}else{
				this.max = parseInt(this.max);
			}
		}
		
		
		//handle이벤트
		if(this.ismobile){
			this.BSElement.querySelector('.cocoButtomSheet_handle').addEventListener('touchstart', (e)=>{
				e.stopImmediatePropagation();
				e.stopPropagation();
				//클릭시작
				this.touchstart(e);
			});
			this.BSElement.querySelector('.cocoButtomSheet_handle').addEventListener('touchmove', (e)=>{
				e.stopImmediatePropagation();
				e.stopPropagation();
				//클릭움직임
				this.touchmoving(e);
			});
			this.BSElement.querySelector('.cocoButtomSheet_handle').addEventListener('touchend', (e)=>{
				e.stopImmediatePropagation();
				e.stopPropagation();
				//클릭끝남
				this.touchend(e);
			});
			this.BSElement.querySelector('.cocoButtomSheet_handle').addEventListener('touchcancel', (e)=>{
				e.stopImmediatePropagation();
				e.stopPropagation();
				//클릭끝남
				this.touchend(e);
			});
		}
	};
	
	//터치를 시작하는 순간 시작좌표를 수집
	touchstart(event){
		
		if(!this.moving){
			this.moving = true;
			let wh = window.innerHeight;
			if(event.touches[0].pageY <= 0){
				this.starttouchY = 0;
			}else if(event.touches[0].pageY >= wh){
				this.starttouchY = wh;
			}else{
				this.starttouchY = event.touches[0].pageY;
			}
			this.newlytouchY = this.starttouchY;
			
			this.BSElement.style.transition = 'none';
			
			let translate3d = this.BSElement.style.transform.match(/\(.*\)/gi)[0];
			translate3d = translate3d.split(',')[1];
			translate3d = translate3d.replace(/[^0-9|\-|.]/g,'');
			this.translatePOS = parseFloat(translate3d);
			console.log(this.translatePOS);
		}
		
	};
	
	//터치드래그 진행중
	touchmoving(event){
		if(this.moving){
			let wh = window.innerHeight;
			let pageY;
			let moveY;
			
			//터치드래그중인 상태에서의 마우스좌표구하기
			if(event.touches[0].pageY <= 0){
				pageY = 0;
			}else if(event.touches[0].pageY >= wh){
				pageY = wh;
			}else{
				pageY = event.touches[0].pageY;
			}
			
			//up / down 구분
			let up = false;
			if(this.newlytouchY > pageY){
				up = true;
			}else{
				up = false;
			}
			
			
			moveY = this.starttouchY - pageY;
			let calc = Math.round(this.translatePOS - moveY);
			let maxcalc = parseFloat('-'+this.max);
			let mincalc = parseFloat('-'+this.min);
			let whcalc = parseFloat('-'+wh);
			if(whcalc <= calc && maxcalc <= calc){
				this.BSElement.style.transform = 'translate(0, ' + calc + 'px)';
			}
			if(mincalc-this.autofilloffset < calc && !up){
				this.moving = false;
				this.hide();
			}
			if(maxcalc+this.autofilloffset > calc && up){
				this.BSElement.style.transform = 'translate(0, ' + maxcalc + 'px)';
			}
			
			this.newlytouchY = pageY;
			
		}
	};
	
	
	//터치드래그 끝남
	touchend(event){
		if(this.moving){
			this.moving = false;
			
			let translate3d = this.BSElement.style.transform.match(/\(.*\)/gi)[0];
			translate3d = translate3d.split(',')[1];
			translate3d = translate3d.replace(/[^0-9|\-|.]/g,'');
			this.translatePOS = parseFloat(translate3d);
			
		}
		
	};
	
	
	//htmlcode를 재정의
	sethtml(htmlcode){
		this.code = htmlcode;
		this.BSElement.innerHTML = this.BSElement.innerHTML + this.code;
	};
	
	//바텀시트 스타일재정의
	setcss(cssObject){
		let stylecssString = '';
		for(let key in cssObject){
			stylecssString += key+':'+cssObject[key]+';';
		}
		this.BSElement.setAttribute('style',stylecssString);
	};
	
	//바텀시트 스크립트추가
	setjs(jsdata){
		if(typeof jsdata === 'function'){
			this.jsData = jsdata;
		}
		if(typeof jsdata === 'string'){
			this.jsData = (new Function('return ' + jsdata))();
		}
	};
	
	//바텀시트 콜백스크립트추가
	setcallback(callback){
		if(typeof callback === 'function'){
			this.callback = callback;
		}
		if(typeof callback === 'string'){
			this.callback = (new Function('return ' + callback))();
		}
	};
	
	//htmlcode내용을 확인
	gethtml(){
		return this.code;
	};
	
	//모달창열림감지
	isvisible(){
		return this.is_show;
	};
	
	//바텀시트를 출력
	show(){
		if(!this.is_show){
			this.is_show = true;
			this.BSoverElement.classList.add('cocoButtonSheet_fadein');
			document.body.classList.add('cocoButtomSheetforbounse');
			if(this.ismobile){
				this.BSElement.style.transform = 'translate(0px, -'+this.min+'px)';
			}else{
				this.BSElement.style.transform = 'translate(0px, -100%)';
			}
			this.jsData();
			
		}
	};
	
	//바텀시트를 최대크기로 출력
	showmax(){
		if(!this.is_show){
			this.is_show = true;
			this.BSoverElement.classList.add('cocoButtonSheet_fadein');
			document.body.classList.add('cocoButtomSheetforbounse');
			if(this.ismobile){
				this.BSElement.style.transform = 'translate(0px, -'+this.max+'px)';
			}else{
				this.BSElement.style.transform = 'translate(0px, -100%)';
			}
			this.jsData();
		}
	};
	
	//바텀시트를 없애기
	hide(){
		if(this.is_show){
			this.is_show = false;
			this.BSoverElement.classList.remove('cocoButtonSheet_fadein');
			document.body.classList.remove('cocoButtomSheetforbounse');
			if(this.ismobile){
				this.BSElement.style.transform = 'translate(0px, -0px)';
			}else{
				this.BSElement.style.transform = 'translate(150%, -100%)';
			}
			this.BSElement.style.transition = 'all 0.1s ease-out';
			this.callback();
		}
	};
};
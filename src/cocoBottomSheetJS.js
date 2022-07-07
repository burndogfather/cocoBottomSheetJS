'use strict';
class cocoButtomSheetJS{
	constructor({
		//입력데이터
		htmlcode,
		overlayer,
		min,
		max
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
		
		this.translatePOS = 0; //바텀시트위치좌표
		this.starttouchY = 0; //마우스최초좌표
		
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
		this.BSElement.innerHTML = '<button class="cocoButtomSheet_handle"></button>'+ this.code;
		document.querySelector('body').prepend(this.BSElement);
		
		if(this.overlayer){
			document.querySelector('body').prepend(this.BSoverElement);
		}
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
				//클릭시작
				this.touchstart(e);
			});
			this.BSElement.addEventListener('touchmove', (e)=>{
				//클릭움직임
				this.touchmoving(e);
			});
			this.BSElement.addEventListener('touchend', (e)=>{
				//클릭끝남
				this.touchend(e);
			});
			this.BSElement.addEventListener('touchcancel', (e)=>{
				//클릭끝남
				this.touchend(e);
			});
		}else{
			this.BSElement.addEventListener('mousedown', (e)=>{
				//클릭시작
				this.touchstart(e);
			});
			this.BSElement.addEventListener('mousemove', (e)=>{
				//클릭움직임
				this.touchmoving(e);
			});
			this.BSElement.addEventListener('mouseup', (e)=>{
				//클릭끝남
				this.touchend(e);
			});
			this.BSElement.addEventListener('mouseleave', (e)=>{
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
			if(event.type === 'touchstart'){
				if(event.touches[0].pageY < 0){
					this.starttouchY = 0;
				}else if(event.touches[0].pageY > wh){
					this.starttouchY = wh;
				}else{
					this.starttouchY = event.touches[0].pageY;
				}
				
			}else if(event.type === 'mousedown'){
				if(event.pageY < 0){
					this.starttouchY = 0;
				}else if(event.pageY > wh){
					this.starttouchY = wh;
				}else{
					this.starttouchY = event.pageY;
				}
			}else{
				return null;
			}
			
			let translate3d = this.BSElement.style.transform.match(/\(.*\)/gi)[0];
			translate3d = translate3d.split(',')[1];
			translate3d = translate3d.replace(/[^0-9|\-|.]/g,'');
			this.translatePOS = parseFloat(translate3d);
			
		}
		
	};
	
	//터치드래그 진행중
	touchmoving(event){
		if(this.moving){
			let wh = window.innerHeight;
			let pageY;
			let moveY;
			
			//터치드래그중인 상태에서의 마우스좌표구하기
			if(event.type === 'touchmove'){
				if(event.touches[0].pageY < 0){
					pageY = 0;
				}else if(event.touches[0].pageY > wh){
					pageY = wh;
				}else{
					pageY = event.touches[0].pageY;
				}
			}else if(event.type === 'mousemove'){
				if(event.pageY < 0){
					pageY = 0;
				}else if(event.pageY > wh){
					pageY = wh;
				}else{
					pageY = event.pageY;
				}
			}else{
				return null;	
			}
			
			moveY = this.starttouchY - pageY;
			let calc = Math.round(this.translatePOS - moveY);
			let maxcalc = parseFloat('-'+this.max);
			let mincalc = parseFloat('-'+this.min);
			let whcalc = parseFloat('-'+wh);
			if(whcalc <= calc && maxcalc <= calc){
				this.BSElement.style.transform = 'translate(0, ' + calc + 'px)';
				this.BSElement.style.transition = 'none';
			}
			if(mincalc+50 < calc){
				this.moving = false;
				this.hide();
			}
			
		}
	};
	
	
	//터치드래그 끝남
	touchend(event){
		if(this.moving){
			this.moving = false;
			console.log('touchend!');
			let wh = window.innerHeight;
			
			let translate3d = this.BSElement.style.transform.match(/\(.*\)/gi)[0];
			translate3d = translate3d.split(',')[1];
			translate3d = translate3d.replace(/[^0-9|\-|.]/g,'');
			this.translatePOS = parseFloat(translate3d);
			
			//터치드래그중인 상태에서의 마우스좌표구하기
			if(event.type === 'touchmove'){
				if(event.touches[0].pageY < 0){
					this.starttouchY = 0;
				}else if(event.touches[0].pageY > wh){
					this.starttouchY = wh;
				}else{
					this.starttouchY = event.touches[0].pageY;
				}
			}else if(event.type === 'mousemove'){
				if(event.pageY < 0){
					this.starttouchY = 0;
				}else if(event.pageY > wh){
					this.starttouchY = wh;
				}else{
					this.starttouchY = event.pageY;
				}
			}else{
				return null;	
			}
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
	
	//htmlcode내용을 확인
	gethtml(){
		return this.code;
	};
	
	//바텀시트를 출력
	show(){
		if(!this.is_show){
			this.is_show = true;
			this.BSoverElement.classList.add('cocoButtonSheet_fadein');
			document.body.classList.add('cocoButtomSheetforbounse');
			this.BSElement.style.transform = 'translate(0px, -'+this.min+'px)';
		}
	};
	
	//바텀시트를 없애기
	hide(){
		if(this.is_show){
			this.is_show = false;
			this.BSoverElement.classList.remove('cocoButtonSheet_fadein');
			document.body.classList.remove('cocoButtomSheetforbounse');
			this.BSElement.style.transform = 'translate(0px, -0px)';
			this.BSElement.style.transition = 'all 0.1s ease-out';
		}
	};
};
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
		this.is_show = false; //바텀시트가 열림감지
		this.code = htmlcode; //바텀시트에 들어갈 데이터
		this.overlayer = overlayer; //바텀시트 뒷배경을 넣을것인지
		this.min = min; //바텀시트의 최소높이값 (최소높이값보다 낮으면 꺼짐)
		this.max = max; //바텀시트의 최대높이값 (최대높이값보다 높으면 채워짐)
		
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
		this.BSElement.innerHTML = '<button class="cocoButtomSheet_handle"></button>' + this.code;
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
				console.log(this.min);
			}else if(this.min.indexOf('vh') !== -1){
				this.min = parseInt(this.min.replace('vh',''))/100 * document.documentElement.clientHeight;
			}else if(this.min.indexOf('vw') !== -1){
				this.min = parseInt(this.min.replace('vw',''))/100 * document.documentElement.clientWidth;
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
				this.max = parseInt(this.max.replace('vh',''))/100 * document.documentElement.clientHeight;
			}else if(this.max.indexOf('vw') !== -1){
				this.max = parseInt(this.max.replace('vw',''))/100 * document.documentElement.clientWidth;
			}else{
				this.max = parseInt(this.max);
			}
		}
		
		//handle이벤트
		if(/(iPod|iPhone|Android|BlackBerry|SymbianOS|SCH-M\d+|Opera Mini|Windows CE|Nokia|SonyEricsson|webOS|PalmOS)/i.test(window.navigator.userAgent)){
			this.BSElement.addEventListener('touchstart', this.touchstart);
		}else{
			this.BSElement.addEventListener('mousedown', this.touchstart);
		}
	};
	
	//터치를 시작하는 순간 시작좌표를 수집
	touchstart(event){
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
		
		if(/(iPod|iPhone|Android|BlackBerry|SymbianOS|SCH-M\d+|Opera Mini|Windows CE|Nokia|SonyEricsson|webOS|PalmOS)/i.test(window.navigator.userAgent)){
			document.body.addEventListener('touchmove', this.touchmoving);
		}else{
			document.body.addEventListener('mousemove', this.touchmoving);
		}
	};
	
	//터치드래그 진행중
	touchmoving(event){
		let wh = window.innerHeight;
		let pageY;
		let moveY;
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
		
		if(this.starttouchY > pageY){
			console.log('up');
			moveY = this.starttouchY - pageY;
			console.log(moveY);
		}else if(this.starttouchY < pageY){
			console.log('down');
			moveY = pageY - this.starttouchY;
			console.log(moveY);
		}else{
			
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
		let style = this.BSElement.getAttribute('style');
		this.BSElement.setAttribute('style',style + "transform:translate(0px, -"+this.min+"px);");

		if(!this.is_show){
			document.querySelector('body').prepend(this.BSElement);
			if(this.overlayer){
				document.querySelector('body').prepend(this.BSoverElement);
			}
			this.is_show = true;
		}
	};
	
	//바텀시트를 없애기
	hide(){
		if(this.is_show){
			document.body.removeChild(this.BSElement);
			if(this.overlayer){
				document.body.removeChild(this.BSoverElement);
			}
			this.is_show = false;
		}
	};
};
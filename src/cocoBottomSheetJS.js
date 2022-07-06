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
		this.is_show = false;
		this.code = htmlcode;
		this.overlayer = overlayer;
		this.min = min;
		this.max = max;
		
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
	
	touchstart(event){
		console.log('touchstart');
	}
	
	//htmlcode를 재정의
	sethtml(htmlcode){
		this.code = htmlcode;
		this.BSElement.innerHTML = this.BSElement.innerHTML + this.code;
	};
	
	//버튼시트 스타일재정의
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
	
	//Bottomsheet를 출력
	show(){
		let style = this.BSElement.getAttribute('style');
		this.BSElement.setAttribute('style',style+"transform:translate(0px, -"+this.min+"px);");

		if(!this.is_show){
			document.querySelector('body').prepend(this.BSElement);
			if(this.overlayer){
				document.querySelector('body').prepend(this.BSoverElement);
			}
			this.is_show = true;
		}
	};
	
	//Bottomsheet를 없애기
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
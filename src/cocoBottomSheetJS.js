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
		this.max = max;
		this.min = min;
		if(overlayer){
			this.BSoverElement = document.createElement('article');
			this.BSoverElement.classList.add('cocoButtomSheet_overlayer');
			this.BSoverElement.addEventListener('click', (e)=>{
				this.hide();
			});
		}
		this.BSElement = document.createElement('article');
		this.BSElement.classList.add('cocoButtomSheet');
		this.BSElement.innerHTML = '<button class="cocoButtomSheet_handle"></button>';
	}
	
	//htmlcode를 재정의
	sethtml(htmlcode){
		this.code = htmlcode;
	}
	
	//버튼시트 스타일재정의
	setcss(cssObject){
		let stylecssString = '';
		for(let key in cssObject){
			stylecssString += key+':'+cssObject[key];
		}
		this.BSElement.setAttribute('style',stylecssString);
	}
	
	//htmlcode내용을 확인
	gethtml(){
		return this.code;
	}
	
	//Bottomsheet를 출력
	show(){
		if(!this.is_show){
			document.querySelector('body').prepend(this.BSElement);
			if(this.overlayer){
				document.querySelector('body').prepend(this.BSoverElement);
			}
			this.is_show = true;
		}
	}
	
	//Bottomsheet를 없애기
	hide(){
		if(this.is_show){
			document.body.removeChild(this.BSElement);
			if(this.overlayer){
				document.body.removeChild(this.BSoverElement);
			}
			this.is_show = false;
		}
	}
};
'use strict';
class cocoButtomSheetJS{
	constructor({
		htmlcode,
		overlayer
	}){
		this.overlayer = overlayer;
		if(overlayer){
			this.BSoverElement = document.createElement('article');
			this.BSoverElement.classList.add('cocoButtomSheet');
			this.BSoverElement.addEventListener('click', function(){
				this.hide;
			});
		}
		this.code = htmlcode;
		
	}
	//htmlcode를 재정의
	sethtml(htmlcode){
		this.code = htmlcode;
	}
	setcss(cssObject){
		console.log(cssObject);
	}
	//htmlcode내용을 확인
	gethtml(){
		return this.code;
	}
	//Bottomsheet를 출력
	show(){
		if(this.overlayer){
			document.querySelector('body').prepend(this.BSoverElement);
		}
	}
	//Bottomsheet를 없애기
	hide(){
		if(this.overlayer){
			document.body.removeChild(this.BSoverElement);
		}
		
	}
};
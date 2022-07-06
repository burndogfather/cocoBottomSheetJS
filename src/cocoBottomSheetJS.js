'use strict';
class cocoButtomSheetJS{
	constructor({
		htmlcode,
		overlayer
	}){
		this.BSElement = document.createElement('article');
		this.BSElement.classList.add('cocoButtomSheet');
		this.BSElement.addEventListener('click', function(){
			this.hide;
		});
		console.log('constructor');
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
		document.querySelector('body').prepend(this.BSElement);
	}
	//Bottomsheet를 없애기
	hide(){
		document.body.removeChild(this.BSElement);
		return null;
	}
};
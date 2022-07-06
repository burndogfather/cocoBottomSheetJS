'use strict';
class cocoButtomSheetJS{
	constructor(code) {
		this.BSElement = document.createElement('article');
		this.BSElement.classList.add('cocoButtomSheet');
		
		console.log('constructor');
		this.code = code;
	}
	//htmlcode를 재정의
	sethtml(code){
		this.code = code;
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
		
	}
};
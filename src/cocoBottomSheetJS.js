'use strict';
class cocoButtomSheetJS{
	constructor(code) {
		this.BSElement = document.createElement('article');
		this.BSElement.classList.add('cocoButtomSheet');
		console.log('constructor');
		this.code = code;
	}
	sethtml(code){
		this.code = code;
	}
	gethtml(){
		return this.code;
	}
	show(){
		console.log(this.code);
		document.querySelector('body').prepend(this.BSElement);
	}
	hide(){
		
	}
};
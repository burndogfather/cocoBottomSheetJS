'use strict';
class cocoButtomSheetJS{
	constructor(code) {
		this.BSElement = document.createElement('article');
		console.log('constructor');
		this.code = code;
	}
	sethtml(code){
		this.code = code;
	}
	gethtml(){
		return this.code;
	}
	get initdom(){
		console.log('initdom');
		document.body.innerHTML = 'test';
	}
	show(){
		console.log(this.code);
		document.querySelector('body').prepend(this.BSElement);
	}
	hide(){
		
	}
};
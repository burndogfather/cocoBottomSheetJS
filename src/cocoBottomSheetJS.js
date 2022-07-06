'use strict';
class cocoButtomSheetJS{
	constructor(name,age, city) {
		console.log('construtor');
		this.name = name;
		this.age = age;
		this.city = city;
	}
	
	gethtmlcode(code){
		console.log('gethtmlcode');
		this.sethtml = code;
	}
	set sethtml(code){
		console.log('sethtml');
		document.body.innerHTML = code;
	}
	get initdom(){
		console.log('initdom');
		document.body.innerHTML = 'test';
	}
	show(){
		console.log('show');
	}
};
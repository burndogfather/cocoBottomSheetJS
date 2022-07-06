'use strict';
class cocoButtomSheetJS{
	gethtmlcode(code){
		this.sethtml = code;
	}
	set sethtml(code){
		document.body.innerHTML = code;
	}
	get initdom(){
		console.log('initdom');
		document.body.innerHTML = 'test';
	}
	show(){
		
	}
};
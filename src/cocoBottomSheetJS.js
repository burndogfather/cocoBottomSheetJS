'use strict';
class cocoButtomSheetJS{
	set sethtml(code){
		this._code = code;
	}
	get initdom(){
		console.log('initdom');
		document.body.innerHTML = 'test';
	}
	show(){
		document.body.innerHTML = this._code;
	}
};
'use strict';
class cocoButtomSheetJS{
	set sethtml(code){
		this._code = code;
	}
	get initdom(){
		document.body.innerHTML = this._code;
	}
};
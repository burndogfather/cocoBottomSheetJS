'use strict';
class cocoButtomSheetJS{
	sethtml(code){
		this.code = code;
	}
	get initdom(){
		document.body.innerHTML = code;
	}
};
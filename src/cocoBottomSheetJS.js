'use strict';
class cocoButtomSheetJS{
	set sethtml(code){
		this.code = code;
	}
	get initdom(){
		document.body.innerHTML = this.code;
	}
};
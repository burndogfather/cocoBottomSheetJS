'use strict';
class cocoButtomSheetJS{
	constructor({
		htmlcode,
		overlayer
	}){
		this.overlayer = overlayer;
		if(overlayer){
			this.BSoverElement = document.createElement('article');
			this.BSoverElement.classList.add('cocoButtomSheet_overlayer');
			this.BSoverElement.addEventListener('click', function(){
				this.hide;
			});
		}
		this.BSElement = document.createElement('article');
		this.BSElement.classList.add('cocoButtomSheet');
		this.BSElement.innerHTML = '<button class="cocoButtomSheet_handle"></button>';
		this.code = htmlcode;
		
	}
	//htmlcode를 재정의
	sethtml(htmlcode){
		this.code = htmlcode;
	}
	setcss(cssObject){
		console.log(cssObject);
		let stylecssString = '';
		for(let key in cssObject){
			stylecssString += key+':'+cssObject[key];
		}
		this.BSElement.setAttribute('style',stylecssString);
	}
	//htmlcode내용을 확인
	gethtml(){
		return this.code;
	}
	//Bottomsheet를 출력
	show(){
		document.querySelector('body').prepend(this.BSElement);
		if(this.overlayer){
			document.querySelector('body').prepend(this.BSoverElement);
		}
		
	}
	//Bottomsheet를 없애기
	hide(){
		document.body.removeChild(this.BSElement);
		if(this.overlayer){
			document.body.removeChild(this.BSoverElement);
		}
		
	}
};
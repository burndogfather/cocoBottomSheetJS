'use strict';
class cocoButtomSheetJS{
	constructor({
		//입력데이터
		htmlcode,
		overlayer,
		min,
		max
	}){
		//초기설정
		this.is_show = false;
		this.code = htmlcode;
		this.overlayer = overlayer;
		this.min = min;
		this.max = max;
		
		if(overlayer){
			//오버레이어 구성
			this.BSoverElement = document.createElement('article');
			this.BSoverElement.classList.add('cocoButtomSheet_overlayer');
			this.BSoverElement.addEventListener('click', (e)=>{
				//클릭시 닫음
				this.hide();
			});
		}
		this.BSElement = document.createElement('article');
		this.BSElement.classList.add('cocoButtomSheet');
		this.BSElement.innerHTML = '<button class="cocoButtomSheet_handle"></button>';
	}
	
	//htmlcode를 재정의
	sethtml(htmlcode){
		this.code = htmlcode;
	}
	
	//버튼시트 스타일재정의
	setcss(cssObject){
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
		let minHeight = 0;
		let maxHeight = 0;
		if(/^[0-9]+$/.test(this.min)){
			minHeight = parseInt(this.min);
		}else{
			if(this.min.indexOf('%') !== -1){
				minHeight = parseInt(this.min.replace('%',''))/100 * document.body.scrollHeight;
				console.log(minHeight);
			}else if(this.min.indexOf('vh') !== -1){
				minHeight = parseInt(this.min.replace('vh',''))/100 * document.documentElement.clientHeight;
			}else if(this.min.indexOf('vw') !== -1){
				minHeight = parseInt(this.min.replace('vw',''))/100 * document.documentElement.clientWidth;
			}else{
				minHeight = parseInt(this.min);
			}
		}
		this.BSElement.style.transform = 'translate(0px, -'+minHeight+'px);';
		
		if(/^[0-9]+$/.test(this.max)){
			maxHeight = parseInt(this.max);
		}else{
			if(this.max.indexOf('%') !== -1){
				maxHeight = parseInt(this.max.replace('%',''))/100 * document.body.scrollHeight;
			}else if(this.max.indexOf('vh') !== -1){
				maxHeight = parseInt(this.max.replace('vh',''))/100 * document.documentElement.clientHeight;
			}else if(this.max.indexOf('vw') !== -1){
				maxHeight = parseInt(this.max.replace('vw',''))/100 * document.documentElement.clientWidth;
			}else{
				maxHeight = parseInt(this.max);
			}
		}
		
		if(!this.is_show){
			document.querySelector('body').prepend(this.BSElement);
			if(this.overlayer){
				document.querySelector('body').prepend(this.BSoverElement);
			}
			this.is_show = true;
		}
	}
	
	//Bottomsheet를 없애기
	hide(){
		if(this.is_show){
			document.body.removeChild(this.BSElement);
			if(this.overlayer){
				document.body.removeChild(this.BSoverElement);
			}
			this.is_show = false;
		}
	}
};
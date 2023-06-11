'use strict';
class cocoBottomSheetJS{
	constructor({
		//입력데이터
		htmlcode,
		overlayer,
		min,
		max,
		autofilloffset,
		notclose
	}){
		
		//초기설정
		if(/(iPod|iPhone|Android|BlackBerry|SymbianOS|SCH-M\d+|Opera Mini|Windows CE|Nokia|SonyEricsson|webOS|PalmOS)/i.test(window.navigator.userAgent)){
			this.ismobile = true;
		}else{
			this.ismobile = false;
		}
		
		//닫을수 있는 바텀시트인지
		if(typeof notclose === 'boolean'){
			this.notclose = notclose;
		}else{
			this.notclose = false;
		}
		
		this.holdon = false; //움직임 고정 flag
		this.moving = false; //드래그중인지 flag
		this.is_show = false; //바텀시트가 열림감지
		this.code = htmlcode; //바텀시트에 들어갈 데이터
		this.overlayer = overlayer; //바텀시트 뒷배경을 넣을것인지
		this.min = min; //바텀시트의 최소높이값 (최소높이값보다 낮으면 꺼짐)
		this.max = max; //바텀시트의 최대높이값 (최대높이값보다 높으면 채워짐)
		this.autofilloffset = autofilloffset; //바텀시트 자동제어 오프셋크기
		
		this.translatePOS = 0; //바텀시트위치좌표
		this.starttouchY = 0; //마우스최초좌표
		this.newlytouchY = 0; //바로직전의 마우스좌표
		
		this.BSElement = document.createElement('article');
		this.BSElement.classList.add('cocoBottomSheet');
		
		this.BSoverElement = document.createElement('article');
		this.BSoverElement.classList.add('cocoBottomSheet_overlayer');
		if(!this.notclose && !this.holdon){
			this.BSoverElement.addEventListener('click', (e)=>{
				//클릭시 닫음
				this.hide();
			});
		}
		
		this.BSbuttonElement = document.createElement('button');
		this.BSbuttonElement.classList.add('cocoBottomSheet_handledesign');
		this.BSbuttonElement.classList.add('cocoBottomSheet_handle');
		this.BSElement.appendChild(this.BSbuttonElement);
	
		//추가적인 스크립트
		this.jsData = null;
		this.callback = null;
		this.init();
	};
	
	
	//클래스 선언시 자동실행
	init(){
		
		if(this.ismobile){
			this.BSElement.innerHTML = this.code;
			
		}else{
			this.BSElement.innerHTML = this.code;
			this.BSbuttonElement.style.display = 'none';
		}
		
		document.querySelector('body').prepend(this.BSElement);
		if(this.overlayer){
			document.querySelector('body').prepend(this.BSoverElement);
		}
		
		//min 사이즈 재정의
		if(/^[0-9]+$/.test(this.min)){
			this.min = parseInt(this.min);
		}else{
			if(this.min.indexOf('%') !== -1){
				this.min = parseInt(this.min.replace('%',''))/100 * document.body.scrollHeight;
			}else if(this.min.indexOf('vh') !== -1){
				this.min = parseInt(this.min.replace('vh',''))/100 * window.innerHeight;
			}else if(this.min.indexOf('vw') !== -1){
				this.min = parseInt(this.min.replace('vw',''))/100 * window.innerWidth;
			}else{
				this.min = parseInt(this.min);
			}
		}
		
		//max 사이즈 재정의
		if(/^[0-9]+$/.test(this.max)){
			this.max = parseInt(this.max);
		}else{
			if(this.max.indexOf('%') !== -1){
				this.max = parseInt(this.max.replace('%',''))/100 * document.body.scrollHeight;
			}else if(this.max.indexOf('vh') !== -1){
				this.max = parseInt(this.max.replace('vh',''))/100 * window.innerHeight;
			}else if(this.max.indexOf('vw') !== -1){
				this.max = parseInt(this.max.replace('vw',''))/100 * window.innerWidth;
			}else{
				this.max = parseInt(this.max);
			}
		}
		
		
		//handle이벤트
		if(this.ismobile){
			this.BSbuttonElement.addEventListener('touchstart', (e)=>{
				e.stopImmediatePropagation();
				e.stopPropagation();
				//클릭시작
				this.touchstart(e);
			});
			this.BSbuttonElement.addEventListener('touchmove', (e)=>{
				e.stopImmediatePropagation();
				e.stopPropagation();
				//클릭움직임
				this.touchmoving(e);
			});
			this.BSbuttonElement.addEventListener('touchend', (e)=>{
				e.stopImmediatePropagation();
				e.stopPropagation();
				//클릭끝남
				this.touchend(e);
			});
			this.BSbuttonElement.addEventListener('touchcancel', (e)=>{
				e.stopImmediatePropagation();
				e.stopPropagation();
				//클릭끝남
				this.touchend(e);
			});
		}
	};
	
	//터치를 시작하는 순간 시작좌표를 수집
	touchstart(event){
		
		if(!this.moving && !this.holdon){
			this.moving = true;
			let wh = document.body.scrollHeight;
			if(event.touches[0].pageY <= 0){
				this.starttouchY = 0;
			}else if(event.touches[0].pageY >= wh){
				this.starttouchY = wh;
			}else{
				this.starttouchY = event.touches[0].pageY;
			}
			this.newlytouchY = this.starttouchY;
			
			let translate3d = this.BSElement.style.transform.match(/\(.*\)/gi)[0];
			translate3d = translate3d.split(',')[1];
			translate3d = translate3d.replace(/[^0-9|\-|.]/g,'');
			this.translatePOS = parseFloat(translate3d);
		}
		
	};
	
	//터치드래그 진행중
	touchmoving(event){
		
		if(this.moving && !this.holdon){
			let wh = document.body.scrollHeight;
			let pageY;
			let moveY;
			
			//터치드래그중인 상태에서의 마우스좌표구하기
			if(event.touches[0].pageY <= 0){
				pageY = 0;
			}else{
				pageY = event.touches[0].pageY;
			}
			
			//up / down 구분
			let up = false;
			if(this.newlytouchY > pageY){
				up = true;
			}else{
				up = false;
			}
			
			moveY = this.starttouchY - pageY;
			let calc = Math.round(this.translatePOS - moveY);
			let maxcalc = parseFloat('-'+this.max);
			let mincalc = parseFloat('-'+this.min);
			let whcalc = parseFloat('-'+wh);
			if(whcalc <= calc && maxcalc <= calc){
				this.BSElement.style.transition = 'none';
				this.BSElement.style.transform = 'translate(0, ' + calc + 'px)';
			}
			if(mincalc-this.autofilloffset < calc && !up){
				this.moving = false;
				if(!this.notclose){
					this.hide();
					
				}else{
					this.showmin();
				}
				
			}
			if(maxcalc+this.autofilloffset > calc && up){
				this.BSElement.style.transition = 'all 0.15s ease-out';
				this.BSElement.style.transform = 'translate(0, ' + maxcalc + 'px)';
			}
			
			this.newlytouchY = pageY;
			
		}
	};
	
	
	//터치드래그 끝남
	touchend(event){
		if(this.moving && !this.holdon){
			this.moving = false;
			let translate3d = this.BSElement.style.transform.match(/\(.*\)/gi)[0];
			translate3d = translate3d.split(',')[1];
			translate3d = translate3d.replace(/[^0-9|\-|.]/g,'');
			this.translatePOS = parseFloat(translate3d);
		}
		
	};
	
	
	//htmlcode를 재정의
	sethtml(htmlcode){
		this.code = htmlcode;
		
		this.BSElement.innerHTML = this.code;
		this.BSElement.appendChild(this.BSbuttonElement);
	};
	
	//바텀시트 스타일재정의
	setcss(cssObject){
		let stylecssString = '';
		for(let key in cssObject){
			stylecssString += key+':'+cssObject[key]+';';
		}
		this.BSElement.setAttribute('style',stylecssString);
	};
	
	//바텀시트 스크립트추가
	setjs(jsdata){
		
		if(typeof jsdata === 'function'){
			this.jsData = jsdata;
		}
		if(typeof jsdata === 'string'){
			this.jsData = (new Function('return ' + jsdata))();
		}
	};
	
	//바텀시트 콜백스크립트추가
	setcallback(callback){
		if(typeof callback === 'function'){
			this.callback = callback;
		}
		if(typeof callback === 'string'){
			this.callback = (new Function('return ' + callback))();
		}
	};
	
	//바텀시트를 제어하는 요소를 추가
	anotherHandle(Element){
		//handle이벤트
		if(this.ismobile && typeof Element == 'object'){
			Element.classList.add('cocoBottomSheet_handle');
			Element.addEventListener('touchstart', (e)=>{
				e.stopImmediatePropagation();
				e.stopPropagation();
				//클릭시작
				this.touchstart(e);
			});
			Element.addEventListener('touchmove', (e)=>{
				e.stopImmediatePropagation();
				e.stopPropagation();
				//클릭움직임
				this.touchmoving(e);
			});
			Element.addEventListener('touchend', (e)=>{
				e.stopImmediatePropagation();
				e.stopPropagation();
				//클릭끝남
				this.touchend(e);
			});
			Element.addEventListener('touchcancel', (e)=>{
				e.stopImmediatePropagation();
				e.stopPropagation();
				//클릭끝남
				this.touchend(e);
			});
		}
		
	};
	
	//htmlcode내용을 확인
	gethtml(){
		return this.code;
	};
	
	//모달창열림감지
	isvisible(){
		return this.is_show;
	};
	
	//바텀시트를 출력
	show(){
		if(!this.is_show && !this.holdon){
			this.is_show = true;
			this.BSoverElement.classList.add('cocoBottomSheet_fadein');
			if(this.ismobile){
				this.BSElement.style.transform = 'translate(0px, -'+this.min+'px)';
			}else{
				this.BSElement.style.transform = 'translate(0px, -100%)';
			}
			if(this.jsData !== null){
				this.jsData();
			}
			
			//innerHtml에 script를 강제로 넣을수 없기 때문에 별도로 Append해줘야함
			let dom = document.createElement('div');
			dom.innerHTML = this.code;
			let script = dom.querySelectorAll('script');
			dom = null;
			let script_src = new Array();
			let script_plain = '';
			for(let i=0; i<script.length; i++){
				if(script[i].src){
					script_src.push(script[i].src);
				}
				if(script[i].innerText){
					script_plain += script[i].innerText;
				}
			}
			script = document.createElement('script');
			script.appendChild(document.createTextNode(script_plain));
			script_plain = null;
			script.type = 'text/javascript';
			script.async = true;
			script.classList.add('cocoBottomSheetScripts');
			document.body.appendChild(script);
			for(let i=0; i<script_src.length; i++){
				script = document.createElement('script');
				script.type = 'text/javascript';
				script.async = true;
				script.src = script_src[i];
				script.classList.add('cocoBottomSheetScripts');
				document.body.appendChild(script);
			}
			script_src = null;
			script = null;
			
			console.log(window.pageYOffset);
			document.querySelector('html').style.overflow = 'hidden';
			document.querySelector('html').style.position = 'fixed';
			document.querySelector('html').style.top = '-'+window.pageYOffset;
			document.querySelector('html').style.left = '0';
			document.querySelector('html').style.right = '0';
		}
	};
	
	//바텀시트를 최소크기로 출력
	showmin(){
		if(this.is_show && !this.holdon){
			this.BSElement.style.transition = 'all 0.15s ease-out';
			if(this.ismobile){
				this.BSElement.style.transform = 'translate(0px, -'+this.min+'px)';
			}else{
				this.BSElement.style.transform = 'translate(0px, -100%)';
			}
			
			document.querySelector('html').style.overflow = 'hidden';
			document.querySelector('html').style.position = 'fixed';
			document.querySelector('html').style.top = '-'+window.pageYOffset;
			document.querySelector('html').style.left = '0';
			document.querySelector('html').style.right = '0';
		}
	}
	
	//바텀시트를 최대크기로 출력
	showmax(){
		if(!this.is_show && !this.holdon){
			this.is_show = true;
			this.BSoverElement.classList.add('cocoBottomSheet_fadein');
			if(this.ismobile){
				this.BSElement.style.transform = 'translate(0px, -'+this.max+'px)';
			}else{
				this.BSElement.style.transform = 'translate(0px, -100%)';
			}
			if(this.jsData !== null){
				this.jsData();
			}
			
			//innerHtml에 script를 강제로 넣을수 없기 때문에 별도로 Append해줘야함
			let dom = document.createElement('div');
			dom.innerHTML = this.code;
			let script = dom.querySelectorAll('script');
			dom = null;
			let script_src = new Array();
			let script_plain = '';
			for(let i=0; i<script.length; i++){
				if(script[i].src){
					script_src.push(script[i].src);
				}
				if(script[i].innerText){
					script_plain += script[i].innerText;
				}
			}
			script = document.createElement('script');
			script.appendChild(document.createTextNode(script_plain));
			script_plain = null;
			script.type = 'text/javascript';
			script.async = true;
			script.classList.add('cocoBottomSheetScripts');
			document.body.appendChild(script);
			for(let i=0; i<script_src.length; i++){
				script = document.createElement('script');
				script.type = 'text/javascript';
				script.async = true;
				script.src = script_src[i];
				script.classList.add('cocoBottomSheetScripts');
				document.body.appendChild(script);
			}
			script_src = null;
			script = null;
			
		}else{
			if(this.ismobile){
				this.BSElement.style.transform = 'translate(0px, -'+this.max+'px)';
			}else{
				this.BSElement.style.transform = 'translate(0px, -100%)';
			}
		}
		
		document.querySelector('html').style.overflow = 'hidden';
		document.querySelector('html').style.position = 'fixed';
		document.querySelector('html').style.top = '-'+window.pageYOffset;
		document.querySelector('html').style.left = '0';
		document.querySelector('html').style.right = '0';
	};
	
	//바텀시트를 없애기
	hide(){
		if(this.is_show && !this.holdon){
			this.is_show = false;
			this.BSElement.style.transition = 'all 0.15s ease-out';
			if(this.ismobile){
				this.BSElement.style.transform = 'translate(0px, -0px)';
			}else{
				this.BSElement.style.transform = 'translate(150%, -100%)';
			}
			if(this.callback !== null){
				this.callback();
			}
			let scripts = document.body.querySelectorAll('.cocoBottomSheetScripts');
			for(let i=0; i<scripts.length; i++){
				document.body.removeChild(scripts[i]);
			}
			scripts = null;
			this.BSoverElement.classList.remove('cocoBottomSheet_fadein');
			
			document.querySelector('html').style.removeProperty('overflow');
			document.querySelector('html').style.removeProperty('position');
			document.querySelector('html').style.removeProperty('top');
			document.querySelector('html').style.removeProperty('left');
			document.querySelector('html').style.removeProperty('right');
		}
		return null;
	};
	
	//바텀시트 조작금지
	hold(flag){
		if(typeof flag === 'boolean'){
			this.holdon = flag;
			if(flag && this.ismobile){
				this.BSElement.removeChild(this.BSbuttonElement);
			}else{
				if(this.ismobile){
					this.BSElement.appendChild(this.BSbuttonElement);
				}
			}
		}
	};
	
	//닫을수 있는 바텀시트의 상태변경
	setnotclose(flag){
		if(typeof flag === 'boolean'){
			this.notclose = flag;
		}
	};
};
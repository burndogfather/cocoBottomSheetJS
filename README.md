# cocoBottomSheetJS
Similar to the bottom sheet of iOS, it can be implemented with JavaScript🔥
   
[NOTICE] This component is written in VanillaJS!
[Reference] This component supports reactive UI!
   
   
<img src="https://user-images.githubusercontent.com/101985768/177700975-3a01a5f5-7a1c-45f6-8ebc-aeba68f301de.gif"  width="300"/>
Example of mobile  
  
  
![Example of desktop](https://user-images.githubusercontent.com/101985768/177701035-3c437217-79f8-4059-9488-5428276171b2.gif)  
Example of desktop  
  
  
------  
  
### Try demo!
  
[BottomSheet with iframe](https://git.coco.sqs.kr/cocoBottomSheetJS/example/)  
  
------  
  
# Getting Start (1~2 Step)  
  
### 1. Attach the following code inside the ```<head>```tag.
```html

<!-- Specify UTF-8 language set -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<!-- cocoBottomSheetJS library -->
<link rel='stylesheet' href='https://git.coco.sqs.kr/cocoBottomSheetJS/src/cocoBottomSheetJS.css'>
<script src='https://git.coco.sqs.kr/cocoBottomSheetJS/src/cocoBottomSheetJS.js'></script>

```

### 2. Write a javascript using the following code example
```javascript
let buttomsheet;
function loadCode(_this){
	buttomsheet = new cocoButtomSheetJS({
		htmlcode:frames[_this.getAttribute('name')].document.body.innerHTML,
		overlayer:true,
		min:'30vh',
		max:'85vh'
	});
	buttomsheet.setcss({
		'background-color':'#111',
		'color':'#f1f1f1'
	});
	buttomsheet.setjs(function(){
		let check_box = document.querySelector('.check_box');
		check_box.scrollTo({top:0, left:0, behavior:'instant'});
		console.log('open!!!');
	});
}
```
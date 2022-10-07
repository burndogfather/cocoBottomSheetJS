# cocoBottomSheetJS
<img src="https://img.shields.io/github/size/squarehacker/cocoBottomSheetJS/src/cocoBottomSheetJS.js"/>
   
Similar to the bottom sheet of iOS, it can be implemented with JavaScript🔥
   
### Features  
   
- It's written in vanilla JS
- Corresponds to the responsive UI
- Fast using css-based animation
   
------  
   
   
<img src="https://user-images.githubusercontent.com/101985768/177700975-3a01a5f5-7a1c-45f6-8ebc-aeba68f301de.gif"  width="300"/>   
Example of mobile   
   
![Example of desktop](https://user-images.githubusercontent.com/101985768/177701035-3c437217-79f8-4059-9488-5428276171b2.gif)  
Example of desktop   
  
   
------   
   
### Try demo!
  
[BottomSheet with iframe](https://git.coco.sqs.kr/cocoBottomSheetJS/example/)  
  
------  
  
# Getting Start (1~3 Step)  
  
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
let bottomsheet; //Declare Library Variables

//In addition to the iframe, you can also import Ajax or fetched HTML codes.
function loadCode(_this){
	bottomsheet = new cocoBottomSheetJS({
		htmlcode:frames[_this.getAttribute('name')].document.body.innerHTML, //HTML code
		overlayer:true, //Set whether the background is enabled when the bottom sheet is turned on
		
		//You can use px, %, vw, and vh units
		min:'30vh', //Minimal height of the bottom sheet. If it is less than this height, it will close automatically.
		max:'85vh', //Maximum height of the bottom sheet. Restricted to no higher than this height.
		
		autofilloffset:100, //Offset adjustment size with auto-expanded, auto-close enabled
		notclose:false //Use true when using a bottom sheet that cannot be closed
	});
	
	//You can modify the style of the bottom sheet on the spot.
	bottomsheet.setcss({
		'background-color':'#111',
		'color':'#f1f1f1'
	});
	
}
```
   
### 3. You can control the bottom sheet by using events, etc. in the HTML element.
```html
<!-- show() <- Expand the bottom sheet to the minimum height -->
<button onclick='bottomsheet.show();'>show bottom sheet</button>
  
<!-- show max() <- Expand the bottom sheet to its maximum height -->
<button onclick='bottomsheet.showmax();'>showmax bottom sheet</button>
  
<!-- hide() <- Close the bottom sheet -->
<button onclick='bottomsheet.hide();'>hide bottom sheet</button>
  
<script type='text/javascript'>
	//sethtml() <- You can change the html that will enter the bottom sheet later.  
	bottomsheet.sethtml('Hello World!');
	  
	//setcs() <- Change the style of the bottom sheet.  
	bottomsheet.setcss({'font-size':'20px'});  
	
	//You can force javascript to run when the bottom sheet is unfolded. Same role as callback function
	bottomsheet.setjs(function(){
		let check_box = document.querySelector('.check_box');
		check_box.scrollTo({top:0, left:0, behavior:'instant'});
		console.log('open!!!');
	});
	
	//The callback function that runs when the bottom sheet is closed.
	bottomsheet.setcallback(function(){
		alert('closed!');
	});
	
	//You can detect if the bottom sheet is open. (true/false)
	console.log(bottomsheet.isvisible());
	
	//gethtml() <- You can check the HTML code currently stored in the bottom sheet.
	let htmlstring = bottomsheet.gethtml();
</script>
```
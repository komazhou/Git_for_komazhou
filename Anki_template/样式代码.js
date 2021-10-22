.card {
 font-family: arial;
 font-size: 20px;
 text-align: left;
 color: black;
 background-color: white;
}
</style><!--填充Anki默认style-->
<style>
.card { font-family: Arial; font-size:20px; text-align:left; 
        color: white; background-color:#272822;}
div{    margin:5px auto }
.text{   color:#e6db74; text-align:left;}
.hint{   color:#a6e22e;}
.unchoiced{ color: white;}
.choiced{font-weight: bold; color: #eeeebb;}
.extra{ margin-top:15px; font-size:16px; color: #eeeebb; text-align:left;}
.cloze{  font-weight: bold; color: #a6e22e;}
.cloze2{ font-weight: bold; color: #a6e22e;text-decoration:underline;}
.wrong{  font-weight: 400;  color: #f92672;text-decoration:line-through;}
.options{ list-style:upper-latin;}
.options *{ cursor:pointer;}
.options *:hover{ font-weight:bold;color: #eeeebb;}
.options li{ margin-top:10px;}
.options input[name="options"]{ display:inline;}
/*定位正确率展示条*/
#performance{ text-align:center; font-size:12px; margin-top:0px;}
</style>


<script>
//-------------------------------------------------------------------------showSingleOptions()
function showSingleOptions(){
var optionOl=document.getElementById("optionList")
var options=document.getElementById("options")
var answer=document.getElementById("answer")
var Ans=answer.innerHTML.toUpperCase();
var s=0
var indexs=[]
var optionList=""
options=options.innerHTML
options=options.replace(/<\/?div>/g,"\n")
options=options.replace(/\n+/g,"\n")
options=options.replace(/<br.*?>/g,"\n")
//去除首尾换行符
options=options.replace(/^\n/,"")
options=options.replace(/\n$/,"")
mc.opnum=options.length
//以换行符分隔选项为数组
options=options.split("\n")
//随机组合选项
for(var key in options){
 do{
  s=Math.random()*(options.length);  s=Math.floor(s);
  if(indexs.join().indexOf(s.toString())==-1){  indexs.push(s);  break;  }
 }while(true)
 if(Ans!="B"&&Ans!="C"&&Ans!="D"&&Ans!="E"){Ans="A";}
 if(String.fromCharCode(65+s)==Ans){
  optionList+="<li id='optionTrue'><input type='radio' name='options' id=option"+s+" /><label for=option"+s+" id=op"+s+" onclick='showAns(this)'>"+options[s]+"</label></li>"
 }else{
  optionList+="<li><input type='radio' name='options' id=option"+s+" /><label for=option"+s+" id=op"+s+" onclick='showAns(this)' >"+options[s]+" </label></li>"
 }
}
for(i=0;i<options.length;i++){
 if(String.fromCharCode(65+indexs[i])==Ans){mc.correctanswer=String.fromCharCode(65+i);}
}

optionOl.innerHTML=optionList
mc.list=optionOl.innerHTML;//把列表存到mc中
}
//---------------------------------------------------------------------------showAns(la)
function showAns(la){
  switch (la.id.substr(-1)){ 
	case '0' : document.getElementById("option0").checked=true;break;
	case '1' : document.getElementById("option1").checked=true;break;
	case '2' : document.getElementById("option2").checked=true;break;
	case '3' : document.getElementById("option3").checked=true;break;
  }
  var tempradio=document.getElementsByName("options")
  if(tempradio[0].checked==true) {mc.choiced='A';}
  if(tempradio[1].checked==true) {mc.choiced='B';}
  if(tempradio[2].checked==true) {mc.choiced='C';}
  if(tempradio[3].checked==true) {mc.choiced='D';}
 // 判断是否选择正确
  mc.ifright="错误";mc.score=0;
  switch (answer.innerHTML.toUpperCase()) {
	case "B": if(la.id=='op1'){ mc.ifright="正确"; mc.score=1; mc.correct++;} break;
	case "C": if(la.id=='op2'){ mc.ifright="正确"; mc.score=1; mc.correct++;} break;
	case "D": if(la.id=='op3'){ mc.ifright="正确"; mc.score=1; mc.correct++;} break;
	 default: if(la.id=='op0'){ mc.ifright="正确"; mc.score=1; mc.correct++;} break; }
  mc.sum+=mc.score;
  var optionOl =document.getElementById("optionList")
  mc.list=optionOl.innerHTML
  mc.checked=la.id
  try{  py.link("ansHack");  }catch(e){}
}
//----------------------------------------------------------------------------getOptions()
function getOptions(){
var optionOl=document.getElementById("optionList")
//判断是否有mc变量

optionOl.innerHTML=mc.list
//标出选择项目,默认为错误
 if(mc.checked){
  var optionChecked=document.getElementById(mc.checked)
  optionChecked.parentNode.className="wrong" 
  optionChecked.checked=true
  mc.checked=''; }

//高亮答案选项
var optionTrue=document.getElementById("optionTrue")
optionTrue.className="cloze" 
var radios=document.getElementsByName("options")
for(var i in radios){ radios[i].disabled=true; }
}
//-----------------------------------------------------------showMultipleOptions()
function showMultipleOptions(){
var optionOl=document.getElementById("optionList")
var options=document.getElementById("options")
var answer=document.getElementById("answer")
var correctanswer=answer.innerHTML.toUpperCase();
var s=0,ans=''
var indexs=[]
var optionList=""
options=options.innerHTML
options=options.replace(/<\/?div>/g,"\n")
options=options.replace(/\n+/g,"\n")
options=options.replace(/<br.*?>/g,"\n")
//去除首尾换行符
options=options.replace(/^\n/,"")
options=options.replace(/\n$/,"")
mc.opnum=options.length
//以换行符分隔选项为数组
options=options.split("\n")
//随机组合选项/
for(var key in options){
 do{
  s=Math.random()*(options.length);  s=Math.floor(s);
  if(indexs.join().indexOf(s.toString())==-1){  indexs.push(s);  break;  }
 }while(true)
 if(correctanswer.indexOf(String.fromCharCode(65+s))>=0) {
     optionList+="<li id=optionTrue"+s+"><input type='checkbox' name='ckname' id=ckid"+s+" value="+s+" /><label for=ckid"+s+" id=op"+s+" onclick=choice(this) >"+options[s]+"</label></li>"
 }else{
     optionList+="<li id=optionFalse"+s+"><input type='checkbox' name='ckname' id=ckid"+s+" value="+s+" /><label for=ckid"+s+" id=op"+s+" onclick=choice(this) >"+options[s]+" </label></li>"
 }
}

for(i=0;i<options.length;i++){
	if (correctanswer.indexOf(String.fromCharCode(65+indexs[i]))>=0)
	{mc.correctanswer+=String.fromCharCode(65+i);}
}
//document.write(mc.list)
//if(ans==correctanswer){mc.correct++;}
optionOl.innerHTML=optionList;
mc.list=optionOl.innerHTML;
}
//-------------------------------------------------------------------------choice()
function choice(checkbox){
switch (checkbox.id.substr(-1))
{ 
  case '0':if(document.getElementById("optionTrue0")){
	          if(document.getElementById("ckid0").checked==false){
				 document.getElementById("optionTrue0").className="choiced";}
			  else{document.getElementById("optionTrue0").className="unchoiced";}}
		 else{
			 if(document.getElementById("ckid0").checked==false){
				document.getElementById("optionFalse0").className="choiced";}
			 else{document.getElementById("optionFalse0").className="unchoiced";}}
		break; 
  case '1':if(document.getElementById("optionTrue1")){
	          if(document.getElementById("ckid1").checked==false){
				 document.getElementById("optionTrue1").className="choiced";}
			  else{document.getElementById("optionTrue1").className="unchoiced";}}
		 else{
			 if(document.getElementById("ckid1").checked==false){
				document.getElementById("optionFalse1").className="choiced";}
			 else{document.getElementById("optionFalse1").className="unchoiced";}}
		break; 
  case '2':if(document.getElementById("optionTrue2")){
	          if(document.getElementById("ckid2").checked==false){
				 document.getElementById("optionTrue2").className="choiced";}
			  else{document.getElementById("optionTrue2").className="unchoiced";}}
		 else{
			 if(document.getElementById("ckid2").checked==false){
				document.getElementById("optionFalse2").className="choiced";}
			 else{document.getElementById("optionFalse2").className="unchoiced";}}
		break; 
  case '3':if(document.getElementById("optionTrue3")){
	          if(document.getElementById("ckid3").checked==false){
				 document.getElementById("optionTrue3").className="choiced";}
			  else{document.getElementById("optionTrue3").className="unchoiced";}}
		 else{
			 if(document.getElementById("ckid3").checked==false){
				document.getElementById("optionFalse3").className="choiced";}
			 else{document.getElementById("optionFalse3").className="unchoiced";}}
		break; 
  case '4':if(document.getElementById("optionTrue4")){
	          if(document.getElementById("ckid4").checked==false){
				 document.getElementById("optionTrue4").className="choiced";}
			  else{document.getElementById("optionTrue4").className="unchoiced";}}
		 else{
			 if(document.getElementById("ckid4").checked==false){
				document.getElementById("optionFalse4").className="choiced";}
			 else{document.getElementById("optionFalse4").className="unchoiced";}}
		break; 
 }
}

function showMAns(){
surebutton.disabled=true;
var tempcheck=document.getElementsByName("ckname")
mc.choiced='';
mc.score=1;mc.ifright="";
for(i=0;i<5;i++){
	if (tempcheck[i].checked==true)	{
		mc.choiced+=String.fromCharCode(65+i);
		if (mc.correctanswer.indexOf(String.fromCharCode(65+i))==-1){mc.ifright="错误";mc.score=0;}
	}
}

if (mc.score!=0){mc.score=mc.choiced.length*0.5;mc.ifright="不完全正确";}
if (mc.choiced.length==0){mc.ifright="为什么一个都不选？"}
if (mc.choiced==mc.correctanswer){mc.ifright="完全正确";mc.score=2;mc.correct++;}
mc.sum+=mc.score;
//正确显示
if(document.getElementById("optionTrue0")){
  if(document.getElementById("ckid0").checked==false){document.getElementById("optionTrue0").className="cloze2";}
  else{document.getElementById("optionTrue0").className="cloze";}}
else{
  if(document.getElementById("ckid0").checked==true){document.getElementById("optionFalse0").className="wrong";}
    }
if(document.getElementById("optionTrue1")){
  if(document.getElementById("ckid1").checked==false){document.getElementById("optionTrue1").className="cloze2";}
  else{document.getElementById("optionTrue1").className="cloze";}}
else{
  if(document.getElementById("ckid1").checked==true){document.getElementById("optionFalse1").className="wrong";}
    }
if(document.getElementById("optionTrue2")){
  if(document.getElementById("ckid2").checked==false){document.getElementById("optionTrue2").className="cloze2";}
  else{document.getElementById("optionTrue2").className="cloze";}}
else{
  if(document.getElementById("ckid2").checked==true){document.getElementById("optionFalse2").className="wrong";}
    }
if(document.getElementById("optionTrue3")){
  if(document.getElementById("ckid3").checked==false){document.getElementById("optionTrue3").className="cloze2";}
  else{document.getElementById("optionTrue3").className="cloze";}}
else{
  if(document.getElementById("ckid3").checked==true){document.getElementById("optionFalse3").className="wrong";}
    }
if(document.getElementById("optionTrue4")){
  if(document.getElementById("ckid4").checked==false){document.getElementById("optionTrue4").className="cloze2";}
  else{document.getElementById("optionTrue4").className="cloze";}}
else{
  if(document.getElementById("ckid4").checked==true){document.getElementById("optionFalse4").className="wrong";}
    }

optionOl=document.getElementById("optionList")
mc.list=optionOl.innerHTML;
try{  py.link("ansHack");  }catch(e){}
}
</script>
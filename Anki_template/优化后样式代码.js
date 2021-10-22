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
.AD{   color:#FF5733; text-align:center;font-size:13px;}
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
//mc.opnum=options.length
//以换行符分隔选项为数组
options=options.split("\n")
mc.opnum=options.length
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
    var checkID=checkbox.id.substr(-1)
	if(document.getElementById('optionTrue'+checkID)){
		if(document.getElementById('ckid'+checkID).checked==false){
			document.getElementById('optionTrue'+checkID).className="choiced";}
		else{document.getElementById('optionTrue'+checkID).className="unchoiced";
		}
		}
	else{
		if(document.getElementById('ckid'+checkID).checked==false){
			document.getElementById('optionFalse'+checkID).className="choiced";}
		else{document.getElementById('optionFalse'+checkID).className="unchoiced";
		}
		}
}

function showMAns(){
surebutton.disabled=true;
var tempcheck=document.getElementsByName("ckname")
mc.choiced='';
mc.score=1;mc.ifright="";
var optionsNUM=0
for(var key in options){
	optionsNUM+=1
}

for(i=0;i<mc.opnum;i++){
	if (tempcheck[i].checked==true)	{
		mc.choiced+=String.fromCharCode(65+i);
		if (mc.correctanswer.indexOf(String.fromCharCode(65+i))==-1){mc.ifright=" 抱歉，选择错误，请再接再厉；";mc.score=0;}
	}
}

if (mc.score!=0){mc.score=mc.choiced.length*mc.OCscore;mc.ifright=" 加油！还有其他正确选项漏选；";}
if (mc.choiced.length==0){mc.ifright="为什么一个都不选？"}
if(mc.choiced==mc.correctanswer){
	if(mc.AnsLen==1){
	mc.ifright="👍👍完全正确（单选）；";mc.score=mc.Singlescore;mc.correct++;
	}
	else{
	mc.ifright="👍👍完全正确（多选）；";mc.score=mc.Multiscore;mc.correct++;
	}
}
mc.sum+=mc.score;
//正确显示

for(ID=0;ID<mc.opnum;ID++){
	if(document.getElementById('optionTrue'+ID)){
		if(document.getElementById('ckid'+ID).checked==false){document.getElementById('optionTrue'+ID).className="cloze2";}
		else{document.getElementById('optionTrue'+ID).className="cloze";}}
	else{
	if(document.getElementById('ckid'+ID).checked==true){document.getElementById('optionFalse'+ID).className="wrong";}
    }
}

optionOl=document.getElementById("optionList")
mc.list=optionOl.innerHTML;
try{  py.link("ansHack");  }catch(e){}
}
</script>
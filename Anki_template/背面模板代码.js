<div id="performance">正确率：100%</div>
<div class="text">{{cloze:Question}}</div>
{{#Options}}
<ol class="options" id="optionList"></ol>
<div id="options" style="display:none">{{Options}}</div>
<div id="answer" style="display:none">{{text:Answer}}</div>
<div id="yourans" class="choiced">回答：</div>
<div id="key" class="cloze">答案：</div>
<script>
//getMOptions()
if(document.getElementById("answer").innerHTML.length<2){
	getOptions();
var temradio=document.getElementsByName("options");
if(mc.choiced=='A') {temradio[0].checked=true;}
if(mc.choiced=='B') {temradio[1].checked=true;}
if(mc.choiced=='C') {temradio[2].checked=true;}
if(mc.choiced=='D') {temradio[3].checked=true;}
}else{
var optionOl=document.getElementById("optionList")
optionOl.innerHTML=mc.list

var temcheck=document.getElementsByName("ckname")
if(mc.choiced.indexOf("A") >= 0 ) {temcheck[0].checked=true;}
if(mc.choiced.indexOf("B") >= 0 ) {temcheck[1].checked=true;}
if(mc.choiced.indexOf("C") >= 0 ) {temcheck[2].checked=true;}
if(mc.choiced.indexOf("D") >= 0 ) {temcheck[3].checked=true;}
if(mc.choiced.indexOf("E") >= 0 ) {temcheck[4].checked=true;}
}
</script>
{{/Options}}
{{#Extra}}
 <hr>
 <div class="extra">{{Extra}}</div>
{{/Extra}}
<script>
//显示正确率
var performance=document.getElementById("performance")
var key=document.getElementById("key")
if(typeof(mc)!="undefined"){
 var percent=((mc.correct/mc.total)*100).toFixed(0)
 var percent2=((mc.sum/mc.fullscore)*100).toFixed(0)
 performance.innerHTML="本次练习"+mc.total+"题--正确"+mc.correct+"题--正确率"+percent+"%--累计得"+mc.sum+"分--得分率"+percent2+"%"
yourans.innerHTML="回答："+mc.choiced+"  "+mc.ifright+"，得分："+mc.score 
key.innerHTML="答案："+mc.correctanswer
}
</script>

<div class="AD">专利·商标·软著-咨询<u>19923359218</u>（同微信）<br><b>重庆企进专利代理事务所（普通合伙）</b></div>
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
//通过答案数量判断单选或多选
//JS获取字符串字母个数，使用属性“.length”
var optionOl=document.getElementById("optionList")
optionOl.innerHTML=mc.list
var temcheck=document.getElementsByName("ckname")
for(k=0;k<options.length;k++){
	var ABC=String.fromCharCode(65+k)
	if(mc.choiced.indexOf('"+k+"') >= 0 ) {temcheck["+k+"].checked=true;}
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
yourans.innerHTML="您的回答："+mc.choiced+"  "+mc.ifright+"得分："+mc.score 
key.innerHTML="答案："+mc.correctanswer
}
</script>
<!--2018-01-30-->
<!--QQ:80317354-->
<div class="text">{{cloze:Question}}</div>
{{#Options}}
<ol class="options" id="optionList"></ol>
<div id="options" style="display:none">{{Options}}</div>
<div id="answer" style="display:none">{{text:Answer}}</div>

<script>
//向head添加一个全局变量mc来进行正反卡片传值
 if(typeof(mc)=="undefined"){
 var script=document.createElement('script')
 script.innerHTML="var mc={correct:0,total:0,score:0,fullscore:0,sum:0,opnum:0,list:'',checked:'',choiced:'',correctanswer:'',ifright:''}"
 document.head.appendChild(script)
}
mc.total++;
mc.choiced='';
mc.correctanswer='';
if(document.getElementById("answer").innerHTML.length==1){
	mc.fullscore+=1;showSingleOptions();
     document.getElementById("surebutton").style.display = "none";}
else{mc.fullscore+=2;showMultipleOptions();}
</script>
{{/Options}}
<input type=button id='surebutton' value="确定" onClick="showMAns()"><br>
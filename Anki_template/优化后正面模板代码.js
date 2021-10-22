<!--2020-8-27-->
<!--重庆企进专利专利事务所（普通合伙）-->
<!--专利 商标 软著-->
<!--QQ136470320-->
<div class="AD">重庆企进专利祝您逢考必过</div>
<div class="text">{{cloze:Question}}</div>
{{#Options}}
<ol class="options" id="optionList"></ol>
<div id="options" style="display:none">{{Options}}</div>
<div id="answer" style="display:none">{{text:Answer}}</div>

<script>
//向head添加一个全局变量mc来进行正反卡片传值
 if(typeof(mc)=="undefined"){
 var script=document.createElement('script')
 script.innerHTML="var mc={correct:0,total:0,Multiscore:1,Singlescore:1,score:0,fullscore:0,sum:0,opnum:0,AnsLen:0,list:'',checked:'',choiced:'',correctanswer:'',ifright:''}"
 document.head.appendChild(script)
}
mc.total++;
mc.choiced='';
mc.correctanswer='';
//利用正则提取answer内容中的英文内容作为正确答案项并确定长度
mc.AnsLen=document.getElementById("answer").innerHTML.replace(/[^a-zA-Z]/g,'').length
//设置单选题分值mc.Singlescore,多选题的分值mc.Multiscore和少选情况下每个选项的分值mc.OCscore,少选不得分则mc.OCscore=0
mc.Multiscore=1
mc.Singlescore=1
mc.OCscore=0
//计算总分mc.fullscore
if(mc.AnsLen==1){
	mc.fullscore+=mc.Singlescore;showMultipleOptions();}
//计算总分mc.fullscore
else{mc.fullscore+=mc.Multiscore;showMultipleOptions();}
</script>
{{/Options}}
<input type=button id='surebutton' value="确定" onClick="showMAns()"><br>
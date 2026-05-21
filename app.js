let lang='en',step=-1,phase='form',answers={},dec={},coDec={},attested=false;

const LANG={en:{title:"Mortgage Application",subtitle:"with Jack Chen · NMLS #2425956",company:"General Mortgage Capital Corporation",start:"Let's Get Started",startSub:"This takes about a few minutes — nice and easy.",next:"Next →",back:"← Back",submit:"Submit Application",review:"Review Your Answers",reviewSub:"Make sure everything looks right before submitting.",submitted:"Application Submitted!",submittedSub:"Jack will review your info and reach out shortly.",submittedNote:"Next steps: Jack will send you a DocuSign for authorization (eConsent, credit check & appraisal), and let you know which documents to upload.",copyText:"📋 Copy Summary",copied:"✓ Copied!",of:"of",lang:"中文",yes:"Yes",no:"No",years:"Years",months:"Months",decTitle:"Declarations",decSub:"Please answer Yes or No to each. These are standard questions required on all mortgage applications.",decProperty:"Property & Funding",decFinancial:"Financial History (Past 7 Years)",coDecTitle:"Co-Borrower Declarations",coDecSub:"Same questions for your co-borrower.",attestTitle:"Borrower Attestation",attestText:"I confirm that the information I've provided is accurate and complete to the best of my knowledge. I understand this information will be used to prepare my official mortgage application (URLA). I authorize the loan officer to use this data to generate my full application and proceed with next steps.",attestCheck:"I have read and agree to the above attestation.",textJack:"💬 Text My Application to Jack",emailJack:"✉️ Email My Application to Jack"},zh:{title:"房屋贷款申请",subtitle:"Jack Chen · NMLS #2425956",company:"万通贷款银行",start:"开始申请",startSub:"只需几分钟，轻松填写。",next:"下一步 →",back:"← 返回",submit:"提交申请",review:"确认您的回答",reviewSub:"提交前请确认信息是否正确。",submitted:"申请已提交！",submittedSub:"Jack 将会审核您的信息并尽快联系您。",submittedNote:"下一步：Jack 将通过 DocuSign 发送授权书（电子签署同意、信用审核和房屋估价），并告知您需要上传的文件。",copyText:"📋 复制摘要",copied:"✓ 已复制！",of:"/",lang:"English",yes:"是",no:"否",years:"年",months:"月",decTitle:"贷款申请人声明",decSub:"请回答以下标准贷款申请问题，选择「是」或「否」。",decProperty:"房产与资金",decFinancial:"财务历史（过去7年）",coDecTitle:"共同借款人声明",coDecSub:"请共同借款人回答相同的问题。",attestTitle:"借款人声明",attestText:"本人特此声明并保证，本人在本表格中提供的信息均真实、准确、完整，且符合本人所知的最佳情况。本人理解并同意，该信息将用于准备本人正式抵押贷款申请（URLA）。本人通过勾选下方复选框，明确授权贷款专员使用本表格所载信息，以生成完整的贷款申请，并推进相关贷款审批流程。",attestCheck:"本人已阅读并同意上述声明，并提交本申请。",textJack:"💬 发送申请短信给 Jack",emailJack:"✉️ 发送申请邮件给 Jack"}};

// Declaration questions - with conditional triggers matching 1003/URLA
const DEC_PROPERTY={en:[
  {id:"occupyProperty",q:"Will you occupy the property as your primary residence?",trigger:{val:"Yes",show:[{id:"priorProperty",q:"Have you had an ownership interest in another property in the last 3 years?",trigger:{val:"Yes",show:[{id:"priorPropertyType",q:"What type of property did you own?",type:"choice",opts:["Primary Residence","Second Home","Investment Property"]},{id:"titleHeld",q:"How did you hold title to the property?",type:"choice",opts:["By Yourself","Jointly with Spouse","Jointly with Others"]}]}}]}},
  {id:"sellerRelationship",q:"Do you have a family relationship or business affiliation with the seller?",purchaseOnly:true},
  {id:"borrowedFunds",q:"Are you borrowing any money for this transaction (e.g., closing costs or down payment) not disclosed on this application?",trigger:{val:"Yes",show:[{id:"borrowedAmount",q:"What is the amount of this money?",type:"text",ph:"$ Amount"}]}},
  {id:"otherMortgage",q:"Have you or will you be applying for a mortgage on another property not disclosed on this application?"},
  {id:"newCredit",q:"Have you or will you be applying for any new credit (e.g., installment loan, credit card) not disclosed on this application?"},
  {id:"priorityLien",q:"Will this property be subject to a lien that could take priority over the first mortgage (e.g., PACE)?"}
],zh:[
  {id:"occupyProperty",q:"您是否会自住该房产？",trigger:{val:"是",show:[{id:"priorProperty",q:"您过去三年是否持有过其他房产？",trigger:{val:"是",show:[{id:"priorPropertyType",q:"您拥有的房产类型是什么？",type:"choice",opts:["自住房","度假屋","投资房"]},{id:"titleHeld",q:"您是如何持有该房产的产权？",type:"choice",opts:["单独持有","与配偶共同持有","与他人共同持有"]}]}}]}},
  {id:"sellerRelationship",q:"您是否与房产卖方有家庭关系或业务关联？",purchaseOnly:true},
  {id:"borrowedFunds",q:"您是否为此次交易借款（如首付或过户费），且未在此申请中披露？",trigger:{val:"是",show:[{id:"borrowedAmount",q:"这笔资金的金额是多少？",type:"text",ph:"$ 金额"}]}},
  {id:"otherMortgage",q:"您是否已申请或将申请另一处房产的抵押贷款，且未在此申请中披露？"},
  {id:"newCredit",q:"您是否已申请或将申请新的信用额度，且未在此申请中披露？"},
  {id:"priorityLien",q:"该房产是否会受到优先留置权影响（如PACE计划）？"}
]};
const DEC_FINANCIAL={en:[
  {id:"coSigner",q:"Are you a co-signer or guarantor on any debt not disclosed on this application?"},
  {id:"judgments",q:"Are there any outstanding judgments against you?"},
  {id:"federalDebt",q:"Are you currently delinquent or in default on a Federal debt?"},
  {id:"lawsuit",q:"Are you a party to a lawsuit with potential personal financial liability?"},
  {id:"deedInLieu",q:"Have you conveyed title to any property in lieu of foreclosure in the past 7 years?"},
  {id:"shortSale",q:"Have you completed a pre-foreclosure sale or short sale in the past 7 years?"},
  {id:"foreclosure",q:"Have you had property foreclosed upon in the last 7 years?"},
  {id:"bankruptcy",q:"Have you declared bankruptcy within the past 7 years?",trigger:{val:"Yes",show:[{id:"bankruptcyType",q:"Identify the type(s) of bankruptcy:",type:"choice",opts:["Chapter 7","Chapter 11","Chapter 12","Chapter 13"]}]}}
],zh:[
  {id:"coSigner",q:"您是否是未披露债务的共同签署人或担保人？"},
  {id:"judgments",q:"您是否有未偿还的判决？"},
  {id:"federalDebt",q:"您是否拖欠或违约联邦债务？"},
  {id:"lawsuit",q:"您是否涉及可能承担财务责任的诉讼？"},
  {id:"deedInLieu",q:"过去7年是否以代替止赎方式转让过产权？"},
  {id:"shortSale",q:"过去7年是否完成过短售？"},
  {id:"foreclosure",q:"过去7年是否有房产被止赎？"},
  {id:"bankruptcy",q:"过去7年是否宣布过破产？",trigger:{val:"是",show:[{id:"bankruptcyType",q:"请选择破产类型：",type:"choice",opts:["第7章破产","第11章破产","第12章破产","第13章破产"]}]}}
]};

const MAP_EN_ZH={"Yes":"是","No":"否","Purchase":"购房","Refinance":"重新贷款","Primary Residence":"自住房","Second Home":"度假屋","Investment Property":"投资房","Single Family":"一家庭","2-Family":"两家庭","3-Family":"三家庭","4-Family":"四家庭","Condo / Townhouse":"Condo/Townhouse","PUD":"PUD","Co-op":"Co-op","W2 / Salary":"工资收入 (W2)","Self-Employed":"自雇","Other (Skip)":"其他(跳过)","Yes, 25% or more":"是，25%以上","Less than 25%":"低于25%","By Yourself":"单独持有","Jointly with Spouse":"与配偶共同持有","Jointly with Others":"与他人共同持有","Chapter 7":"第7章破产","Chapter 11":"第11章破产","Chapter 12":"第12章破产","Chapter 13":"第13章破产"};
const MAP_ZH_EN=Object.fromEntries(Object.entries(MAP_EN_ZH).map(([k,v])=>[v,k]));
function translateObj(obj,map){const o={};for(const[k,v]of Object.entries(obj))o[k]=map[v]||v;return o;}

// Helper: check if employment duration < 2 years
function needsPrevEmployer(durVal){
  if(!durVal)return false;
  var p=durVal.split('|');var y=parseInt(p[0])||0;
  return y<2;
}

function getSteps(){
  const t=LANG[lang],isPurch=answers.transaction===(lang==='en'?'Purchase':'购房'),hasCo=answers.coborrower===t.yes;
  const isW2=answers.incomeType===(lang==='en'?'W2 / Salary':'工资收入 (W2)');
  const isSE=answers.incomeType===(lang==='en'?'Self-Employed':'自雇');
  const skip=answers.incomeType===(lang==='en'?'Other (Skip)':'其他(跳过)');
  let s=[];
  if(lang==='en'){
    s.push({id:"borrowerInfo",section:"About You",q:"What's your name and contact info?",type:"multi",fields:[{id:"borrowerFirst",ph:"First name",req:true},{id:"borrowerLast",ph:"Last name",req:true},{id:"email",ph:"Email address",req:true},{id:"phone",ph:"Phone number",req:true}],req:true});
    s.push({id:"coborrower",q:"Will you be applying with a co-borrower?",type:"choice",opts:["Yes","No"],req:true});
    if(hasCo){s.push({id:"coInfo",q:"Co-borrower's name and contact info?",type:"multi",fields:[{id:"coFirst",ph:"First name",req:true},{id:"coLast",ph:"Last name",req:true},{id:"coEmail",ph:"Email address",req:true},{id:"coPhone",ph:"Phone number",req:true}],req:true});}
    s.push({id:"transaction",section:"Property",q:"Are you purchasing or refinancing?",type:"choice",opts:["Purchase","Refinance"],req:true});
    s.push({id:"propDetails",q:"Property details",type:"dropdowns",req:true});
    s.push({id:"address",q:"Property address?",sub:"If you don't have one yet, enter the city & state you're looking in.",type:"text",ph:"Street, City, State, ZIP",req:true});
    if(isPurch)s.push({id:"purchasePrice",q:"What's the purchase price?",type:"text",ph:"$ Amount",req:true});
    else if(answers.transaction)s.push({id:"appraisedValue",q:"Estimated property value?",type:"text",ph:"$ Amount",req:true});
    s.push({id:"loanAmount",q:"Desired loan amount?",type:"loanltv",req:true});
    s.push({id:"incomeType",section:"Income",q:"What's your income type?",type:"choice",opts:["W2 / Salary","Self-Employed","Other (Skip)"],req:true});
    if(isW2){
      s.push({id:"employerName",q:"Employer name?",type:"text",ph:"Company name",req:true});
      s.push({id:"position",q:"Your position / title?",type:"text",ph:"e.g. Marketing Manager",req:true});
      s.push({id:"duration",q:"How long have you worked there?",type:"duration",req:true});
      if(needsPrevEmployer(answers.duration)){
        s.push({id:"prevEmployerName",q:"Previous employer name?",type:"text",ph:"Previous company",req:true});
        s.push({id:"prevPosition",q:"Previous position / title?",type:"text",ph:"e.g. Sales Associate",req:true});
        s.push({id:"prevDuration",q:"How long at previous employer?",type:"duration",req:true});
      }
    }
    if(isSE){
      s.push({id:"businessName",q:"Business name?",type:"text",ph:"Business name",req:true});
      s.push({id:"ownershipShare",q:"Do you own 25% or more?",type:"choice",opts:["Yes, 25% or more","Less than 25%"],req:true});
      s.push({id:"duration",q:"How long have you been self-employed?",type:"duration",req:true});
      if(needsPrevEmployer(answers.duration)){
        s.push({id:"prevEmployerName",q:"Previous employer/business name?",type:"text",ph:"Previous company",req:true});
        s.push({id:"prevPosition",q:"Previous position / title?",type:"text",ph:"Position",req:true});
        s.push({id:"prevDuration",q:"How long at previous employer?",type:"duration",req:true});
      }
    }
    if(hasCo&&!skip){
      s.push({id:"coIncomeType",section:"Co-Borrower Income",q:"Co-borrower's income type?",type:"choice",opts:["W2 / Salary","Self-Employed","Other (Skip)"],req:true});
      var coW2=answers.coIncomeType==="W2 / Salary",coSE=answers.coIncomeType==="Self-Employed";
      if(coW2){s.push({id:"coEmployerName",q:"Co-borrower's employer?",type:"text",ph:"Company name",req:true});s.push({id:"coPosition",q:"Co-borrower's position?",type:"text",ph:"Position",req:true});s.push({id:"coDuration",q:"How long?",type:"duration",req:true});if(needsPrevEmployer(answers.coDuration)){s.push({id:"coPrevEmployer",q:"Co-borrower's previous employer?",type:"text",ph:"Previous company",req:true});s.push({id:"coPrevPosition",q:"Previous position?",type:"text",ph:"Position",req:true});s.push({id:"coPrevDuration",q:"How long?",type:"duration",req:true});}}
      if(coSE){s.push({id:"coBusinessName",q:"Business name?",type:"text",ph:"Business name",req:true});s.push({id:"coOwnership",q:"Own 25% or more?",type:"choice",opts:["Yes, 25% or more","Less than 25%"],req:true});s.push({id:"coDuration",q:"How long?",type:"duration",req:true});}
    }
    s.push({id:"decProperty",section:"Declarations",q:"",type:"decProperty",req:false});
s.push({id:"decFinancial",section:"Declarations",q:"",type:"decFinancial",req:false});
    if(hasCo){s.push({id:"coDecProperty",section:"Co-Borrower Declarations",q:"",type:"coDecProperty",req:false});s.push({id:"coDecFinancial",section:"Co-Borrower Declarations",q:"",type:"coDecFinancial",req:false});}
    s.push({id:"attestation",section:"Submit",q:"",type:"attestation",req:true});
  } else {
    s.push({id:"borrowerInfo",section:"个人信息",q:"您的姓名和联系方式？",type:"multi",fields:[{id:"borrowerFirst",ph:"名",req:true},{id:"borrowerLast",ph:"姓",req:true},{id:"email",ph:"电子邮箱",req:true},{id:"phone",ph:"电话号码",req:true}],req:true});
    s.push({id:"coborrower",q:"是否有共同借款人？",type:"choice",opts:["是","否"],req:true});
    if(hasCo){s.push({id:"coInfo",q:"共同借款人的姓名和联系方式？",type:"multi",fields:[{id:"coFirst",ph:"名",req:true},{id:"coLast",ph:"姓",req:true},{id:"coEmail",ph:"电子邮箱",req:true},{id:"coPhone",ph:"电话号码",req:true}],req:true});}
    s.push({id:"transaction",section:"房产信息",q:"您是购房还是重新贷款？",type:"choice",opts:["购房","重新贷款"],req:true});
    s.push({id:"propDetails",q:"房产详情",type:"dropdowns",req:true});
    s.push({id:"address",q:"房产地址？",sub:"如尚未确定，请输入意向城市和州。",type:"text",ph:"街道, 城市, 州, 邮编",req:true});
    if(isPurch)s.push({id:"purchasePrice",q:"购买价格？",type:"text",ph:"$ 金额",req:true});
    else if(answers.transaction)s.push({id:"appraisedValue",q:"房产预估价值？",type:"text",ph:"$ 金额",req:true});
    s.push({id:"loanAmount",q:"期望贷款金额？",type:"loanltv",req:true});
    s.push({id:"incomeType",section:"收入信息",q:"您的收入类型？",type:"choice",opts:["工资收入 (W2)","自雇","其他(跳过)"],req:true});
    if(isW2){
      s.push({id:"employerName",q:"雇主名称？",type:"text",ph:"公司名称",req:true});
      s.push({id:"position",q:"您的职位？",type:"text",ph:"例如：市场经理",req:true});
      s.push({id:"duration",q:"在该公司工作多长时间？",type:"duration",req:true});
      if(needsPrevEmployer(answers.duration)){
        s.push({id:"prevEmployerName",q:"前雇主名称？",type:"text",ph:"前公司名称",req:true});
        s.push({id:"prevPosition",q:"前职位？",type:"text",ph:"职位",req:true});
        s.push({id:"prevDuration",q:"在前雇主工作多长时间？",type:"duration",req:true});
      }
    }
    if(isSE){
      s.push({id:"businessName",q:"企业名称？",type:"text",ph:"企业名称",req:true});
      s.push({id:"ownershipShare",q:"是否拥有25%以上股份？",type:"choice",opts:["是，25%以上","低于25%"],req:true});
      s.push({id:"duration",q:"自雇多长时间？",type:"duration",req:true});
      if(needsPrevEmployer(answers.duration)){
        s.push({id:"prevEmployerName",q:"前雇主/企业名称？",type:"text",ph:"前公司名称",req:true});
        s.push({id:"prevPosition",q:"前职位？",type:"text",ph:"职位",req:true});
        s.push({id:"prevDuration",q:"在前雇主工作多长时间？",type:"duration",req:true});
      }
    }
    if(hasCo&&!skip){
      s.push({id:"coIncomeType",section:"共同借款人收入",q:"共同借款人的收入类型？",type:"choice",opts:["工资收入 (W2)","自雇","其他(跳过)"],req:true});
      var coW2=answers.coIncomeType==="工资收入 (W2)",coSE=answers.coIncomeType==="自雇";
      if(coW2){s.push({id:"coEmployerName",q:"共同借款人的雇主？",type:"text",ph:"公司名称",req:true});s.push({id:"coPosition",q:"共同借款人的职位？",type:"text",ph:"职位",req:true});s.push({id:"coDuration",q:"工作多长时间？",type:"duration",req:true});if(needsPrevEmployer(answers.coDuration)){s.push({id:"coPrevEmployer",q:"共同借款人的前雇主？",type:"text",ph:"前公司名称",req:true});s.push({id:"coPrevPosition",q:"前职位？",type:"text",ph:"职位",req:true});s.push({id:"coPrevDuration",q:"工作多长时间？",type:"duration",req:true});}}
      if(coSE){s.push({id:"coBusinessName",q:"企业名称？",type:"text",ph:"企业名称",req:true});s.push({id:"coOwnership",q:"是否拥有25%以上股份？",type:"choice",opts:["是，25%以上","低于25%"],req:true});s.push({id:"coDuration",q:"自雇多长时间？",type:"duration",req:true});}
    }
    s.push({id:"decProperty",section:"声明",q:"",type:"decProperty",req:false});
s.push({id:"decFinancial",section:"声明",q:"",type:"decFinancial",req:false});
    if(hasCo){s.push({id:"coDecProperty",section:"共同借款人声明",q:"",type:"coDecProperty",req:false});s.push({id:"coDecFinancial",section:"共同借款人声明",q:"",type:"coDecFinancial",req:false});}
    s.push({id:"attestation",section:"提交",q:"",type:"attestation",req:true});
  }
  return s;
}

function genSummary(){
  const steps=getSteps(),t=LANG[lang],isPurch=answers.transaction===(lang==='en'?'Purchase':'购房');
  let s="=== LOAN APPLICATION SUMMARY ===\n",sec="";
  for(const st of steps){
    if(st.section&&st.section!==sec){sec=st.section;s+="\n--- "+sec+" ---\n";}
    if(st.type==="decProperty"||st.type==="decFinancial"){var isFn=(st.type==="decFinancial");if(!isFn)s+="\n[Borrower Declarations]\n";var allD=isFn?DEC_FINANCIAL[lang]:DEC_PROPERTY[lang];for(var j=0;j<allD.length;j++){var d=allD[j];if(d.purchaseOnly&&!isPurch)continue;s+=d.q+" "+(dec[d.id]||"N/A")+"\n";if(d.trigger&&dec[d.id]===d.trigger.val){for(var k=0;k<d.trigger.show.length;k++){var sub=d.trigger.show[k];if(dec[sub.id])s+="  "+sub.q+" "+dec[sub.id]+"\n";}}}}
    else if(st.type==="coDecProperty"||st.type==="coDecFinancial"){var cFn=(st.type==="coDecFinancial");if(!cFn)s+="\n[Co-Borrower Declarations]\n";var cDL=cFn?DEC_FINANCIAL[lang]:DEC_PROPERTY[lang];for(var ci=0;ci<cDL.length;ci++){var cd=cDL[ci];if(cd.purchaseOnly&&!isPurch)continue;s+=cd.q+" "+(coDec[cd.id]||"N/A")+"\n";if(cd.trigger&&coDec[cd.id]===cd.trigger.val){for(var ck=0;ck<cd.trigger.show.length;ck++){var csb=cd.trigger.show[ck];if(coDec[csb.id])s+="  "+csb.q+" "+coDec[csb.id]+"\n";}}}}
    else if(st.type==="multi"){const vals=st.fields.map(f=>answers[f.id]||'').filter(Boolean).join(' ');if(vals)s+=st.q+" "+vals+"\n";}
    else if(st.type==="loanltv"){if(answers.loanAmount)s+="Loan Amount: "+answers.loanAmount+"\n";if(answers.ltvCalc)s+="LTV: "+answers.ltvCalc+"%\n";}
    else if(st.type!=="attestation"&&answers[st.id]){if(st.type==="duration"){const p=answers[st.id].split("|");s+=st.q+" "+(p[0]||0)+" yrs, "+(p[1]||0)+" mos\n";}else s+=st.q+" "+answers[st.id]+"\n";}
  }
  return s;
}

function goNext(){const steps=getSteps();if(step<steps.length-1)step++;else phase="review";render();}
function goBack(){if(step>0)step--;else step=-1;render();}
function pick(val){answers[getSteps()[step].id]=val;setTimeout(goNext,200);}
function toggleLang(){const map=lang==='en'?MAP_EN_ZH:MAP_ZH_EN;answers=translateObj(answers,map);dec=translateObj(dec,map);coDec=translateObj(coDec,map);lang=lang==='en'?'zh':'en';render();}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

function calcLTV(){
  var loan=parseFloat(String(answers.loanAmount||'').replace(/[^0-9.]/g,''));
  var val=parseFloat(String(answers.purchasePrice||answers.appraisedValue||'').replace(/[^0-9.]/g,''));
  if(loan&&val&&val>0){answers.ltvCalc=(loan/val*100).toFixed(3);}else{answers.ltvCalc='';}
}
function calcLoanFromLTV(){
  var ltv=parseFloat(String(answers.ltvCalc||'').replace(/[^0-9.]/g,''));
  var val=parseFloat(String(answers.purchasePrice||answers.appraisedValue||'').replace(/[^0-9.]/g,''));
  if(ltv&&val&&val>0){answers.loanAmount=Math.round(val*ltv/100).toString();}
}

function render(){
  const app=document.getElementById('app'),t=LANG[lang],steps=getSteps(),total=steps.length,cur=steps[step],isPurch=answers.transaction===(lang==='en'?'Purchase':'购房');
  let h='';

  // WELCOME
  if(step===-1&&phase==='form'){h+='<button class="lang-btn" onclick="toggleLang()">'+t.lang+'</button><div style="text-align:center;padding-top:8px;margin-bottom:28px"><div class="jc">JC</div><h1>'+t.title+'</h1><p class="sub">'+t.subtitle+'</p><p class="co">'+t.company+'</p></div><div class="info-box">'+t.startSub+'</div><button class="primary" onclick="step=0;render()">'+t.start+'</button>';app.innerHTML=h;document.body.style.justifyContent='center';return;}

  // REVIEW
  if(phase==='review'){document.body.style.justifyContent='flex-start';h+='<h2 style="font-size:1.3rem;font-weight:700;color:#3a2e1e;text-align:center;margin:0 0 4px">'+t.review+'</h2><p style="color:#8a7a60;font-size:.82rem;text-align:center;margin-bottom:20px">'+t.reviewSub+'</p><div class="review-scroll">';var sec="";for(const st of steps){if(st.section&&st.section!==sec){sec=st.section;h+='<div class="review-section"><div class="review-label">'+sec+'</div>';}if(st.type==="decProperty"||st.type==="decFinancial"||st.type==="coDecProperty"||st.type==="coDecFinancial"){var store=(st.type==="coDecProperty"||st.type==="coDecFinancial")?coDec:dec;var isFn=(st.type==="decFinancial"||st.type==="coDecFinancial");var allDr=isFn?DEC_FINANCIAL[lang]:DEC_PROPERTY[lang];for(const d of allDr){if(d.purchaseOnly&&!isPurch)continue;if(store[d.id])h+='<div class="review-row"><span class="review-q">'+d.q+'</span><span class="review-a">'+esc(store[d.id])+'</span></div>';if(d.trigger&&store[d.id]===d.trigger.val){for(const sub of d.trigger.show){if(store[sub.id])h+='<div class="review-row"><span class="review-q" style="padding-left:12px">'+sub.q+'</span><span class="review-a">'+esc(store[sub.id])+'</span></div>';}}}}else if(st.type==="multi"){var vals=st.fields.map(function(f){return answers[f.id]||'';}).filter(Boolean).join(' ');if(vals)h+='<div class="review-row"><span class="review-q">'+st.q+'</span><span class="review-a">'+esc(vals)+'</span></div>';}else if(st.type==="loanltv"){if(answers.loanAmount)h+='<div class="review-row"><span class="review-q">'+(lang==='en'?'Loan Amount':'贷款金额')+'</span><span class="review-a">$'+esc(answers.loanAmount)+'</span></div>';if(answers.ltvCalc)h+='<div class="review-row"><span class="review-q">LTV</span><span class="review-a">'+esc(answers.ltvCalc)+'%</span></div>';}else if(st.type!=="attestation"&&answers[st.id]){var v=answers[st.id];if(st.type==="duration"){var p=v.split("|");v=(p[0]||0)+" "+t.years+", "+(p[1]||0)+" "+t.months;}h+='<div class="review-row"><span class="review-q">'+st.q+'</span><span class="review-a">'+esc(v)+'</span></div>';}}h+='</div></div><button class="primary" onclick="phase=\'done\';render()">'+t.submit+'</button><div class="nav-center"><button class="ghost" onclick="phase=\'form\';step='+(total-1)+';render()">'+t.back+'</button></div>';app.innerHTML=h;return;}

  // DONE
  if(phase==='done'){document.body.style.justifyContent='center';var summary=encodeURIComponent(genSummary()),subj=encodeURIComponent("Loan Application - "+(answers.borrowerFirst||"")+" "+(answers.borrowerLast||""));h+='<div style="text-align:center"><div class="done-check">✓</div><h2 class="done-title">'+t.submitted+'</h2><p style="color:#6b5c42;font-size:.92rem;line-height:1.5;margin-bottom:6px">'+t.submittedSub+'</p><p style="color:#8a7a60;font-size:.82rem;line-height:1.5;margin-bottom:24px">'+t.submittedNote+'</p><div class="done-btns"><a href="sms:9295235865&body='+summary+'" style="text-decoration:none"><button class="primary" style="display:flex;align-items:center;justify-content:center;gap:8px">'+t.textJack+'</button></a><a href="mailto:jack.chen@gmccloan.com?subject='+subj+'&body='+summary+'" style="text-decoration:none"><button class="primary" style="background:#92400e;display:flex;align-items:center;justify-content:center;gap:8px">'+t.emailJack+'</button></a><button class="secondary-btn" id="copyBtn" onclick="copySum()">'+t.copyText+'</button></div><p style="color:#a0926e;font-size:.75rem;margin-top:16px;line-height:1.4">'+(lang==='en'?'Or call Jack directly: ':'或直接致电 Jack: ')+'<a href="tel:9295235865" style="color:#b45309;font-weight:600;text-decoration:none">929-523-5865</a></p></div>';app.innerHTML=h;return;}

  document.body.style.justifyContent='center';

  // DECLARATIONS with conditional sub-questions
  if(cur.type==='decProperty'||cur.type==='decFinancial'||cur.type==='coDecProperty'||cur.type==='coDecFinancial'){
    var isCo=(cur.type==='coDecProperty'||cur.type==='coDecFinancial');var isFin=(cur.type==='decFinancial'||cur.type==='coDecFinancial'),store=isCo?coDec:dec,yesLabel=lang==='en'?'Yes':'是',noLabel=lang==='en'?'No':'否';
    h+='<button class="lang-btn" onclick="toggleLang()">'+t.lang+'</button><div style="margin-bottom:6px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="sec-label">'+cur.section+'</span><span style="font-size:.72rem;color:#a0926e">'+(step+1)+' '+t.of+' '+total+'</span></div><div class="progress-bar"><div class="progress-fill" style="width:'+((step+1)/total*100)+'%"></div></div></div><h2 style="font-size:1.15rem;font-weight:700;color:#3a2e1e;margin:16px 0 4px">'+(isCo?t.coDecTitle:t.decTitle)+'</h2><p style="font-size:.82rem;color:#8a7a60;margin-bottom:16px;line-height:1.4">'+(isCo?t.coDecSub:t.decSub)+'</p><div class="scroll-area"><div class="dec-section-label">'+(isFin?t.decFinancial:t.decProperty)+'</div>';
    var storeVar=isCo?'coDec':'dec';
    function renderDecQ(d){
      if(d.purchaseOnly&&!isPurch)return'';
      var r='<div class="dec-row"><div class="dec-q">'+d.q+'</div><div class="dec-btns"><div class="dec-btn'+(store[d.id]===yesLabel?' sel':'')+'" data-sv="'+storeVar+'" data-did="'+d.id+'" data-val="'+yesLabel+'">'+yesLabel+'</div><div class="dec-btn'+(store[d.id]===noLabel?' sel':'')+'" data-sv="'+storeVar+'" data-did="'+d.id+'" data-val="'+noLabel+'">'+noLabel+'</div></div></div>';
      // Conditional sub-questions
      if(d.trigger&&store[d.id]===d.trigger.val){
        for(var sub of d.trigger.show){
          if(sub.type==='choice'){
            r+='<div style="padding:8px 0 8px 16px"><div style="font-size:.82rem;color:#4a3f32;margin-bottom:8px">'+sub.q+'</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
            for(var opt of sub.opts)r+='<div class="pill" style="padding:10px;font-size:.82rem'+(store[sub.id]===opt?';border:2px solid #b45309;background:#b45309;color:#fff;font-weight:600':'')+'" data-sv="'+storeVar+'" data-did="'+sub.id+'" data-val="'+esc(opt)+'">'+opt+'</div>';
            r+='</div></div>';
          }else if(sub.type==='text'){
            r+='<div style="padding:8px 0 8px 16px"><div style="font-size:.82rem;color:#4a3f32;margin-bottom:6px">'+sub.q+'</div><input class="text-input" style="padding:10px 14px;font-size:.88rem" placeholder="'+(sub.ph||'')+'" value="'+esc(store[sub.id]||'')+'" oninput="'+storeVar+'[\''+sub.id+'\' ]=this.value"></div>';
          }
        }
      }
      return r;
    }
    var decList=isFin?DEC_FINANCIAL[lang]:DEC_PROPERTY[lang];for(var d of decList)h+=renderDecQ(d);
    h+='</div><button class="primary" style="margin-top:16px" onclick="goNext()">'+t.next+'</button><div class="nav-center"><button class="ghost" onclick="goBack()">'+t.back+'</button></div>';
    app.innerHTML=h;
    // FIX: capture scroll position BEFORE render() replaces the DOM
    document.querySelector('.scroll-area').addEventListener('click',function(e){var el=e.target;while(el&&!el.classList.contains('scroll-area')){if(el.dataset&&el.dataset.sv&&el.dataset.did&&('val' in el.dataset)){window[el.dataset.sv][el.dataset.did]=el.dataset.val;var sp=document.querySelector('.scroll-area').scrollTop;render();var sa2=document.querySelector('.scroll-area');if(sa2)sa2.scrollTop=sp;return;}el=el.parentElement;}});
    return;
  }

  // ATTESTATION
  if(cur.type==='attestation'){h+='<div style="margin-bottom:6px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="sec-label">'+cur.section+'</span><span style="font-size:.72rem;color:#a0926e">'+(step+1)+' '+t.of+' '+total+'</span></div><div class="progress-bar"><div class="progress-fill" style="width:'+((step+1)/total*100)+'%"></div></div></div><h2 style="font-size:1.15rem;font-weight:700;color:#3a2e1e;margin:16px 0 12px">'+t.attestTitle+'</h2><div class="attest-box"><p class="attest-text">'+t.attestText+'</p></div><div class="check-row" onclick="attested=!attested;render()"><div class="checkbox'+(attested?' checked':'')+'">'+( attested?'✓':'')+'</div><span style="font-size:.88rem;color:#4a3f32;line-height:1.4">'+t.attestCheck+'</span></div><button class="primary" '+(attested?'':'disabled')+' onclick="goNext()">'+t.review+' →</button><div class="nav-center"><button class="ghost" onclick="goBack()">'+t.back+'</button></div>';app.innerHTML=h;return;}

  // STANDARD QUESTION
  h+='<button class="lang-btn" onclick="toggleLang()">'+t.lang+'</button><div style="margin-bottom:6px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="sec-label">'+(cur.section||'')+'</span><span style="font-size:.72rem;color:#a0926e">'+(step+1)+' '+t.of+' '+total+'</span></div><div class="progress-bar"><div class="progress-fill" style="width:'+((step+1)/total*100)+'%"></div></div></div><div class="q-area"><h2 class="q-title">'+cur.q+'</h2>';
  if(cur.sub)h+='<p class="q-sub">'+cur.sub+'</p>';else h+='<div style="height:12px"></div>';

  if(cur.type==='choice'){h+='<div class="pills">';for(var opt of cur.opts)h+='<div class="pill'+(answers[cur.id]===opt?' sel':'')+'" onclick="pick(\''+esc(opt)+'\')">' +opt+'</div>';h+='</div>';}

  if(cur.type==='text'){var canGo=cur.req?!!answers[cur.id]:true;h+='<input class="text-input" id="qinput" type="text" placeholder="'+esc(cur.ph||'')+'" value="'+esc(answers[cur.id]||'')+'" oninput="answers[\''+cur.id+'\']=this.value;document.getElementById(\'nextbtn\').disabled=this.value===\'\'&&'+cur.req+'" onkeydown="if(event.key===\'Enter\'&&!document.getElementById(\'nextbtn\').disabled)goNext()"><button class="primary" id="nextbtn" style="margin-top:16px" '+(canGo?'':'disabled')+' onclick="goNext()">'+(step===total-1?t.review:t.next)+'</button>';}

  // LOAN AMOUNT + LTV auto-calc
  if(cur.type==='loanltv'){
    calcLTV();
    h+='<input class="text-input" id="qinput" type="text" placeholder="$ Amount" value="'+esc(answers.loanAmount||'')+'" oninput="answers.loanAmount=this.value;calcLTV();document.getElementById(\'ltvField\').value=answers.ltvCalc||\'\';;document.getElementById(\'nextbtn\').disabled=!this.value;">';
    h+='<div class="ltv-row"><span class="ltv-label">LTV:</span><input class="ltv-input" id="ltvField" type="text" placeholder="0.000%" value="'+esc(answers.ltvCalc||'')+'" oninput="answers.ltvCalc=this.value;calcLoanFromLTV();document.getElementById(\'qinput\').value=answers.loanAmount||\'\'">';
    h+='<span class="ltv-label">%</span></div>';
    var canGo=!!answers.loanAmount;
    h+='<button class="primary" id="nextbtn" style="margin-top:16px" '+(canGo?'':'disabled')+' onclick="goNext()">'+t.next+'</button>';
  }

  if(cur.type==='dropdowns'){
    var occOpts=lang==='en'?["","Primary Residence","Second Home","Investment Property"]:["","自住房","度假屋","投资房"];
    var occLabels=lang==='en'?["Select occupancy...","Primary Residence","Second Home","Investment Property"]:["\u8bf7\u9009\u62e9...","自住房","度假屋","投资房"];
    var ptOpts=lang==='en'?["","Single Family","2-Family","3-Family","4-Family","Condo / Townhouse","PUD","Co-op"]:["","一家庭","两家庭","三家庭","四家庭","Condo/Townhouse","PUD","Co-op"];
    var ptLabels=lang==='en'?["Select property type...","Single Family","2-Family","3-Family","4-Family","Condo / Townhouse","PUD","Co-op"]:["\u8bf7\u9009\u62e9...","一家庭","两家庭","三家庭","四家庭","Condo/Townhouse","PUD","Co-op"];
    h+='<div style="margin-bottom:14px"><label class="dur-label">'+(lang==='en'?'Occupancy':'房屋用途')+'</label><select class="dur-select" onchange="answers.occupancy=this.value;checkDropdowns()"><option value="">'+(lang==='en'?'Select...':'请选择...')+'</option>';
    for(var i=1;i<occOpts.length;i++)h+='<option value="'+esc(occOpts[i])+'"'+(answers.occupancy===occOpts[i]?' selected':'')+'>'+occLabels[i]+'</option>';
    h+='</select></div>';
    h+='<div><label class="dur-label">'+(lang==='en'?'Property Type':'房产类型')+'</label><select class="dur-select" onchange="answers.propertyType=this.value;checkDropdowns()"><option value="">'+(lang==='en'?'Select...':'请选择...')+'</option>';
    for(var i=1;i<ptOpts.length;i++)h+='<option value="'+esc(ptOpts[i])+'"'+(answers.propertyType===ptOpts[i]?' selected':'')+'>'+ptLabels[i]+'</option>';
    h+='</select></div>';
    var ddOk=!!answers.occupancy&&!!answers.propertyType;
    h+='<button class="primary" id="nextbtn" style="margin-top:16px" '+(ddOk?'':'disabled')+' onclick="goNext()">'+t.next+'</button>';
  }
  if(cur.type==='duration'){var parsed=(answers[cur.id]||'').split('|'),yrs=parsed[0]||'',mos=parsed[1]||'';h+='<div class="dur-wrap"><div style="flex:1"><label class="dur-label">'+t.years+'</label><select class="dur-select" onchange="answers[\''+cur.id+'\' ]=this.value+\'|\'+(answers[\''+cur.id+'\'  ]||\'\'  ).split(\'|\')[1]||\'\'  ;render()"><option value="">--</option>';for(var i=0;i<=30;i++)h+='<option value="'+i+'"'+(yrs==String(i)?' selected':'')+'>'+i+'</option>';h+='</select></div><div style="flex:1"><label class="dur-label">'+t.months+'</label><select class="dur-select" onchange="var p=(answers[\''+cur.id+'\'  ]||\'\'  ).split(\'|\');answers[\''+cur.id+'\'  ]=(p[0]||\'\')+\'|\'+this.value;render()"><option value="">--</option>';for(var i=0;i<12;i++)h+='<option value="'+i+'"'+(mos==String(i)?' selected':'')+'>'+i+'</option>';h+='</select></div></div><button class="primary" style="margin-top:16px" onclick="goNext()">'+t.next+'</button>';}

  if(cur.type==='multi'){var cols=cur.fields.length>2?2:cur.fields.length;h+='<div style="display:grid;grid-template-columns:repeat('+cols+',1fr);gap:10px">';for(var f of cur.fields){h+='<div><input class="text-input" id="qinput_'+f.id+'" type="text" placeholder="'+esc(f.ph||'')+'" value="'+esc(answers[f.id]||'')+'" oninput="answers[\''+f.id+'\' ]=this.value;checkMultiNext()" onkeydown="if(event.key===\'Enter\'&&!document.getElementById(\'nextbtn\').disabled)goNext()"></div>';}h+='</div>';var allFilled=cur.fields.every(function(f){return !f.req||answers[f.id];});h+='<button class="primary" id="nextbtn" style="margin-top:16px" '+(allFilled?'':'disabled')+' onclick="goNext()">'+(step===total-1?t.review:t.next)+'</button>';}

  h+='</div><div class="nav-center"><button class="ghost" onclick="goBack()">'+t.back+'</button></div>';app.innerHTML=h;
  if(cur.type==='text'||cur.type==='loanltv'){var inp=document.getElementById('qinput');if(inp)setTimeout(function(){inp.focus();},100);}
  if(cur.type==='multi'){var inp2=document.getElementById('qinput_'+cur.fields[0].id);if(inp2)setTimeout(function(){inp2.focus();},100);}
}

function checkDropdowns(){var btn=document.getElementById('nextbtn');if(btn)btn.disabled=!(answers.occupancy&&answers.propertyType);}
function checkMultiNext(){var steps=getSteps(),cur=steps[step];if(!cur||cur.type!=='multi')return;var allFilled=cur.fields.every(function(f){return !f.req||answers[f.id];});var btn=document.getElementById('nextbtn');if(btn)btn.disabled=!allFilled;}
function copySum(){navigator.clipboard.writeText(genSummary()).then(function(){var btn=document.getElementById('copyBtn');if(btn){btn.textContent=LANG[lang].copied;setTimeout(function(){btn.textContent=LANG[lang].copyText;},2000);}});}
render();

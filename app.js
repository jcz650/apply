let lang='en',step=-1,phase='form',answers={},dec={},coDec={},attested=false;

const LANG={en:{title:"Mortgage Application",subtitle:"with Jack Chen \u00b7 NMLS #2425956",company:"General Mortgage Capital Corporation",start:"Let's Get Started",startSub:"This takes about a few minutes \u2014 nice and easy.",next:"Next \u2192",back:"\u2190 Back",submit:"Submit Application",review:"Review Your Answers",reviewSub:"Make sure everything looks right before submitting.",submitted:"Application Submitted!",submittedSub:"Jack will review your info and reach out shortly.",submittedNote:"Next steps: Jack will send you a DocuSign for authorization (eConsent, credit check & appraisal), and let you know which documents to upload.",copyText:"\ud83d\udccb Copy Summary",copied:"\u2713 Copied!",of:"of",lang:"\u4e2d\u6587",yes:"Yes",no:"No",years:"Years",months:"Months",decTitle:"Declarations",decSub:"Please answer Yes or No to each. These are standard questions required on all mortgage applications.",decProperty:"Property & Funding",decFinancial:"Financial History (Past 7 Years)",coDecTitle:"Co-Borrower Declarations",coDecSub:"Same questions for your co-borrower.",attestTitle:"Borrower Attestation",attestText:"I confirm that the information I've provided is accurate and complete to the best of my knowledge. I understand this information will be used to prepare my official mortgage application (URLA). I authorize the loan officer to use this data to generate my full application and proceed with next steps.",attestCheck:"I have read and agree to the above attestation.",textJack:"\ud83d\udcac Text My Application to Jack",emailJack:"\u2709\ufe0f Email My Application to Jack"},zh:{title:"\u623f\u5c4b\u8d37\u6b3e\u7533\u8bf7",subtitle:"Jack Chen \u00b7 NMLS #2425956",company:"\u4e07\u901a\u8d37\u6b3e\u94f6\u884c",start:"\u5f00\u59cb\u7533\u8bf7",startSub:"\u53ea\u9700\u51e0\u5206\u949f\uff0c\u8f7b\u677e\u586b\u5199\u3002",next:"\u4e0b\u4e00\u6b65 \u2192",back:"\u2190 \u8fd4\u56de",submit:"\u63d0\u4ea4\u7533\u8bf7",review:"\u786e\u8ba4\u60a8\u7684\u56de\u7b54",reviewSub:"\u63d0\u4ea4\u524d\u8bf7\u786e\u8ba4\u4fe1\u606f\u662f\u5426\u6b63\u786e\u3002",submitted:"\u7533\u8bf7\u5df2\u63d0\u4ea4\uff01",submittedSub:"Jack \u5c06\u4f1a\u5ba1\u6838\u60a8\u7684\u4fe1\u606f\u5e76\u5c3d\u5feb\u8054\u7cfb\u60a8\u3002",submittedNote:"\u4e0b\u4e00\u6b65\uff1aJack \u5c06\u901a\u8fc7 DocuSign \u53d1\u9001\u6388\u6743\u4e66\uff08\u7535\u5b50\u7b7e\u7f72\u540c\u610f\u3001\u4fe1\u7528\u5ba1\u6838\u548c\u623f\u5c4b\u4f30\u4ef7\uff09\uff0c\u5e76\u544a\u77e5\u60a8\u9700\u8981\u4e0a\u4f20\u7684\u6587\u4ef6\u3002",copyText:"\ud83d\udccb \u590d\u5236\u6458\u8981",copied:"\u2713 \u5df2\u590d\u5236\uff01",of:"/",lang:"English",yes:"\u662f",no:"\u5426",years:"\u5e74",months:"\u6708",decTitle:"\u8d37\u6b3e\u7533\u8bf7\u4eba\u58f0\u660e",decSub:"\u8bf7\u56de\u7b54\u4ee5\u4e0b\u6807\u51c6\u8d37\u6b3e\u7533\u8bf7\u95ee\u9898\uff0c\u9009\u62e9\u300c\u662f\u300d\u6216\u300c\u5426\u300d\u3002",decProperty:"\u623f\u4ea7\u4e0e\u8d44\u91d1",decFinancial:"\u8d22\u52a1\u5386\u53f2\uff08\u8fc7\u53bb7\u5e74\uff09",coDecTitle:"\u5171\u540c\u501f\u6b3e\u4eba\u58f0\u660e",coDecSub:"\u8bf7\u5171\u540c\u501f\u6b3e\u4eba\u56de\u7b54\u76f8\u540c\u7684\u95ee\u9898\u3002",attestTitle:"\u501f\u6b3e\u4eba\u58f0\u660e",attestText:"\u672c\u4eba\u7279\u6b64\u58f0\u660e\u5e76\u4fdd\u8bc1\uff0c\u672c\u4eba\u5728\u672c\u8868\u683c\u4e2d\u63d0\u4f9b\u7684\u4fe1\u606f\u5747\u771f\u5b9e\u3001\u51c6\u786e\u3001\u5b8c\u6574\uff0c\u4e14\u7b26\u5408\u672c\u4eba\u6240\u77e5\u7684\u6700\u4f73\u60c5\u51b5\u3002\u672c\u4eba\u7406\u89e3\u5e76\u540c\u610f\uff0c\u8be5\u4fe1\u606f\u5c06\u7528\u4e8e\u51c6\u5907\u672c\u4eba\u6b63\u5f0f\u62b5\u62bc\u8d37\u6b3e\u7533\u8bf7\uff08URLA\uff09\u3002\u672c\u4eba\u901a\u8fc7\u52fe\u9009\u4e0b\u65b9\u590d\u9009\u6846\uff0c\u660e\u786e\u6388\u6743\u8d37\u6b3e\u4e13\u5458\u4f7f\u7528\u672c\u8868\u683c\u6240\u8f7d\u4fe1\u606f\uff0c\u4ee5\u751f\u6210\u5b8c\u6574\u7684\u8d37\u6b3e\u7533\u8bf7\uff0c\u5e76\u63a8\u8fdb\u76f8\u5173\u8d37\u6b3e\u5ba1\u6279\u6d41\u7a0b\u3002",attestCheck:"\u672c\u4eba\u5df2\u9605\u8bfb\u5e76\u540c\u610f\u4e0a\u8ff0\u58f0\u660e\uff0c\u5e76\u63d0\u4ea4\u672c\u7533\u8bf7\u3002",textJack:"\ud83d\udcac \u53d1\u9001\u7533\u8bf7\u77ed\u4fe1\u7ed9 Jack",emailJack:"\u2709\ufe0f \u53d1\u9001\u7533\u8bf7\u90ae\u4ef6\u7ed9 Jack"}};

const DEC_PROPERTY={en:[
  {id:"occupyProperty",q:"Will you occupy the property as your primary residence?",trigger:{val:"Yes",show:[{id:"priorProperty",q:"Have you had an ownership interest in another property in the last 3 years?",trigger:{val:"Yes",show:[{id:"priorPropertyType",q:"What type of property did you own?",type:"choice",opts:["Primary Residence","Second Home","Investment Property"]},{id:"titleHeld",q:"How did you hold title to the property?",type:"choice",opts:["By Yourself","Jointly with Spouse","Jointly with Others"]}]}}]}},
  {id:"sellerRelationship",q:"Do you have a family relationship or business affiliation with the seller?",purchaseOnly:true},
  {id:"borrowedFunds",q:"Are you borrowing any money for this transaction (e.g., closing costs or down payment) not disclosed on this application?",trigger:{val:"Yes",show:[{id:"borrowedAmount",q:"What is the amount of this money?",type:"text",ph:"$ Amount"}]}},
  {id:"otherMortgage",q:"Have you or will you be applying for a mortgage on another property not disclosed on this application?"},
  {id:"newCredit",q:"Have you or will you be applying for any new credit (e.g., installment loan, credit card) not disclosed on this application?"},
  {id:"priorityLien",q:"Will this property be subject to a lien that could take priority over the first mortgage (e.g., PACE)?"}
],zh:[
  {id:"occupyProperty",q:"\u60a8\u662f\u5426\u4f1a\u81ea\u4f4f\u8be5\u623f\u4ea7\uff1f",trigger:{val:"\u662f",show:[{id:"priorProperty",q:"\u60a8\u8fc7\u53bb\u4e09\u5e74\u662f\u5426\u6301\u6709\u8fc7\u5176\u4ed6\u623f\u4ea7\uff1f",trigger:{val:"\u662f",show:[{id:"priorPropertyType",q:"\u60a8\u62e5\u6709\u7684\u623f\u4ea7\u7c7b\u578b\u662f\u4ec0\u4e48\uff1f",type:"choice",opts:["\u81ea\u4f4f\u623f","\u5ea6\u5047\u5c4b","\u6295\u8d44\u623f"]},{id:"titleHeld",q:"\u60a8\u662f\u5982\u4f55\u6301\u6709\u8be5\u623f\u4ea7\u7684\u4ea7\u6743\uff1f",type:"choice",opts:["\u5355\u72ec\u6301\u6709","\u4e0e\u914d\u5076\u5171\u540c\u6301\u6709","\u4e0e\u4ed6\u4eba\u5171\u540c\u6301\u6709"]}]}}]}},
  {id:"sellerRelationship",q:"\u60a8\u662f\u5426\u4e0e\u623f\u4ea7\u5356\u65b9\u6709\u5bb6\u5ead\u5173\u7cfb\u6216\u4e1a\u52a1\u5173\u8054\uff1f",purchaseOnly:true},
  {id:"borrowedFunds",q:"\u60a8\u662f\u5426\u4e3a\u6b64\u6b21\u4ea4\u6613\u501f\u6b3e\uff08\u5982\u9996\u4ed8\u6216\u8fc7\u6237\u8d39\uff09\uff0c\u4e14\u672a\u5728\u6b64\u7533\u8bf7\u4e2d\u62ab\u9732\uff1f",trigger:{val:"\u662f",show:[{id:"borrowedAmount",q:"\u8fd9\u7b14\u8d44\u91d1\u7684\u91d1\u989d\u662f\u591a\u5c11\uff1f",type:"text",ph:"$ \u91d1\u989d"}]}},
  {id:"otherMortgage",q:"\u60a8\u662f\u5426\u5df2\u7533\u8bf7\u6216\u5c06\u7533\u8bf7\u53e6\u4e00\u5904\u623f\u4ea7\u7684\u62b5\u62bc\u8d37\u6b3e\uff0c\u4e14\u672a\u5728\u6b64\u7533\u8bf7\u4e2d\u62ab\u9732\uff1f"},
  {id:"newCredit",q:"\u60a8\u662f\u5426\u5df2\u7533\u8bf7\u6216\u5c06\u7533\u8bf7\u65b0\u7684\u4fe1\u7528\u989d\u5ea6\uff0c\u4e14\u672a\u5728\u6b64\u7533\u8bf7\u4e2d\u62ab\u9732\uff1f"},
  {id:"priorityLien",q:"\u8be5\u623f\u4ea7\u662f\u5426\u4f1a\u53d7\u5230\u4f18\u5148\u7559\u7f6e\u6743\u5f71\u54cd\uff08\u5982PACE\u8ba1\u5212\uff09\uff1f"}
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
  {id:"coSigner",q:"\u60a8\u662f\u5426\u662f\u672a\u62ab\u9732\u503a\u52a1\u7684\u5171\u540c\u7b7e\u7f72\u4eba\u6216\u62c5\u4fdd\u4eba\uff1f"},
  {id:"judgments",q:"\u60a8\u662f\u5426\u6709\u672a\u507f\u8fd8\u7684\u5224\u51b3\uff1f"},
  {id:"federalDebt",q:"\u60a8\u662f\u5426\u62d6\u6b20\u6216\u8fdd\u7ea6\u8054\u90a6\u503a\u52a1\uff1f"},
  {id:"lawsuit",q:"\u60a8\u662f\u5426\u6d89\u53ca\u53ef\u80fd\u627f\u62c5\u8d22\u52a1\u8d23\u4efb\u7684\u8bc9\u8bbc\uff1f"},
  {id:"deedInLieu",q:"\u8fc7\u53bb7\u5e74\u662f\u5426\u4ee5\u4ee3\u66ff\u6b62\u8d4e\u65b9\u5f0f\u8f6c\u8ba9\u8fc7\u4ea7\u6743\uff1f"},
  {id:"shortSale",q:"\u8fc7\u53bb7\u5e74\u662f\u5426\u5b8c\u6210\u8fc7\u77ed\u552e\uff1f"},
  {id:"foreclosure",q:"\u8fc7\u53bb7\u5e74\u662f\u5426\u6709\u623f\u4ea7\u88ab\u6b62\u8d4e\uff1f"},
  {id:"bankruptcy",q:"\u8fc7\u53bb7\u5e74\u662f\u5426\u5ba3\u5e03\u8fc7\u7834\u4ea7\uff1f",trigger:{val:"\u662f",show:[{id:"bankruptcyType",q:"\u8bf7\u9009\u62e9\u7834\u4ea7\u7c7b\u578b\uff1a",type:"choice",opts:["\u7b2c7\u7ae0\u7834\u4ea7","\u7b2c11\u7ae0\u7834\u4ea7","\u7b2c12\u7ae0\u7834\u4ea7","\u7b2c13\u7ae0\u7834\u4ea7"]}]}}
]};

const MAP_EN_ZH={"Yes":"\u662f","No":"\u5426","Purchase":"\u8d2d\u623f","Refinance":"\u91cd\u65b0\u8d37\u6b3e","Primary Residence":"\u81ea\u4f4f\u623f","Second Home":"\u5ea6\u5047\u5c4b","Investment Property":"\u6295\u8d44\u623f","Single Family":"\u4e00\u5bb6\u5ead","2-Family":"\u4e24\u5bb6\u5ead","3-Family":"\u4e09\u5bb6\u5ead","4-Family":"\u56db\u5bb6\u5ead","Condo / Townhouse":"Condo/Townhouse","PUD":"PUD","Co-op":"Co-op","W2 / Salary":"\u5de5\u8d44\u6536\u5165 (W2)","Self-Employed":"\u81ea\u96c7","Other (Skip)":"\u5176\u4ed6(\u8df3\u8fc7)","Yes, 25% or more":"\u662f\uff0c25%\u4ee5\u4e0a","Less than 25%":"\u4f4e\u4e8e25%","By Yourself":"\u5355\u72ec\u6301\u6709","Jointly with Spouse":"\u4e0e\u914d\u5076\u5171\u540c\u6301\u6709","Jointly with Others":"\u4e0e\u4ed6\u4eba\u5171\u540c\u6301\u6709","Chapter 7":"\u7b2c7\u7ae0\u7834\u4ea7","Chapter 11":"\u7b2c11\u7ae0\u7834\u4ea7","Chapter 12":"\u7b2c12\u7ae0\u7834\u4ea7","Chapter 13":"\u7b2c13\u7ae0\u7834\u4ea7"};
const MAP_ZH_EN=Object.fromEntries(Object.entries(MAP_EN_ZH).map(([k,v])=>[v,k]));
function translateObj(obj,map){const o={};for(const[k,v]of Object.entries(obj))o[k]=map[v]||v;return o;}

function needsPrevEmployer(durVal){
  if(!durVal)return false;
  var p=durVal.split('|');var y=parseInt(p[0])||0;
  return y<2;
}

function getSteps(){
  const t=LANG[lang],isPurch=answers.transaction===(lang==='en'?'Purchase':'\u8d2d\u623f'),hasCo=answers.coborrower===t.yes;
  const isW2=answers.incomeType===(lang==='en'?'W2 / Salary':'\u5de5\u8d44\u6536\u5165 (W2)');
  const isSE=answers.incomeType===(lang==='en'?'Self-Employed':'\u81ea\u96c7');
  const skip=answers.incomeType===(lang==='en'?'Other (Skip)':'\u5176\u4ed6(\u8df3\u8fc7)');
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
    s.push({id:"borrowerInfo",section:"\u4e2a\u4eba\u4fe1\u606f",q:"\u60a8\u7684\u59d3\u540d\u548c\u8054\u7cfb\u65b9\u5f0f\uff1f",type:"multi",fields:[{id:"borrowerFirst",ph:"\u540d",req:true},{id:"borrowerLast",ph:"\u59d3",req:true},{id:"email",ph:"\u7535\u5b50\u90ae\u7bb1",req:true},{id:"phone",ph:"\u7535\u8bdd\u53f7\u7801",req:true}],req:true});
    s.push({id:"coborrower",q:"\u662f\u5426\u6709\u5171\u540c\u501f\u6b3e\u4eba\uff1f",type:"choice",opts:["\u662f","\u5426"],req:true});
    if(hasCo){s.push({id:"coInfo",q:"\u5171\u540c\u501f\u6b3e\u4eba\u7684\u59d3\u540d\u548c\u8054\u7cfb\u65b9\u5f0f\uff1f",type:"multi",fields:[{id:"coFirst",ph:"\u540d",req:true},{id:"coLast",ph:"\u59d3",req:true},{id:"coEmail",ph:"\u7535\u5b50\u90ae\u7bb1",req:true},{id:"coPhone",ph:"\u7535\u8bdd\u53f7\u7801",req:true}],req:true});}
    s.push({id:"transaction",section:"\u623f\u4ea7\u4fe1\u606f",q:"\u60a8\u662f\u8d2d\u623f\u8fd8\u662f\u91cd\u65b0\u8d37\u6b3e\uff1f",type:"choice",opts:["\u8d2d\u623f","\u91cd\u65b0\u8d37\u6b3e"],req:true});
    s.push({id:"propDetails",q:"\u623f\u4ea7\u8be6\u60c5",type:"dropdowns",req:true});
    s.push({id:"address",q:"\u623f\u4ea7\u5730\u5740\uff1f",sub:"\u5982\u5c1a\u672a\u786e\u5b9a\uff0c\u8bf7\u8f93\u5165\u610f\u5411\u57ce\u5e02\u548c\u5dde\u3002",type:"text",ph:"\u8857\u9053, \u57ce\u5e02, \u5dde, \u90ae\u7f16",req:true});
    if(isPurch)s.push({id:"purchasePrice",q:"\u8d2d\u4e70\u4ef7\u683c\uff1f",type:"text",ph:"$ \u91d1\u989d",req:true});
    else if(answers.transaction)s.push({id:"appraisedValue",q:"\u623f\u4ea7\u9884\u4f30\u4ef7\u503c\uff1f",type:"text",ph:"$ \u91d1\u989d",req:true});
    s.push({id:"loanAmount",q:"\u671f\u671b\u8d37\u6b3e\u91d1\u989d\uff1f",type:"loanltv",req:true});
    s.push({id:"incomeType",section:"\u6536\u5165\u4fe1\u606f",q:"\u60a8\u7684\u6536\u5165\u7c7b\u578b\uff1f",type:"choice",opts:["\u5de5\u8d44\u6536\u5165 (W2)","\u81ea\u96c7","\u5176\u4ed6(\u8df3\u8fc7)"],req:true});
    if(isW2){
      s.push({id:"employerName",q:"\u96c7\u4e3b\u540d\u79f0\uff1f",type:"text",ph:"\u516c\u53f8\u540d\u79f0",req:true});
      s.push({id:"position",q:"\u60a8\u7684\u804c\u4f4d\uff1f",type:"text",ph:"\u4f8b\u5982\uff1a\u5e02\u573a\u7ecf\u7406",req:true});
      s.push({id:"duration",q:"\u5728\u8be5\u516c\u53f8\u5de5\u4f5c\u591a\u957f\u65f6\u95f4\uff1f",type:"duration",req:true});
      if(needsPrevEmployer(answers.duration)){
        s.push({id:"prevEmployerName",q:"\u524d\u96c7\u4e3b\u540d\u79f0\uff1f",type:"text",ph:"\u524d\u516c\u53f8\u540d\u79f0",req:true});
        s.push({id:"prevPosition",q:"\u524d\u804c\u4f4d\uff1f",type:"text",ph:"\u804c\u4f4d",req:true});
        s.push({id:"prevDuration",q:"\u5728\u524d\u96c7\u4e3b\u5de5\u4f5c\u591a\u957f\u65f6\u95f4\uff1f",type:"duration",req:true});
      }
    }
    if(isSE){
      s.push({id:"businessName",q:"\u4f01\u4e1a\u540d\u79f0\uff1f",type:"text",ph:"\u4f01\u4e1a\u540d\u79f0",req:true});
      s.push({id:"ownershipShare",q:"\u662f\u5426\u62e5\u670925%\u4ee5\u4e0a\u80a1\u4efd\uff1f",type:"choice",opts:["\u662f\uff0c25%\u4ee5\u4e0a","\u4f4e\u4e8e25%"],req:true});
      s.push({id:"duration",q:"\u81ea\u96c7\u591a\u957f\u65f6\u95f4\uff1f",type:"duration",req:true});
      if(needsPrevEmployer(answers.duration)){
        s.push({id:"prevEmployerName",q:"\u524d\u96c7\u4e3b/\u4f01\u4e1a\u540d\u79f0\uff1f",type:"text",ph:"\u524d\u516c\u53f8\u540d\u79f0",req:true});
        s.push({id:"prevPosition",q:"\u524d\u804c\u4f4d\uff1f",type:"text",ph:"\u804c\u4f4d",req:true});
        s.push({id:"prevDuration",q:"\u5728\u524d\u96c7\u4e3b\u5de5\u4f5c\u591a\u957f\u65f6\u95f4\uff1f",type:"duration",req:true});
      }
    }
    if(hasCo&&!skip){
      s.push({id:"coIncomeType",section:"\u5171\u540c\u501f\u6b3e\u4eba\u6536\u5165",q:"\u5171\u540c\u501f\u6b3e\u4eba\u7684\u6536\u5165\u7c7b\u578b\uff1f",type:"choice",opts:["\u5de5\u8d44\u6536\u5165 (W2)","\u81ea\u96c7","\u5176\u4ed6(\u8df3\u8fc7)"],req:true});
      var coW2=answers.coIncomeType==="\u5de5\u8d44\u6536\u5165 (W2)",coSE=answers.coIncomeType==="\u81ea\u96c7";
      if(coW2){s.push({id:"coEmployerName",q:"\u5171\u540c\u501f\u6b3e\u4eba\u7684\u96c7\u4e3b\uff1f",type:"text",ph:"\u516c\u53f8\u540d\u79f0",req:true});s.push({id:"coPosition",q:"\u5171\u540c\u501f\u6b3e\u4eba\u7684\u804c\u4f4d\uff1f",type:"text",ph:"\u804c\u4f4d",req:true});s.push({id:"coDuration",q:"\u5de5\u4f5c\u591a\u957f\u65f6\u95f4\uff1f",type:"duration",req:true});if(needsPrevEmployer(answers.coDuration)){s.push({id:"coPrevEmployer",q:"\u5171\u540c\u501f\u6b3e\u4eba\u7684\u524d\u96c7\u4e3b\uff1f",type:"text",ph:"\u524d\u516c\u53f8\u540d\u79f0",req:true});s.push({id:"coPrevPosition",q:"\u524d\u804c\u4f4d\uff1f",type:"text",ph:"\u804c\u4f4d",req:true});s.push({id:"coPrevDuration",q:"\u5de5\u4f5c\u591a\u957f\u65f6\u95f4\uff1f",type:"duration",req:true});}}
      if(coSE){s.push({id:"coBusinessName",q:"\u4f01\u4e1a\u540d\u79f0\uff1f",type:"text",ph:"\u4f01\u4e1a\u540d\u79f0",req:true});s.push({id:"coOwnership",q:"\u662f\u5426\u62e5\u670925%\u4ee5\u4e0a\u80a1\u4efd\uff1f",type:"choice",opts:["\u662f\uff0c25%\u4ee5\u4e0a","\u4f4e\u4e8e25%"],req:true});s.push({id:"coDuration",q:"\u81ea\u96c7\u591a\u957f\u65f6\u95f4\uff1f",type:"duration",req:true});}
    }
    s.push({id:"decProperty",section:"\u58f0\u660e",q:"",type:"decProperty",req:false});
    s.push({id:"decFinancial",section:"\u58f0\u660e",q:"",type:"decFinancial",req:false});
    if(hasCo){s.push({id:"coDecProperty",section:"\u5171\u540c\u501f\u6b3e\u4eba\u58f0\u660e",q:"",type:"coDecProperty",req:false});s.push({id:"coDecFinancial",section:"\u5171\u540c\u501f\u6b3e\u4eba\u58f0\u660e",q:"",type:"coDecFinancial",req:false});}
    s.push({id:"attestation",section:"\u63d0\u4ea4",q:"",type:"attestation",req:true});
  }
  return s;
}

function genSummary(){
  const steps=getSteps(),t=LANG[lang],isPurch=answers.transaction===(lang==='en'?'Purchase':'\u8d2d\u623f');
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
  const app=document.getElementById('app'),t=LANG[lang],steps=getSteps(),total=steps.length,cur=steps[step],isPurch=answers.transaction===(lang==='en'?'Purchase':'\u8d2d\u623f');
  let h='';

  if(step===-1&&phase==='form'){h+='<button class="lang-btn" onclick="toggleLang()">'+t.lang+'</button><div style="text-align:center;padding-top:8px;margin-bottom:28px"><div class="jc">JC</div><h1>'+t.title+'</h1><p class="sub">'+t.subtitle+'</p><p class="co">'+t.company+'</p></div><div class="info-box">'+t.startSub+'</div><button class="primary" onclick="step=0;render()">'+t.start+'</button>';app.innerHTML=h;document.body.style.justifyContent='center';return;}

  if(phase==='review'){document.body.style.justifyContent='flex-start';h+='<h2 style="font-size:1.3rem;font-weight:700;color:#3a2e1e;text-align:center;margin:0 0 4px">'+t.review+'</h2><p style="color:#8a7a60;font-size:.82rem;text-align:center;margin-bottom:20px">'+t.reviewSub+'</p><div class="review-scroll">';var sec="";for(const st of steps){if(st.section&&st.section!==sec){sec=st.section;h+='<div class="review-section"><div class="review-label">'+sec+'</div>';}if(st.type==="decProperty"||st.type==="decFinancial"||st.type==="coDecProperty"||st.type==="coDecFinancial"){var store=(st.type==="coDecProperty"||st.type==="coDecFinancial")?coDec:dec;var isFn=(st.type==="decFinancial"||st.type==="coDecFinancial");var allDr=isFn?DEC_FINANCIAL[lang]:DEC_PROPERTY[lang];for(const d of allDr){if(d.purchaseOnly&&!isPurch)continue;if(store[d.id])h+='<div class="review-row"><span class="review-q">'+d.q+'</span><span class="review-a">'+esc(store[d.id])+'</span></div>';if(d.trigger&&store[d.id]===d.trigger.val){for(const sub of d.trigger.show){if(store[sub.id])h+='<div class="review-row"><span class="review-q" style="padding-left:12px">'+sub.q+'</span><span class="review-a">'+esc(store[sub.id])+'</span></div>';}}}}else if(st.type==="multi"){var vals=st.fields.map(function(f){return answers[f.id]||'';}).filter(Boolean).join(' ');if(vals)h+='<div class="review-row"><span class="review-q">'+st.q+'</span><span class="review-a">'+esc(vals)+'</span></div>';}else if(st.type==="loanltv"){if(answers.loanAmount)h+='<div class="review-row"><span class="review-q">'+(lang==='en'?'Loan Amount':'\u8d37\u6b3e\u91d1\u989d')+'</span><span class="review-a">$'+esc(answers.loanAmount)+'</span></div>';if(answers.ltvCalc)h+='<div class="review-row"><span class="review-q">LTV</span><span class="review-a">'+esc(answers.ltvCalc)+'%</span></div>';}else if(st.type!=="attestation"&&answers[st.id]){var v=answers[st.id];if(st.type==="duration"){var p=v.split("|");v=(p[0]||0)+" "+t.years+", "+(p[1]||0)+" "+t.months;}h+='<div class="review-row"><span class="review-q">'+st.q+'</span><span class="review-a">'+esc(v)+'</span></div>';}}h+='</div></div><button class="primary" onclick="phase=\'done\';render()">'+t.submit+'</button><div class="nav-center"><button class="ghost" onclick="phase=\'form\';step='+(total-1)+';render()">'+t.back+'</button></div>';app.innerHTML=h;return;}

  if(phase==='done'){document.body.style.justifyContent='center';var summary=encodeURIComponent(genSummary()),subj=encodeURIComponent("Loan Application - "+(answers.borrowerFirst||"")+" "+(answers.borrowerLast||""));h+='<div style="text-align:center"><div class="done-check">\u2713</div><h2 class="done-title">'+t.submitted+'</h2><p style="color:#6b5c42;font-size:.92rem;line-height:1.5;margin-bottom:6px">'+t.submittedSub+'</p><p style="color:#8a7a60;font-size:.82rem;line-height:1.5;margin-bottom:24px">'+t.submittedNote+'</p><div class="done-btns"><a href="sms:9295235865&body='+summary+'" style="text-decoration:none"><button class="primary" style="display:flex;align-items:center;justify-content:center;gap:8px">'+t.textJack+'</button></a><a href="mailto:jack.chen@gmccloan.com?subject='+subj+'&body='+summary+'" style="text-decoration:none"><button class="primary" style="background:#92400e;display:flex;align-items:center;justify-content:center;gap:8px">'+t.emailJack+'</button></a><button class="secondary-btn" id="copyBtn" onclick="copySum()">'+t.copyText+'</button></div><p style="color:#a0926e;font-size:.75rem;margin-top:16px;line-height:1.4">'+(lang==='en'?'Or call Jack directly: ':'\u6216\u76f4\u63a5\u81f4\u7535 Jack: ')+'<a href="tel:9295235865" style="color:#b45309;font-weight:600;text-decoration:none">929-523-5865</a></p></div>';app.innerHTML=h;return;}

  document.body.style.justifyContent='center';

  // DECLARATIONS - buttons with direct onclick
  if(cur.type==='decProperty'||cur.type==='decFinancial'||cur.type==='coDecProperty'||cur.type==='coDecFinancial'){
    var isCo=(cur.type==='coDecProperty'||cur.type==='coDecFinancial');
    var isFin=(cur.type==='decFinancial'||cur.type==='coDecFinancial');
    var store=isCo?coDec:dec;
    var yesLabel=lang==='en'?'Yes':'\u662f';
    var noLabel=lang==='en'?'No':'\u5426';
    var storeVar=isCo?'coDec':'dec';
    h+='<button class="lang-btn" onclick="toggleLang()">'+t.lang+'</button>';
    h+='<div style="margin-bottom:6px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="sec-label">'+cur.section+'</span><span style="font-size:.72rem;color:#a0926e">'+(step+1)+' '+t.of+' '+total+'</span></div><div class="progress-bar"><div class="progress-fill" style="width:'+((step+1)/total*100)+'%"></div></div></div>';
    h+='<h2 style="font-size:1.15rem;font-weight:700;color:#3a2e1e;margin:16px 0 4px">'+(isCo?t.coDecTitle:t.decTitle)+'</h2>';
    h+='<p style="font-size:.82rem;color:#8a7a60;margin-bottom:16px;line-height:1.4">'+(isCo?t.coDecSub:t.decSub)+'</p>';
    h+='<div class="scroll-area"><div class="dec-section-label">'+(isFin?t.decFinancial:t.decProperty)+'</div>';
    var decList=isFin?DEC_FINANCIAL[lang]:DEC_PROPERTY[lang];
    for(var di=0;di<decList.length;di++){
      var d=decList[di];
      if(d.purchaseOnly&&!isPurch)continue;
      var did=d.id;
      var ysel=(store[did]===yesLabel)?' sel':'';
      var nsel=(store[did]===noLabel)?' sel':'';
      h+='<div class="dec-row"><div class="dec-q">'+d.q+'</div><div class="dec-btns">';
      h+='<button class="dec-btn'+ysel+'" onclick="'+storeVar+'[\''+did+'\']='+'\''+(lang==='en'?'Yes':'\\u662f')+'\''+';render()">'+yesLabel+'</button>';
      h+='<button class="dec-btn'+nsel+'" onclick="'+storeVar+'[\''+did+'\']='+'\''+(lang==='en'?'No':'\\u5426')+'\''+';render()">'+noLabel+'</button>';
      h+='</div></div>';
      if(d.trigger&&store[did]===d.trigger.val){
        for(var si=0;si<d.trigger.show.length;si++){
          var sub=d.trigger.show[si];
          if(sub.type==='choice'){
            h+='<div style="padding:8px 0 8px 16px"><div style="font-size:.82rem;color:#4a3f32;margin-bottom:8px">'+sub.q+'</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
            for(var oi=0;oi<sub.opts.length;oi++){
              var opt=sub.opts[oi];
              var osel=(store[sub.id]===opt)?';border:2px solid #b45309;background:#b45309;color:#fff;font-weight:600':'';
              h+='<button class="pill" style="padding:10px;font-size:.82rem'+osel+'" onclick="'+storeVar+'[\''+sub.id+'\']='+'\'' +esc(opt).replace(/'/g,"\\'")+'\'' +';render()">'+opt+'</button>';
            }
            h+='</div></div>';
          } else if(sub.type==='text'){
            h+='<div style="padding:8px 0 8px 16px"><div style="font-size:.82rem;color:#4a3f32;margin-bottom:6px">'+sub.q+'</div><input class="text-input" style="padding:10px 14px;font-size:.88rem" placeholder="'+(sub.ph||'')+'" value="'+esc(store[sub.id]||'')+'" oninput="'+storeVar+'[\''+sub.id+'\']=this.value"></div>';
          }
        }
      }
    }
    h+='</div><button class="primary" style="margin-top:16px" onclick="goNext()">'+t.next+'</button><div class="nav-center"><button class="ghost" onclick="goBack()">'+t.back+'</button></div>';
    app.innerHTML=h;
    return;
  }

  // ATTESTATION
  if(cur.type==='attestation'){h+='<div style="margin-bottom:6px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="sec-label">'+cur.section+'</span><span style="font-size:.72rem;color:#a0926e">'+(step+1)+' '+t.of+' '+total+'</span></div><div class="progress-bar"><div class="progress-fill" style="width:'+((step+1)/total*100)+'%"></div></div></div><h2 style="font-size:1.15rem;font-weight:700;color:#3a2e1e;margin:16px 0 12px">'+t.attestTitle+'</h2><div class="attest-box"><p class="attest-text">'+t.attestText+'</p></div><div class="check-row" onclick="attested=!attested;render()"><div class="checkbox'+(attested?' checked':'')+'">'+(attested?'\u2713':'')+'</div><span style="font-size:.88rem;color:#4a3f32;line-height:1.4">'+t.attestCheck+'</span></div><button class="primary" '+(attested?'':'disabled')+' onclick="goNext()">'+t.review+' \u2192</button><div class="nav-center"><button class="ghost" onclick="goBack()">'+t.back+'</button></div>';app.innerHTML=h;return;}

  // STANDARD QUESTION
  h+='<button class="lang-btn" onclick="toggleLang()">'+t.lang+'</button><div style="margin-bottom:6px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="sec-label">'+(cur.section||'')+'</span><span style="font-size:.72rem;color:#a0926e">'+(step+1)+' '+t.of+' '+total+'</span></div><div class="progress-bar"><div class="progress-fill" style="width:'+((step+1)/total*100)+'%"></div></div></div><div class="q-area"><h2 class="q-title">'+cur.q+'</h2>';
  if(cur.sub)h+='<p class="q-sub">'+cur.sub+'</p>';else h+='<div style="height:12px"></div>';

  if(cur.type==='choice'){h+='<div class="pills">';for(var opt of cur.opts)h+='<div class="pill'+(answers[cur.id]===opt?' sel':'')+'" onclick="pick(\''+esc(opt)+'\')">' +opt+'</div>';h+='</div>';}

  if(cur.type==='text'){var canGo=cur.req?!!answers[cur.id]:true;h+='<input class="text-input" id="qinput" type="text" placeholder="'+esc(cur.ph||'')+'" value="'+esc(answers[cur.id]||'')+'" oninput="answers[\''+cur.id+'\']=this.value;document.getElementById(\'nextbtn\').disabled=this.value===\'\'&&'+cur.req+'" onkeydown="if(event.key===\'Enter\'&&!document.getElementById(\'nextbtn\').disabled)goNext()"><button class="primary" id="nextbtn" style="margin-top:16px" '+(canGo?'':'disabled')+' onclick="goNext()">'+(step===total-1?t.review:t.next)+'</button>';}

  if(cur.type==='loanltv'){
    calcLTV();
    h+='<input class="text-input" id="qinput" type="text" placeholder="$ Amount" value="'+esc(answers.loanAmount||'')+'" oninput="answers.loanAmount=this.value;calcLTV();document.getElementById(\'ltvField\').value=answers.ltvCalc||\'\';document.getElementById(\'nextbtn\').disabled=!this.value;">';
    h+='<div class="ltv-row"><span class="ltv-label">LTV:</span><input class="ltv-input" id="ltvField" type="text" placeholder="0.000%" value="'+esc(answers.ltvCalc||'')+'" oninput="answers.ltvCalc=this.value;calcLoanFromLTV();document.getElementById(\'qinput\').value=answers.loanAmount||\'\';">';
    h+='<span class="ltv-label">%</span></div>';
    var canGo=!!answers.loanAmount;
    h+='<button class="primary" id="nextbtn" style="margin-top:16px" '+(canGo?'':'disabled')+' onclick="goNext()">'+t.next+'</button>';
  }

  if(cur.type==='dropdowns'){
    var occOpts=lang==='en'?["","Primary Residence","Second Home","Investment Property"]:["","\u81ea\u4f4f\u623f","\u5ea6\u5047\u5c4b","\u6295\u8d44\u623f"];
    var occLabels=lang==='en'?["Select occupancy...","Primary Residence","Second Home","Investment Property"]:["\u8bf7\u9009\u62e9...","\u81ea\u4f4f\u623f","\u5ea6\u5047\u5c4b","\u6295\u8d44\u623f"];
    var ptOpts=lang==='en'?["","Single Family","2-Family","3-Family","4-Family","Condo / Townhouse","PUD","Co-op"]:["","\u4e00\u5bb6\u5ead","\u4e24\u5bb6\u5ead","\u4e09\u5bb6\u5ead","\u56db\u5bb6\u5ead","Condo/Townhouse","PUD","Co-op"];
    var ptLabels=lang==='en'?["Select property type...","Single Family","2-Family","3-Family","4-Family","Condo / Townhouse","PUD","Co-op"]:["\u8bf7\u9009\u62e9...","\u4e00\u5bb6\u5ead","\u4e24\u5bb6\u5ead","\u4e09\u5bb6\u5ead","\u56db\u5bb6\u5ead","Condo/Townhouse","PUD","Co-op"];
    h+='<div style="margin-bottom:14px"><label class="dur-label">'+(lang==='en'?'Occupancy':'\u623f\u5c4b\u7528\u9014')+'</label><select class="dur-select" onchange="answers.occupancy=this.value;checkDropdowns()"><option value="">'+(lang==='en'?'Select...':'\u8bf7\u9009\u62e9...')+'</option>';
    for(var i=1;i<occOpts.length;i++)h+='<option value="'+esc(occOpts[i])+'"'+(answers.occupancy===occOpts[i]?' selected':'')+'>'+occLabels[i]+'</option>';
    h+='</select></div>';
    h+='<div><label class="dur-label">'+(lang==='en'?'Property Type':'\u623f\u4ea7\u7c7b\u578b')+'</label><select class="dur-select" onchange="answers.propertyType=this.value;checkDropdowns()"><option value="">'+(lang==='en'?'Select...':'\u8bf7\u9009\u62e9...')+'</option>';
    for(var i=1;i<ptOpts.length;i++)h+='<option value="'+esc(ptOpts[i])+'"'+(answers.propertyType===ptOpts[i]?' selected':'')+'>'+ptLabels[i]+'</option>';
    h+='</select></div>';
    var ddOk=!!answers.occupancy&&!!answers.propertyType;
    h+='<button class="primary" id="nextbtn" style="margin-top:16px" '+(ddOk?'':'disabled')+' onclick="goNext()">'+t.next+'</button>';
  }
  if(cur.type==='duration'){var parsed=(answers[cur.id]||'').split('|'),yrs=parsed[0]||'',mos=parsed[1]||'';h+='<div class="dur-wrap"><div style="flex:1"><label class="dur-label">'+t.years+'</label><select class="dur-select" onchange="answers[\''+cur.id+'\' ]=this.value+\'|\'+(answers[\''+cur.id+'\']||\'\').split(\'|\')[1]||\'\';render()"><option value="">--</option>';for(var i=0;i<=30;i++)h+='<option value="'+i+'"'+(yrs==String(i)?' selected':'')+'>'+i+'</option>';h+='</select></div><div style="flex:1"><label class="dur-label">'+t.months+'</label><select class="dur-select" onchange="var p=(answers[\''+cur.id+'\']||\'\').split(\'|\');answers[\''+cur.id+'\']=(p[0]||\'\')+\'|\'+this.value;render()"><option value="">--</option>';for(var i=0;i<12;i++)h+='<option value="'+i+'"'+(mos==String(i)?' selected':'')+'>'+i+'</option>';h+='</select></div></div><button class="primary" style="margin-top:16px" onclick="goNext()">'+t.next+'</button>';}

  if(cur.type==='multi'){var cols=cur.fields.length>2?2:cur.fields.length;h+='<div style="display:grid;grid-template-columns:repeat('+cols+',1fr);gap:10px">';for(var f of cur.fields){h+='<div><input class="text-input" id="qinput_'+f.id+'" type="text" placeholder="'+esc(f.ph||'')+'" value="'+esc(answers[f.id]||'')+'" oninput="answers[\''+f.id+'\' ]=this.value;checkMultiNext()" onkeydown="if(event.key===\'Enter\'&&!document.getElementById(\'nextbtn\').disabled)goNext()"></div>';}h+='</div>';var allFilled=cur.fields.every(function(f){return !f.req||answers[f.id];});h+='<button class="primary" id="nextbtn" style="margin-top:16px" '+(allFilled?'':'disabled')+' onclick="goNext()">'+(step===total-1?t.review:t.next)+'</button>';}

  h+='</div><div class="nav-center"><button class="ghost" onclick="goBack()">'+t.back+'</button></div>';app.innerHTML=h;
  if(cur.type==='text'||cur.type==='loanltv'){var inp=document.getElementById('qinput');if(inp)setTimeout(function(){inp.focus();},100);}
  if(cur.type==='multi'){var inp2=document.getElementById('qinput_'+cur.fields[0].id);if(inp2)setTimeout(function(){inp2.focus();},100);}
}

function checkDropdowns(){var btn=document.getElementById('nextbtn');if(btn)btn.disabled=!(answers.occupancy&&answers.propertyType);}
function checkMultiNext(){var steps=getSteps(),cur=steps[step];if(!cur||cur.type!=='multi')return;var allFilled=cur.fields.every(function(f){return !f.req||answers[f.id];});var btn=document.getElementById('nextbtn');if(btn)btn.disabled=!allFilled;}
function copySum(){navigator.clipboard.writeText(genSummary()).then(function(){var btn=document.getElementById('copyBtn');if(btn){btn.textContent=LANG[lang].copied;setTimeout(function(){btn.textContent=LANG[lang].copyText;},2000);}});}
render();

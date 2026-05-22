// EmailJS config
var EMAILJS_PUBLIC_KEY  = 'P0b76QpSqy7Hq_rMR';
var EMAILJS_SERVICE_ID  = 'service_9gmygbi';
var EMAILJS_TEMPLATE_ID = 'template_0q403z9';
var JACK_EMAIL = 'jack.chen@gmccloan.com';
var APP_VERSION = 'v2026.05.22g';

try { console.log('[app] loaded ' + APP_VERSION); } catch(e){}

var lang='en',step=-1,phase='form',answers={},dec={},coDec={},attested=false,emailSent=false;

window.dec = dec;
window.coDec = coDec;
window.answers = answers;

var LANG={en:{title:"Mortgage Application",subtitle:"with Jack Chen \u00b7 NMLS #2425956",company:"General Mortgage Capital Corporation",start:"Let's Get Started",startSub:"This takes about a few minutes \u2014 nice and easy.",next:"Next \u2192",back:"\u2190 Back",submit:"Submit Application",review:"Review Your Answers",reviewSub:"Make sure everything looks right before submitting.",submitted:"Application Submitted!",submittedSub:"Jack has received your application.",submittedNote:"Next steps:\n1. Submit the requested documents\n2. You will receive an eSign request for authorization (eConsent, credit check & appraisal)",of:"of",lang:"\u4e2d\u6587",yes:"Yes",no:"No",years:"Years",months:"Months",decTitle:"Declarations",decSub:"Please answer Yes or No to each. These are standard questions required on all mortgage applications.",decProperty:"Property & Funding",decFinancial:"Financial History (Past 7 Years)",coDecTitle:"Co-Borrower Declarations",coDecSub:"Same questions for your co-borrower. All fields required.",attestTitle:"Borrower Attestation",attestText:"I confirm that the information I've provided is accurate and complete to the best of my knowledge. I understand this information will be used to prepare my official mortgage application (URLA). I authorize the loan officer to use this data to generate my full application and proceed with next steps.",attestCheck:"I have read and agree to the above attestation.",sendingToJack:"Sending your application to Jack...",sentToJack:"\u2713 Sent to Jack successfully",sendFailed:"Email pending \u2014 Jack will be notified shortly."},zh:{title:"\u623f\u5c4b\u8d37\u6b3e\u7533\u8bf7",subtitle:"Jack Chen \u00b7 NMLS #2425956",company:"\u4e07\u901a\u8d37\u6b3e\u94f6\u884c",start:"\u5f00\u59cb\u7533\u8bf7",startSub:"\u53ea\u9700\u51e0\u5206\u949f\uff0c\u8f7b\u677e\u586b\u5199\u3002",next:"\u4e0b\u4e00\u6b65 \u2192",back:"\u2190 \u8fd4\u56de",submit:"\u63d0\u4ea4\u7533\u8bf7",review:"\u786e\u8ba4\u60a8\u7684\u56de\u7b54",reviewSub:"\u63d0\u4ea4\u524d\u8bf7\u786e\u8ba4\u4fe1\u606f\u662f\u5426\u6b63\u786e\u3002",submitted:"\u7533\u8bf7\u5df2\u63d0\u4ea4\uff01",submittedSub:"Jack \u5df2\u6536\u5230\u60a8\u7684\u7533\u8bf7\u3002",submittedNote:"\u4e0b\u4e00\u6b65\uff1a\n1. \u63d0\u4ea4\u6240\u9700\u6587\u4ef6\n2. \u60a8\u5c06\u6536\u5230\u7535\u5b50\u7b7e\u540d\u6388\u6743\u8bf7\u6c42\uff08\u7535\u5b50\u540c\u610f\u3001\u4fe1\u7528\u5ba1\u6838\u4e0e\u623f\u5c4b\u4f30\u4ef7\uff09",of:"/",lang:"English",yes:"\u662f",no:"\u5426",years:"\u5e74",months:"\u6708",decTitle:"\u8d37\u6b3e\u7533\u8bf7\u4eba\u58f0\u660e",decSub:"\u8bf7\u56de\u7b54\u4ee5\u4e0b\u95ee\u9898\u3002\u6240\u6709\u95ee\u9898\u9700\u586b\u5199\u5b8c\u6574\u3002",decProperty:"\u623f\u4ea7\u4e0e\u8d44\u91d1",decFinancial:"\u8d22\u52a1\u5386\u53f2\uff08\u8fc7\u53bb7\u5e74\uff09",coDecTitle:"\u5171\u540c\u501f\u6b3e\u4eba\u58f0\u660e",coDecSub:"\u8bf7\u5171\u540c\u501f\u6b3e\u4eba\u56de\u7b54\u76f8\u540c\u7684\u95ee\u9898\u3002\u6240\u6709\u9879\u76ee\u5fc5\u586b\u3002",attestTitle:"\u501f\u6b3e\u4eba\u58f0\u660e",attestText:"\u672c\u4eba\u7279\u6b64\u58f0\u660e\u5e76\u4fdd\u8bc1\uff0c\u672c\u4eba\u5728\u672c\u8868\u683c\u4e2d\u63d0\u4f9b\u7684\u4fe1\u606f\u5747\u771f\u5b9e\u3001\u51c6\u786e\u3001\u5b8c\u6574\uff0c\u4e14\u7b26\u5408\u672c\u4eba\u6240\u77e5\u7684\u6700\u4f73\u60c5\u51b5\u3002\u672c\u4eba\u7406\u89e3\u5e76\u540c\u610f\uff0c\u8be5\u4fe1\u606f\u5c06\u7528\u4e8e\u51c6\u5907\u672c\u4eba\u6b63\u5f0f\u62b5\u62bc\u8d37\u6b3e\u7533\u8bf7\uff08URLA\uff09\u3002",attestCheck:"\u672c\u4eba\u5df2\u9605\u8bfb\u5e76\u540c\u610f\u4e0a\u8ff0\u58f0\u660e\uff0c\u5e76\u63d0\u4ea4\u672c\u7533\u8bf7\u3002",sendingToJack:"\u6b63\u5728\u53d1\u9001\u7ed9 Jack...",sentToJack:"\u2713 \u5df2\u6210\u529f\u53d1\u9001\u7ed9 Jack",sendFailed:"\u7535\u5b50\u90ae\u4ef6\u6b63\u5728\u5904\u7406 \u2014 Jack \u5c06\u5f88\u5feb\u6536\u5230\u901a\u77e5\u3002"}};

// type:"dropdown" = single-select dropdown; type:"text" = text input; type:"choice" = pill buttons (legacy)
var DEC_PROPERTY={en:[
  {id:"occupyProperty",q:"Will you occupy the property as your primary residence?",trigger:{val:"Yes",show:[
    {id:"priorProperty",q:"Have you had an ownership interest in another property in the last 3 years?",trigger:{val:"Yes",show:[
      {id:"priorPropertyType",q:"What type of property did you own?",type:"dropdown",opts:["Primary Residence","FHA Secondary Residence","Second Home","Investment Property"]},
      {id:"titleHeld",q:"How did you hold title?",type:"dropdown",opts:["By Yourself","Jointly with Spouse","Jointly with Another Person"]}
    ]}}
  ]}},
  {id:"sellerRelationship",q:"If this is a Purchase Transaction: Do you have a family relationship or business affiliation with the seller?"},
  {id:"borrowedFunds",q:"Are you borrowing any money for this transaction (e.g., closing costs or down payment) not disclosed on this application?",trigger:{val:"Yes",show:[{id:"borrowedAmount",q:"What is the amount of this money?",type:"text",ph:"$ Amount"}]}},
  {id:"otherMortgage",q:"Have you or will you be applying for a mortgage on another property (not the property securing this loan) on or before closing that is not disclosed on this application?"},
  {id:"newCredit",q:"Have you or will you be applying for any new credit (e.g., installment loan, credit card, etc.) on or before closing this loan that is not disclosed on this application?"},
  {id:"priorityLien",q:"Will this property be subject to a lien that could take priority over the first mortgage lien, such as a clean energy lien paid through your property taxes (e.g., PACE)?"}
],zh:[
  {id:"occupyProperty",q:"\u60a8\u662f\u5426\u4f1a\u81ea\u4f4f\u8be5\u623f\u4ea7\uff1f",trigger:{val:"\u662f",show:[
    {id:"priorProperty",q:"\u60a8\u8fc7\u53bb\u4e09\u5e74\u662f\u5426\u6301\u6709\u8fc7\u5176\u4ed6\u623f\u4ea7\uff1f",trigger:{val:"\u662f",show:[
      {id:"priorPropertyType",q:"\u60a8\u62e5\u6709\u7684\u623f\u4ea7\u7c7b\u578b\uff1f",type:"dropdown",opts:["\u81ea\u4f4f\u623f","FHA\u7b2c\u4e8c\u5c45\u6240","\u5ea6\u5047\u5c4b","\u6295\u8d44\u623f"]},
      {id:"titleHeld",q:"\u60a8\u5982\u4f55\u6301\u6709\u4ea7\u6743\uff1f",type:"dropdown",opts:["\u5355\u72ec\u6301\u6709","\u4e0e\u914d\u5076\u5171\u540c\u6301\u6709","\u4e0e\u4ed6\u4eba\u5171\u540c\u6301\u6709"]}
    ]}}
  ]}},
  {id:"sellerRelationship",q:"\u5982\u679c\u662f\u8d2d\u623f\u4ea4\u6613\uff1a\u60a8\u662f\u5426\u4e0e\u5356\u65b9\u6709\u5bb6\u5ead\u5173\u7cfb\u6216\u4e1a\u52a1\u5173\u8054\uff1f"},
  {id:"borrowedFunds",q:"\u60a8\u662f\u5426\u4e3a\u6b64\u6b21\u4ea4\u6613\u501f\u6b3e\uff08\u5982\u9996\u4ed8\u6216\u8fc7\u6237\u8d39\uff09\uff0c\u4e14\u672a\u5728\u6b64\u7533\u8bf7\u4e2d\u62ab\u9732\uff1f",trigger:{val:"\u662f",show:[{id:"borrowedAmount",q:"\u8fd9\u7b14\u8d44\u91d1\u7684\u91d1\u989d\u662f\u591a\u5c11\uff1f",type:"text",ph:"$ \u91d1\u989d"}]}},
  {id:"otherMortgage",q:"\u60a8\u662f\u5426\u5df2\u7533\u8bf7\u6216\u5c06\u7533\u8bf7\u53e6\u4e00\u5904\u623f\u4ea7\u7684\u62b5\u62bc\u8d37\u6b3e\uff0c\u4e14\u672a\u5728\u6b64\u7533\u8bf7\u4e2d\u62ab\u9732\uff1f"},
  {id:"newCredit",q:"\u60a8\u662f\u5426\u5df2\u7533\u8bf7\u6216\u5c06\u7533\u8bf7\u65b0\u7684\u4fe1\u7528\u989d\u5ea6\uff0c\u4e14\u672a\u5728\u6b64\u7533\u8bf7\u4e2d\u62ab\u9732\uff1f"},
  {id:"priorityLien",q:"\u8be5\u623f\u4ea7\u662f\u5426\u4f1a\u53d7\u5230\u4f18\u5148\u7559\u7f6e\u6743\u5f71\u54cd\uff08\u5982PACE\u8ba1\u5212\uff09\uff1f"}
]};
var DEC_FINANCIAL={en:[
  {id:"coSigner",q:"Are you a co-signer or guarantor on any debt or loan that is not disclosed on this application?"},
  {id:"judgments",q:"Are there any outstanding judgments against you?"},
  {id:"federalDebt",q:"Are you currently delinquent or in default on a Federal debt?"},
  {id:"lawsuit",q:"Are you a party to a lawsuit in which you potentially have any personal financial liability?"},
  {id:"deedInLieu",q:"Have you conveyed title to any property in lieu of foreclosure in the past 7 years?"},
  {id:"shortSale",q:"Within the past 7 years, have you completed a pre-foreclosure sale or short sale, whereby the property was sold to a third party and the lender agreed to accept less than the outstanding mortgage balance due?"},
  {id:"foreclosure",q:"Have you had property foreclosed upon in the last 7 years?"},
  {id:"bankruptcy",q:"Have you declared bankruptcy within the past 7 years?",trigger:{val:"Yes",show:[{id:"bankruptcyType",q:"Type of bankruptcy:",type:"dropdown",opts:["Chapter 7","Chapter 11","Chapter 12","Chapter 13"]}]}}
],zh:[
  {id:"coSigner",q:"\u60a8\u662f\u5426\u662f\u672a\u62ab\u9732\u503a\u52a1\u7684\u5171\u540c\u7b7e\u7f72\u4eba\u6216\u62c5\u4fdd\u4eba\uff1f"},
  {id:"judgments",q:"\u60a8\u662f\u5426\u6709\u672a\u507f\u8fd8\u7684\u5224\u51b3\uff1f"},
  {id:"federalDebt",q:"\u60a8\u662f\u5426\u62d6\u6b20\u6216\u8fdd\u7ea6\u8054\u90a6\u503a\u52a1\uff1f"},
  {id:"lawsuit",q:"\u60a8\u662f\u5426\u6d89\u53ca\u53ef\u80fd\u627f\u62c5\u8d22\u52a1\u8d23\u4efb\u7684\u8bc9\u8bbc\uff1f"},
  {id:"deedInLieu",q:"\u8fc7\u53bb7\u5e74\u662f\u5426\u4ee5\u4ee3\u66ff\u6b62\u8d4e\u65b9\u5f0f\u8f6c\u8ba9\u8fc7\u4ea7\u6743\uff1f"},
  {id:"shortSale",q:"\u8fc7\u53bb7\u5e74\u662f\u5426\u5b8c\u6210\u8fc7\u77ed\u552e\uff1f"},
  {id:"foreclosure",q:"\u8fc7\u53bb7\u5e74\u662f\u5426\u6709\u623f\u4ea7\u88ab\u6b62\u8d4e\uff1f"},
  {id:"bankruptcy",q:"\u8fc7\u53bb7\u5e74\u662f\u5426\u5ba3\u5e03\u8fc7\u7834\u4ea7\uff1f",trigger:{val:"\u662f",show:[{id:"bankruptcyType",q:"\u7834\u4ea7\u7c7b\u578b\uff1a",type:"dropdown",opts:["\u7b2c7\u7ae0\u7834\u4ea7","\u7b2c11\u7ae0\u7834\u4ea7","\u7b2c12\u7ae0\u7834\u4ea7","\u7b2c13\u7ae0\u7834\u4ea7"]}]}}
]};

var MAP_EN_ZH={"Yes":"\u662f","No":"\u5426","Purchase":"\u8d2d\u623f","Refinance":"\u91cd\u65b0\u8d37\u6b3e","Primary Residence":"\u81ea\u4f4f\u623f","FHA Secondary Residence":"FHA\u7b2c\u4e8c\u5c45\u6240","Second Home":"\u5ea6\u5047\u5c4b","Investment Property":"\u6295\u8d44\u623f","Single Family":"\u4e00\u5bb6\u5ead","2-Family":"\u4e24\u5bb6\u5ead","3-Family":"\u4e09\u5bb6\u5ead","4-Family":"\u56db\u5bb6\u5ead","Condo / Townhouse":"Condo/Townhouse","PUD":"PUD","Co-op":"Co-op","W2 / Salary":"\u5de5\u8d44\u6536\u5165 (W2)","Self-Employed":"\u81ea\u96c7","Other (Skip)":"\u5176\u4ed6(\u8df3\u8fc7)","Yes, 25% or more":"\u662f\uff0c25%\u4ee5\u4e0a","Less than 25%":"\u4f4e\u4e8e25%","By Yourself":"\u5355\u72ec\u6301\u6709","Jointly with Spouse":"\u4e0e\u914d\u5076\u5171\u540c\u6301\u6709","Jointly with Another Person":"\u4e0e\u4ed6\u4eba\u5171\u540c\u6301\u6709","Chapter 7":"\u7b2c7\u7ae0\u7834\u4ea7","Chapter 11":"\u7b2c11\u7ae0\u7834\u4ea7","Chapter 12":"\u7b2c12\u7ae0\u7834\u4ea7","Chapter 13":"\u7b2c13\u7ae0\u7834\u4ea7"};
var MAP_ZH_EN=Object.fromEntries(Object.entries(MAP_EN_ZH).map(function(e){return[e[1],e[0]];}));
function translateObj(obj,map){var o={};for(var k in obj){if(obj.hasOwnProperty(k))o[k]=map[obj[k]]||obj[k];}return o;}
function needsPrevEmployer(durVal){if(!durVal)return false;var p=durVal.split('|');return(parseInt(p[0])||0)<2;}

// Validation helpers
function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v||'').trim());}
function validPhone(v){return (String(v||'').replace(/\D/g,'').length)===10;}
function formatPhone(v){var d=String(v||'').replace(/\D/g,'').slice(0,10);if(d.length<4)return d;if(d.length<7)return d.slice(0,3)+'-'+d.slice(3);return d.slice(0,3)+'-'+d.slice(3,6)+'-'+d.slice(6);}
function validField(f,v){if(!f||!f.format)return !f.req||!!v;if(!v)return !f.req;if(f.format==='email')return validEmail(v);if(f.format==='phone')return validPhone(v);return true;}
window.formatPhone = formatPhone;
window.validEmail = validEmail;
window.validPhone = validPhone;
window.validField = validField;

// Address autocomplete state
var addrSuggestions = [];
var addrLoading = false;
var addrSearchTimer = null;
var addrLastQuery = '';

function searchAddress(query){
  if(!query||query.length<3){addrSuggestions=[];addrLoading=false;renderAddrSuggestions();return;}
  if(query===addrLastQuery)return;
  addrLastQuery=query;
  addrLoading=true;
  renderAddrSuggestions();
  // Nominatim (OpenStreetMap) - free, no key, supports partial search, CORS enabled
  // countrycodes=us limits to US addresses; addressdetails=1 gives us zip etc.
  var url='https://nominatim.openstreetmap.org/search?q='+encodeURIComponent(query)+'&format=json&addressdetails=1&countrycodes=us&limit=5';
  try { console.log('[addr] fetching:', url); } catch(e){}
  fetch(url,{headers:{'Accept':'application/json'}}).then(function(r){
    try { console.log('[addr] response status:', r.status); } catch(e){}
    return r.json();
  }).then(function(data){
    if(query!==addrLastQuery)return; // stale response
    try { console.log('[addr] got', Array.isArray(data)?data.length:0, 'results'); } catch(e){}
    if(!Array.isArray(data)){addrSuggestions=[];addrLoading=false;renderAddrSuggestions();return;}
    addrSuggestions=data.map(function(m){
      // Build a clean address string: "Street Number Street, City, State ZIP"
      var a=m.address||{};
      var street=[a.house_number,a.road].filter(Boolean).join(' ');
      var city=a.city||a.town||a.village||a.hamlet||a.county||'';
      var state=a.state||'';
      // Convert state name to 2-letter code if possible
      var stateAbbr=STATE_ABBR[state]||state;
      var zip=a.postcode||'';
      var parts=[street,city,[stateAbbr,zip].filter(Boolean).join(' ')].filter(Boolean);
      var full=parts.join(', ');
      return full||m.display_name;
    }).filter(function(s){return s&&s.length>0;});
    addrLoading=false;
    renderAddrSuggestions();
  }).catch(function(e){
    try { console.error('[addr] fetch failed:', e); } catch(_){}
    if(query!==addrLastQuery)return;
    addrSuggestions=[];addrLoading=false;
    renderAddrSuggestions();
  });
}

var STATE_ABBR={'Alabama':'AL','Alaska':'AK','Arizona':'AZ','Arkansas':'AR','California':'CA','Colorado':'CO','Connecticut':'CT','Delaware':'DE','Florida':'FL','Georgia':'GA','Hawaii':'HI','Idaho':'ID','Illinois':'IL','Indiana':'IN','Iowa':'IA','Kansas':'KS','Kentucky':'KY','Louisiana':'LA','Maine':'ME','Maryland':'MD','Massachusetts':'MA','Michigan':'MI','Minnesota':'MN','Mississippi':'MS','Missouri':'MO','Montana':'MT','Nebraska':'NE','Nevada':'NV','New Hampshire':'NH','New Jersey':'NJ','New Mexico':'NM','New York':'NY','North Carolina':'NC','North Dakota':'ND','Ohio':'OH','Oklahoma':'OK','Oregon':'OR','Pennsylvania':'PA','Rhode Island':'RI','South Carolina':'SC','South Dakota':'SD','Tennessee':'TN','Texas':'TX','Utah':'UT','Vermont':'VT','Virginia':'VA','Washington':'WA','West Virginia':'WV','Wisconsin':'WI','Wyoming':'WY','District of Columbia':'DC'};

function renderAddrSuggestions(){
  var box=document.getElementById('addrSuggestBox');
  if(!box)return;
  if(addrLoading){box.innerHTML='<div style="padding:10px 14px;color:#8a7a60;font-size:.82rem">'+(lang==='en'?'Searching\u2026':'\u641c\u7d22\u4e2d\u2026')+'</div>';box.style.display='block';return;}
  if(!addrSuggestions.length){box.style.display='none';box.innerHTML='';return;}
  var h='';
  for(var i=0;i<addrSuggestions.length;i++){
    h+='<div onclick="window.pickAddress('+i+')" style="padding:10px 14px;cursor:pointer;border-bottom:1px solid #f0e4d0;font-size:.88rem;color:#3a2e1e;background:#fff" onmouseover="this.style.background=\'#fdf9f0\'" onmouseout="this.style.background=\'#fff\'">'+esc(addrSuggestions[i])+'</div>';
  }
  box.innerHTML=h;
  box.style.display='block';
}

window.pickAddress = function(idx){
  var v = addrSuggestions[idx]; if(!v) return;
  answers.address = v;
  addrSuggestions = []; addrLastQuery = v;
  render();
};

window.onAddrInput = function(inp){
  answers.address = inp.value;
  if(addrSearchTimer) clearTimeout(addrSearchTimer);
  addrSearchTimer = setTimeout(function(){ searchAddress(inp.value); }, 500);
  var btn = document.getElementById('nextbtn');
  if(btn) btn.disabled = !inp.value;
};

function decYN(store,id){var v=store[id];return v==='Yes'||v==='\u662f'?'Y':v==='No'||v==='\u5426'?'N':'';}
// Language-agnostic trigger match: "Yes" trigger matches both English "Yes" and Chinese "是"
function triggerMatch(stored,triggerVal){
  if(!stored||!triggerVal)return false;
  if(stored===triggerVal)return true;
  if((triggerVal==='Yes'||triggerVal==='\u662f')&&(stored==='Yes'||stored==='\u662f'))return true;
  if((triggerVal==='No'||triggerVal==='\u5426')&&(stored==='No'||stored==='\u5426'))return true;
  return false;
}
function xmlEsc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function genMISMO(){var a=answers,d=dec,now=new Date().toISOString().split('T')[0];var loanAmt=String(a.loanAmount||'').replace(/[^0-9.]/g,'')||'0';var purchPrice=String(a.purchasePrice||a.appraisedValue||'').replace(/[^0-9.]/g,'')||'0';var isPurch=(a.transaction==='Purchase'||a.transaction==='\u8d2d\u623f');var propUseMap={'Primary Residence':'PrimaryResidence','Second Home':'SecondHome','Investment Property':'Investor','\u81ea\u4f4f\u623f':'PrimaryResidence','\u5ea6\u5047\u5c4b':'SecondHome','\u6295\u8d44\u623f':'Investor'};var propUse=propUseMap[a.occupancy]||'PrimaryResidence';var ptMap={'Single Family':'SingleFamily','2-Family':'Duplex','3-Family':'Triplex','4-Family':'Quadraplex','Condo / Townhouse':'Condominium','Condo/Townhouse':'Condominium','PUD':'PlannedUnitDevelopment','Co-op':'Cooperative','\u4e00\u5bb6\u5ead':'SingleFamily','\u4e24\u5bb6\u5ead':'Duplex','\u4e09\u5bb6\u5ead':'Triplex','\u56db\u5bb6\u5ead':'Quadraplex'};var propType=ptMap[a.propertyType]||'SingleFamily';var empName=xmlEsc(a.employerName||a.businessName||'');var bkChap=d.bankruptcyType||'';var hasCo=(a.coborrower==='Yes'||a.coborrower==='\u662f');function yn(id){return decYN(d,id);}
var xml='<?xml version="1.0" encoding="UTF-8"?>\n<MESSAGE xmlns="http://www.mismo.org/residential/2009/schemas" MISMOVersionIdentifier="3.4">\n<ABOUT_VERSIONS><ABOUT_VERSION><CreatedDatetime>'+now+'T00:00:00</CreatedDatetime><DataVersionIdentifier>3.4</DataVersionIdentifier></ABOUT_VERSION></ABOUT_VERSIONS>\n<DEAL_SETS><DEAL_SET><DEALS><DEAL><PARTIES>\n<PARTY SequenceNumber="1"><ROLES><ROLE><BORROWER><BORROWER_DETAIL><BorrowerClassificationType>Primary</BorrowerClassificationType></BORROWER_DETAIL>\n<DECLARATION><DECLARATION_DETAIL>\n<BankruptcyIndicator>'+yn('bankruptcy')+'</BankruptcyIndicator>\n';
if(bkChap.indexOf('Chapter 7')>=0||bkChap.indexOf('\u7b2c7')>=0)xml+='<BankruptcyChapter7Indicator>Y</BankruptcyChapter7Indicator>\n';
if(bkChap.indexOf('Chapter 11')>=0||bkChap.indexOf('\u7b2c11')>=0)xml+='<BankruptcyChapter11Indicator>Y</BankruptcyChapter11Indicator>\n';
if(bkChap.indexOf('Chapter 12')>=0||bkChap.indexOf('\u7b2c12')>=0)xml+='<BankruptcyChapter12Indicator>Y</BankruptcyChapter12Indicator>\n';
if(bkChap.indexOf('Chapter 13')>=0||bkChap.indexOf('\u7b2c13')>=0)xml+='<BankruptcyChapter13Indicator>Y</BankruptcyChapter13Indicator>\n';
xml+='<BorrowedDownPaymentIndicator>'+yn('borrowedFunds')+'</BorrowedDownPaymentIndicator>\n<CoSignerIndicator>'+yn('coSigner')+'</CoSignerIndicator>\n<DeedInLieuConveyedIndicator>'+yn('deedInLieu')+'</DeedInLieuConveyedIndicator>\n<FederalDebtDelinquentIndicator>'+yn('federalDebt')+'</FederalDebtDelinquentIndicator>\n<ForeclosureIndicator>'+yn('foreclosure')+'</ForeclosureIndicator>\n<JudgmentIndicator>'+yn('judgments')+'</JudgmentIndicator>\n<LiabilityLawsuitIndicator>'+yn('lawsuit')+'</LiabilityLawsuitIndicator>\n<LienPriorityIndicator>'+yn('priorityLien')+'</LienPriorityIndicator>\n<OccupyPropertyIndicator>'+yn('occupyProperty')+'</OccupyPropertyIndicator>\n<OtherLoanApplicationIndicator>'+yn('otherMortgage')+'</OtherLoanApplicationIndicator>\n<PreForeclosureSaleCompletedIndicator>'+yn('shortSale')+'</PreForeclosureSaleCompletedIndicator>\n';
if(yn('occupyProperty')==='Y'&&d.priorPropertyType)xml+='<PriorPropertyUsageType>'+xmlEsc(d.priorPropertyType)+'</PriorPropertyUsageType>\n';
if(yn('occupyProperty')==='Y'&&d.titleHeld)xml+='<PriorPropertyTitleType>'+xmlEsc(d.titleHeld)+'</PriorPropertyTitleType>\n';
xml+='<PropertyProposedCleanEnergyLienIndicator>'+yn('priorityLien')+'</PropertyProposedCleanEnergyLienIndicator>\n<UndisclosedBorrowedFundsIndicator>'+yn('borrowedFunds')+'</UndisclosedBorrowedFundsIndicator>\n';
if(yn('borrowedFunds')==='Y'&&d.borrowedAmount)xml+='<UndisclosedBorrowedFundsAmount>'+xmlEsc(d.borrowedAmount)+'</UndisclosedBorrowedFundsAmount>\n';
xml+='<UndisclosedCreditApplicationIndicator>'+yn('newCredit')+'</UndisclosedCreditApplicationIndicator>\n<UndisclosedMortgageApplicationIndicator>'+yn('otherMortgage')+'</UndisclosedMortgageApplicationIndicator>\n</DECLARATION_DETAIL></DECLARATION>\n';
if(empName)xml+='<EMPLOYERS><EMPLOYER><EMPLOYER_DETAIL><EmployerName>'+empName+'</EmployerName><EmploymentPositionDescription>'+xmlEsc(a.position||a.ownershipShare||'')+'</EmploymentPositionDescription><EmploymentStatusType>Current</EmploymentStatusType><SpecialBorrowerEmployerRelationshipType>'+(a.incomeType==='Self-Employed'||a.incomeType==='\u81ea\u96c7'?'SelfEmployed':'Employed')+'</SpecialBorrowerEmployerRelationshipType></EMPLOYER_DETAIL></EMPLOYER></EMPLOYERS>\n';
xml+='</BORROWER></ROLE></ROLES><INDIVIDUAL><NAME><FirstName>'+xmlEsc(a.borrowerFirst)+'</FirstName><LastName>'+xmlEsc(a.borrowerLast)+'</LastName></NAME></INDIVIDUAL><CONTACT_POINTS><CONTACT_POINT><CONTACT_POINT_EMAIL><ContactPointEmailValue>'+xmlEsc(a.email)+'</ContactPointEmailValue></CONTACT_POINT_EMAIL></CONTACT_POINT><CONTACT_POINT><CONTACT_POINT_TELEPHONE><ContactPointTelephoneValue>'+xmlEsc(a.phone)+'</ContactPointTelephoneValue></CONTACT_POINT_TELEPHONE></CONTACT_POINT></CONTACT_POINTS></PARTY>\n';
if(hasCo)xml+='<PARTY SequenceNumber="2"><ROLES><ROLE><BORROWER><BORROWER_DETAIL><BorrowerClassificationType>CoBorrower</BorrowerClassificationType></BORROWER_DETAIL></BORROWER></ROLE></ROLES><INDIVIDUAL><NAME><FirstName>'+xmlEsc(a.coFirst)+'</FirstName><LastName>'+xmlEsc(a.coLast)+'</LastName></NAME></INDIVIDUAL><CONTACT_POINTS><CONTACT_POINT><CONTACT_POINT_EMAIL><ContactPointEmailValue>'+xmlEsc(a.coEmail)+'</ContactPointEmailValue></CONTACT_POINT_EMAIL></CONTACT_POINT></CONTACT_POINTS></PARTY>\n';
xml+='<PARTY SequenceNumber="3"><ROLES><ROLE><LOAN_ORIGINATOR><LOAN_ORIGINATOR_DETAIL><LoanOriginatorNMLSIdentifier>2425956</LoanOriginatorNMLSIdentifier><LoanOriginatorName>Jack Chen</LoanOriginatorName></LOAN_ORIGINATOR_DETAIL></LOAN_ORIGINATOR></ROLE></ROLES></PARTY>\n</PARTIES>\n<LOANS><LOAN><LOAN_DETAIL><LoanPurposeType>'+(isPurch?'Purchase':'Refinance')+'</LoanPurposeType><NoteAmount>'+loanAmt+'</NoteAmount><LoanMaturityPeriodCount>360</LoanMaturityPeriodCount><LoanMaturityPeriodType>Month</LoanMaturityPeriodType></LOAN_DETAIL><COLLATERALS><COLLATERAL><SUBJECT_PROPERTY><PROPERTY_DETAIL><PropertyEstimatedValueAmount>'+purchPrice+'</PropertyEstimatedValueAmount><PropertyUsageType>'+propUse+'</PropertyUsageType><GSEPropertyType>'+propType+'</GSEPropertyType></PROPERTY_DETAIL><ADDRESS><AddressLineText>'+xmlEsc(a.address||'')+'</AddressLineText></ADDRESS></SUBJECT_PROPERTY></COLLATERAL></COLLATERALS></LOAN></LOANS>\n</DEAL></DEALS></DEAL_SET></DEAL_SETS>\n</MESSAGE>\n';
return xml;}

function sendEmail(){
  if(emailSent)return;
  if(EMAILJS_PUBLIC_KEY==='YOUR_PUBLIC_KEY'){
    var el=document.getElementById('email-status');if(el){el.textContent='Email service not configured \u2014 please contact Jack directly at jack.chen@gmccloan.com';el.className='status-msg err';}
    return;
  }
  if(typeof emailjs==='undefined'){
    console.warn('EmailJS SDK not loaded');
    var el=document.getElementById('email-status');if(el){el.textContent=LANG[lang].sendFailed;el.className='status-msg err';}
    return;
  }
  try{emailjs.init(EMAILJS_PUBLIC_KEY);}catch(e){console.warn('emailjs.init failed',e);}
  emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,{
    to_email:JACK_EMAIL,
    subject:'New Loan Application - '+(answers.borrowerFirst||'')+' '+(answers.borrowerLast||''),
    borrower_name:(answers.borrowerFirst||'')+' '+(answers.borrowerLast||''),
    borrower_email:answers.email||'',
    borrower_phone:answers.phone||'',
    transaction:answers.transaction||'',
    loan_amount:answers.loanAmount||'',
    property_address:answers.address||'',
    summary:genSummary(),
    mismo_xml:genMISMO(),
    submitted_at:new Date().toLocaleString()
  }).then(function(){
    emailSent=true;
    var el=document.getElementById('email-status');if(el){el.textContent=LANG[lang].sentToJack;el.className='status-msg ok';}
  }).catch(function(err){
    console.error('EmailJS send failed',err);
    var el=document.getElementById('email-status');if(el){el.textContent=LANG[lang].sendFailed;el.className='status-msg err';}
  });
}

function getSteps(){var t=LANG[lang],isPurch=answers.transaction===(lang==='en'?'Purchase':'\u8d2d\u623f'),hasCo=answers.coborrower===t.yes;var isW2=answers.incomeType===(lang==='en'?'W2 / Salary':'\u5de5\u8d44\u6536\u5165 (W2)');var isSE=answers.incomeType===(lang==='en'?'Self-Employed':'\u81ea\u96c7');var skip=answers.incomeType===(lang==='en'?'Other (Skip)':'\u5176\u4ed6(\u8df3\u8fc7)');var s=[];if(lang==='en'){s.push({id:"borrowerInfo",section:"About You",q:"What's your name and contact info?",type:"multi",fields:[{id:"borrowerFirst",ph:"First name",req:true},{id:"borrowerLast",ph:"Last name",req:true},{id:"email",ph:"Email address",req:true,format:"email"},{id:"phone",ph:"Phone (xxx-xxx-xxxx)",req:true,format:"phone"}],req:true});s.push({id:"coborrower",q:"Will you be applying with a co-borrower?",type:"choice",opts:["Yes","No"],req:true});if(hasCo)s.push({id:"coInfo",q:"Co-borrower's name and contact info?",type:"multi",fields:[{id:"coFirst",ph:"First name",req:true},{id:"coLast",ph:"Last name",req:true},{id:"coEmail",ph:"Email address",req:true,format:"email"},{id:"coPhone",ph:"Phone (xxx-xxx-xxxx)",req:true,format:"phone"}],req:true});s.push({id:"transaction",section:"Property",q:"Are you purchasing or refinancing?",type:"choice",opts:["Purchase","Refinance"],req:true});s.push({id:"propDetails",q:"Property details",type:"dropdowns",req:true});s.push({id:"address",q:"Property address?",sub:"Start typing (3+ characters) \u2014 suggestions will appear.",type:"address",ph:"Street, City, State, ZIP",req:true});if(isPurch)s.push({id:"purchasePrice",q:"What's the purchase price?",type:"text",ph:"$ Amount",req:true});else if(answers.transaction)s.push({id:"appraisedValue",q:"Estimated property value?",type:"text",ph:"$ Amount",req:true});s.push({id:"loanAmount",q:"Desired loan amount?",type:"loanltv",req:true});s.push({id:"incomeType",section:"Income",q:"What's your income type?",type:"choice",opts:["W2 / Salary","Self-Employed","Other (Skip)"],req:true});if(isW2){s.push({id:"employerName",q:"Employer name?",type:"text",ph:"Company name",req:true});s.push({id:"position",q:"Your position / title?",type:"text",ph:"e.g. Marketing Manager",req:true});s.push({id:"duration",q:"How long have you worked there?",type:"duration",req:true});if(needsPrevEmployer(answers.duration)){s.push({id:"prevEmployerName",q:"Previous employer name?",type:"text",ph:"Previous company",req:true});s.push({id:"prevPosition",q:"Previous position / title?",type:"text",ph:"e.g. Sales Associate",req:true});s.push({id:"prevDuration",q:"How long at previous employer?",type:"duration",req:true});}}if(isSE){s.push({id:"businessName",q:"Business name?",type:"text",ph:"Business name",req:true});s.push({id:"ownershipShare",q:"Do you own 25% or more?",type:"choice",opts:["Yes, 25% or more","Less than 25%"],req:true});s.push({id:"duration",q:"How long have you been self-employed?",type:"duration",req:true});if(needsPrevEmployer(answers.duration)){s.push({id:"prevEmployerName",q:"Previous employer/business name?",type:"text",ph:"Previous company",req:true});s.push({id:"prevPosition",q:"Previous position / title?",type:"text",ph:"Position",req:true});s.push({id:"prevDuration",q:"How long at previous employer?",type:"duration",req:true});}}if(hasCo&&!skip){s.push({id:"coIncomeType",section:"Co-Borrower Income",q:"Co-borrower's income type?",type:"choice",opts:["W2 / Salary","Self-Employed","Other (Skip)"],req:true});var coW2=answers.coIncomeType==="W2 / Salary",coSE=answers.coIncomeType==="Self-Employed";if(coW2){s.push({id:"coEmployerName",q:"Co-borrower's employer?",type:"text",ph:"Company name",req:true});s.push({id:"coPosition",q:"Co-borrower's position?",type:"text",ph:"Position",req:true});s.push({id:"coDuration",q:"How long?",type:"duration",req:true});if(needsPrevEmployer(answers.coDuration)){s.push({id:"coPrevEmployer",q:"Co-borrower's previous employer?",type:"text",ph:"Previous company",req:true});s.push({id:"coPrevPosition",q:"Previous position?",type:"text",ph:"Position",req:true});s.push({id:"coPrevDuration",q:"How long?",type:"duration",req:true});}}if(coSE){s.push({id:"coBusinessName",q:"Business name?",type:"text",ph:"Business name",req:true});s.push({id:"coOwnership",q:"Own 25% or more?",type:"choice",opts:["Yes, 25% or more","Less than 25%"],req:true});s.push({id:"coDuration",q:"How long?",type:"duration",req:true});}}s.push({id:"decProperty",section:"Declarations",q:"",type:"decProperty",req:true});s.push({id:"decFinancial",section:"Declarations",q:"",type:"decFinancial",req:true});if(hasCo){s.push({id:"coDecProperty",section:"Co-Borrower Declarations",q:"",type:"coDecProperty",req:true});s.push({id:"coDecFinancial",section:"Co-Borrower Declarations",q:"",type:"coDecFinancial",req:true});}s.push({id:"attestation",section:"Submit",q:"",type:"attestation",req:true});}else{s.push({id:"borrowerInfo",section:"\u4e2a\u4eba\u4fe1\u606f",q:"\u60a8\u7684\u59d3\u540d\u548c\u8054\u7cfb\u65b9\u5f0f\uff1f",type:"multi",fields:[{id:"borrowerFirst",ph:"\u540d",req:true},{id:"borrowerLast",ph:"\u59d3",req:true},{id:"email",ph:"\u7535\u5b50\u90ae\u7bb1",req:true,format:"email"},{id:"phone",ph:"\u7535\u8bdd (xxx-xxx-xxxx)",req:true,format:"phone"}],req:true});s.push({id:"coborrower",q:"\u662f\u5426\u6709\u5171\u540c\u501f\u6b3e\u4eba\uff1f",type:"choice",opts:["\u662f","\u5426"],req:true});if(hasCo)s.push({id:"coInfo",q:"\u5171\u540c\u501f\u6b3e\u4eba\u7684\u59d3\u540d\u548c\u8054\u7cfb\u65b9\u5f0f\uff1f",type:"multi",fields:[{id:"coFirst",ph:"\u540d",req:true},{id:"coLast",ph:"\u59d3",req:true},{id:"coEmail",ph:"\u7535\u5b50\u90ae\u7bb1",req:true,format:"email"},{id:"coPhone",ph:"\u7535\u8bdd (xxx-xxx-xxxx)",req:true,format:"phone"}],req:true});s.push({id:"transaction",section:"\u623f\u4ea7\u4fe1\u606f",q:"\u60a8\u662f\u8d2d\u623f\u8fd8\u662f\u91cd\u65b0\u8d37\u6b3e\uff1f",type:"choice",opts:["\u8d2d\u623f","\u91cd\u65b0\u8d37\u6b3e"],req:true});s.push({id:"propDetails",q:"\u623f\u4ea7\u8be6\u60c5",type:"dropdowns",req:true});s.push({id:"address",q:"\u623f\u4ea7\u5730\u5740\uff1f",sub:"\u8f93\u51653\u4e2a\u4ee5\u4e0a\u5b57\u7b26\uff0c\u5c06\u51fa\u73b0\u5730\u5740\u5efa\u8bae\u3002",type:"address",ph:"\u8857\u9053, \u57ce\u5e02, \u5dde, \u90ae\u7f16",req:true});if(isPurch)s.push({id:"purchasePrice",q:"\u8d2d\u4e70\u4ef7\u683c\uff1f",type:"text",ph:"$ \u91d1\u989d",req:true});else if(answers.transaction)s.push({id:"appraisedValue",q:"\u623f\u4ea7\u9884\u4f30\u4ef7\u503c\uff1f",type:"text",ph:"$ \u91d1\u989d",req:true});s.push({id:"loanAmount",q:"\u671f\u671b\u8d37\u6b3e\u91d1\u989d\uff1f",type:"loanltv",req:true});s.push({id:"incomeType",section:"\u6536\u5165\u4fe1\u606f",q:"\u60a8\u7684\u6536\u5165\u7c7b\u578b\uff1f",type:"choice",opts:["\u5de5\u8d44\u6536\u5165 (W2)","\u81ea\u96c7","\u5176\u4ed6(\u8df3\u8fc7)"],req:true});if(isW2){s.push({id:"employerName",q:"\u96c7\u4e3b\u540d\u79f0\uff1f",type:"text",ph:"\u516c\u53f8\u540d\u79f0",req:true});s.push({id:"position",q:"\u60a8\u7684\u804c\u4f4d\uff1f",type:"text",ph:"\u4f8b\u5982\uff1a\u5e02\u573a\u7ecf\u7406",req:true});s.push({id:"duration",q:"\u5728\u8be5\u516c\u53f8\u5de5\u4f5c\u591a\u957f\u65f6\u95f4\uff1f",type:"duration",req:true});if(needsPrevEmployer(answers.duration)){s.push({id:"prevEmployerName",q:"\u524d\u96c7\u4e3b\u540d\u79f0\uff1f",type:"text",ph:"\u524d\u516c\u53f8\u540d\u79f0",req:true});s.push({id:"prevPosition",q:"\u524d\u804c\u4f4d\uff1f",type:"text",ph:"\u804c\u4f4d",req:true});s.push({id:"prevDuration",q:"\u5728\u524d\u96c7\u4e3b\u5de5\u4f5c\u591a\u957f\u65f6\u95f4\uff1f",type:"duration",req:true});}}if(isSE){s.push({id:"businessName",q:"\u4f01\u4e1a\u540d\u79f0\uff1f",type:"text",ph:"\u4f01\u4e1a\u540d\u79f0",req:true});s.push({id:"ownershipShare",q:"\u662f\u5426\u62e5\u670925%\u4ee5\u4e0a\u80a1\u4efd\uff1f",type:"choice",opts:["\u662f\uff0c25%\u4ee5\u4e0a","\u4f4e\u4e8e25%"],req:true});s.push({id:"duration",q:"\u81ea\u96c7\u591a\u957f\u65f6\u95f4\uff1f",type:"duration",req:true});if(needsPrevEmployer(answers.duration)){s.push({id:"prevEmployerName",q:"\u524d\u96c7\u4e3b/\u4f01\u4e1a\u540d\u79f0\uff1f",type:"text",ph:"\u524d\u516c\u53f8\u540d\u79f0",req:true});s.push({id:"prevPosition",q:"\u524d\u804c\u4f4d\uff1f",type:"text",ph:"\u804c\u4f4d",req:true});s.push({id:"prevDuration",q:"\u5728\u524d\u96c7\u4e3b\u5de5\u4f5c\u591a\u957f\u65f6\u95f4\uff1f",type:"duration",req:true});}}if(hasCo&&!skip){s.push({id:"coIncomeType",section:"\u5171\u540c\u501f\u6b3e\u4eba\u6536\u5165",q:"\u5171\u540c\u501f\u6b3e\u4eba\u7684\u6536\u5165\u7c7b\u578b\uff1f",type:"choice",opts:["\u5de5\u8d44\u6536\u5165 (W2)","\u81ea\u96c7","\u5176\u4ed6(\u8df3\u8fc7)"],req:true});var coW2=answers.coIncomeType==="\u5de5\u8d44\u6536\u5165 (W2)",coSE=answers.coIncomeType==="\u81ea\u96c7";if(coW2){s.push({id:"coEmployerName",q:"\u5171\u540c\u501f\u6b3e\u4eba\u7684\u96c7\u4e3b\uff1f",type:"text",ph:"\u516c\u53f8\u540d\u79f0",req:true});s.push({id:"coPosition",q:"\u5171\u540c\u501f\u6b3e\u4eba\u7684\u804c\u4f4d\uff1f",type:"text",ph:"\u804c\u4f4d",req:true});s.push({id:"coDuration",q:"\u5de5\u4f5c\u591a\u957f\u65f6\u95f4\uff1f",type:"duration",req:true});if(needsPrevEmployer(answers.coDuration)){s.push({id:"coPrevEmployer",q:"\u5171\u540c\u501f\u6b3e\u4eba\u7684\u524d\u96c7\u4e3b\uff1f",type:"text",ph:"\u524d\u516c\u53f8\u540d\u79f0",req:true});s.push({id:"coPrevPosition",q:"\u524d\u804c\u4f4d\uff1f",type:"text",ph:"\u804c\u4f4d",req:true});s.push({id:"coPrevDuration",q:"\u5de5\u4f5c\u591a\u957f\u65f6\u95f4\uff1f",type:"duration",req:true});}}if(coSE){s.push({id:"coBusinessName",q:"\u4f01\u4e1a\u540d\u79f0\uff1f",type:"text",ph:"\u4f01\u4e1a\u540d\u79f0",req:true});s.push({id:"coOwnership",q:"\u662f\u5426\u62e5\u670925%\u4ee5\u4e0a\u80a1\u4efd\uff1f",type:"choice",opts:["\u662f\uff0c25%\u4ee5\u4e0a","\u4f4e\u4e8e25%"],req:true});s.push({id:"coDuration",q:"\u81ea\u96c7\u591a\u957f\u65f6\u95f4\uff1f",type:"duration",req:true});}}s.push({id:"decProperty",section:"\u58f0\u660e",q:"",type:"decProperty",req:true});s.push({id:"decFinancial",section:"\u58f0\u660e",q:"",type:"decFinancial",req:true});if(hasCo){s.push({id:"coDecProperty",section:"\u5171\u540c\u501f\u6b3e\u4eba\u58f0\u660e",q:"",type:"coDecProperty",req:true});s.push({id:"coDecFinancial",section:"\u5171\u540c\u501f\u6b3e\u4eba\u58f0\u660e",q:"",type:"coDecFinancial",req:true});}s.push({id:"attestation",section:"\u63d0\u4ea4",q:"",type:"attestation",req:true});}return s;}

function allDecAnswered(store,isFin,isPurch){
  var list=isFin?DEC_FINANCIAL[lang]:DEC_PROPERTY[lang];
  function checkSubs(subList){
    for(var i=0;i<subList.length;i++){
      var sub=subList[i];
      if(!store[sub.id])return false;
      if(sub.trigger&&triggerMatch(store[sub.id],sub.trigger.val)){
        if(!checkSubs(sub.trigger.show))return false;
      }
    }
    return true;
  }
  for(var i=0;i<list.length;i++){
    var d=list[i];
    if(d.purchaseOnly&&!isPurch)continue;
    if(!store[d.id])return false;
    if(d.trigger&&triggerMatch(store[d.id],d.trigger.val)){
      if(!checkSubs(d.trigger.show))return false;
    }
  }
  return true;
}

function genSummary(){var steps=getSteps(),t=LANG[lang],isPurch=answers.transaction===(lang==='en'?'Purchase':'\u8d2d\u623f');var s="=== LOAN APPLICATION SUMMARY ===\n",sec="";
  function dumpDecs(store,list,header){
    var out="\n"+header+"\n";
    function dumpSubs(subList,store,indent){
      var r="";
      for(var i=0;i<subList.length;i++){
        var sub=subList[i];
        if(store[sub.id])r+=indent+sub.q+" "+store[sub.id]+"\n";
        if(sub.trigger&&triggerMatch(store[sub.id],sub.trigger.val)){
          r+=dumpSubs(sub.trigger.show,store,indent+"  ");
        }
      }
      return r;
    }
    for(var i=0;i<list.length;i++){
      var d=list[i];if(d.purchaseOnly&&!isPurch)continue;
      out+=d.q+" "+(store[d.id]||"N/A")+"\n";
      if(d.trigger&&triggerMatch(store[d.id],d.trigger.val)){out+=dumpSubs(d.trigger.show,store,"  ");}
    }
    return out;
  }
  for(var idx=0;idx<steps.length;idx++){
    var st=steps[idx];
    if(st.section&&st.section!==sec){sec=st.section;s+="\n--- "+sec+" ---\n";}
    if(st.type==="decProperty")s+=dumpDecs(dec,DEC_PROPERTY[lang],"[Borrower - Property & Funding]");
    else if(st.type==="decFinancial")s+=dumpDecs(dec,DEC_FINANCIAL[lang],"[Borrower - Financial History]");
    else if(st.type==="coDecProperty")s+=dumpDecs(coDec,DEC_PROPERTY[lang],"[Co-Borrower - Property & Funding]");
    else if(st.type==="coDecFinancial")s+=dumpDecs(coDec,DEC_FINANCIAL[lang],"[Co-Borrower - Financial History]");
    else if(st.type==="multi"){var vals=st.fields.map(function(f){return answers[f.id]||'';}).filter(Boolean).join(' ');if(vals)s+=st.q+" "+vals+"\n";}
    else if(st.type==="loanltv"){if(answers.loanAmount)s+="Loan Amount: "+answers.loanAmount+"\n";if(answers.ltvCalc)s+="LTV: "+answers.ltvCalc+"%\n";}
    else if(st.type!=="attestation"&&answers[st.id]){if(st.type==="duration"){var p=answers[st.id].split("|");s+=st.q+" "+(p[0]||0)+" yrs, "+(p[1]||0)+" mos\n";}else s+=st.q+" "+answers[st.id]+"\n";}
  }
  return s;
}

function goNext(){var steps=getSteps();if(step<steps.length-1)step++;else phase="review";render();}
function goBack(){if(step>0)step--;else step=-1;render();}
function pick(val){answers[getSteps()[step].id]=val;setTimeout(goNext,200);}
function toggleLang(){var map=lang==='en'?MAP_EN_ZH:MAP_ZH_EN;answers=translateObj(answers,map);dec=translateObj(dec,map);coDec=translateObj(coDec,map);window.answers=answers;window.dec=dec;window.coDec=coDec;lang=lang==='en'?'zh':'en';render();}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function calcLTV(){var loan=parseFloat(String(answers.loanAmount||'').replace(/[^0-9.]/g,''));var val=parseFloat(String(answers.purchasePrice||answers.appraisedValue||'').replace(/[^0-9.]/g,''));if(loan&&val&&val>0){answers.ltvCalc=(loan/val*100).toFixed(3);}else{answers.ltvCalc='';}}
function calcLoanFromLTV(){var ltv=parseFloat(String(answers.ltvCalc||'').replace(/[^0-9.]/g,''));var val=parseFloat(String(answers.purchasePrice||answers.appraisedValue||'').replace(/[^0-9.]/g,''));if(ltv&&val&&val>0){answers.loanAmount=Math.round(val*ltv/100).toString();}}

window.handleDec = function(btn){
  var sv = btn.getAttribute('data-sv');
  var id = btn.getAttribute('data-did');
  var val = btn.getAttribute('data-val');
  try { console.log('[dec] click', sv, id, '=', val); } catch(e){}
  if (!sv || !id || val === null) return;
  if (!window[sv]) window[sv] = {};
  window[sv][id] = val;
  if (sv === 'dec') dec = window.dec;
  if (sv === 'coDec') coDec = window.coDec;
  render();
};
window.handleDecDropdown = function(sel){
  var sv = sel.getAttribute('data-sv');
  var id = sel.getAttribute('data-did');
  if (!sv || !id) return;
  if (!window[sv]) window[sv] = {};
  window[sv][id] = sel.value;
  if (sv === 'dec') dec = window.dec;
  if (sv === 'coDec') coDec = window.coDec;
  render();
};
window.handleDecText = function(inp){
  var sv = inp.getAttribute('data-sv');
  var id = inp.getAttribute('data-did');
  if (!sv || !id) return;
  if (!window[sv]) window[sv] = {};
  window[sv][id] = inp.value;
  if (sv === 'dec') dec = window.dec;
  if (sv === 'coDec') coDec = window.coDec;
  updateDecNextButton();
};

function updateDecNextButton(){
  var btn=document.getElementById('decNextBtn');if(!btn)return;
  var steps=getSteps(),cur=steps[step];if(!cur)return;
  var isCo=(cur.type==='coDecProperty'||cur.type==='coDecFinancial');
  var isFin=(cur.type==='decFinancial'||cur.type==='coDecFinancial');
  var store=isCo?coDec:dec;
  var isPurch=answers.transaction===(lang==='en'?'Purchase':'\u8d2d\u623f');
  btn.disabled=!allDecAnswered(store,isFin,isPurch);
}

window.goNext = goNext;
window.goBack = goBack;
window.pick = pick;
window.toggleLang = toggleLang;
window.calcLTV = calcLTV;
window.calcLoanFromLTV = calcLoanFromLTV;
window.updateDecNextButton = updateDecNextButton;

function render(){
  var app=document.getElementById('app'),t=LANG[lang],steps=getSteps(),total=steps.length,cur=steps[step],isPurch=answers.transaction===(lang==='en'?'Purchase':'\u8d2d\u623f');
  var h='';
  if(step===-1&&phase==='form'){h+='<button class="lang-btn" onclick="toggleLang()">'+t.lang+'</button><div style="text-align:center;padding-top:8px;margin-bottom:28px"><div class="jc">JC</div><h1>'+t.title+'</h1><p class="sub">'+t.subtitle+'</p><p class="co">'+t.company+'</p></div><div class="info-box">'+t.startSub+'</div><button class="primary" onclick="step=0;render()">'+t.start+'</button><div style="text-align:center;margin-top:20px;font-size:.65rem;color:#c4b59a;font-family:monospace">'+APP_VERSION+'</div>';app.innerHTML=h;document.body.style.justifyContent='center';return;}
  if(phase==='review'){
    document.body.style.justifyContent='flex-start';
    h+='<h2 style="font-size:1.3rem;font-weight:700;color:#3a2e1e;text-align:center;margin:0 0 4px">'+t.review+'</h2><p style="color:#8a7a60;font-size:.82rem;text-align:center;margin-bottom:20px">'+t.reviewSub+'</p><div class="review-scroll">';
    var sec="";
    function reviewDecs(store,list,header){
      var out='<div class="review-section"><div class="review-label">'+header+'</div>';
      function dumpSubs(subList){
        var r='';
        for(var i=0;i<subList.length;i++){
          var sub=subList[i];
          if(store[sub.id])r+='<div class="review-row"><span class="review-q" style="padding-left:12px">'+sub.q+'</span><span class="review-a">'+esc(store[sub.id])+'</span></div>';
          if(sub.trigger&&triggerMatch(store[sub.id],sub.trigger.val))r+=dumpSubs(sub.trigger.show);
        }
        return r;
      }
      for(var i=0;i<list.length;i++){
        var d=list[i];if(d.purchaseOnly&&!isPurch)continue;
        if(store[d.id])out+='<div class="review-row"><span class="review-q">'+d.q+'</span><span class="review-a">'+esc(store[d.id])+'</span></div>';
        if(d.trigger&&triggerMatch(store[d.id],d.trigger.val))out+=dumpSubs(d.trigger.show);
      }
      return out+'</div>';
    }
    for(var idx=0;idx<steps.length;idx++){
      var st=steps[idx];
      if(st.section&&st.section!==sec){sec=st.section;h+='<div class="review-section"><div class="review-label">'+sec+'</div>';}
      if(st.type==="decProperty")h+=reviewDecs(dec,DEC_PROPERTY[lang],lang==='en'?'Property & Funding':'\u623f\u4ea7\u4e0e\u8d44\u91d1');
      else if(st.type==="decFinancial")h+=reviewDecs(dec,DEC_FINANCIAL[lang],lang==='en'?'Financial History':'\u8d22\u52a1\u5386\u53f2');
      else if(st.type==="coDecProperty")h+=reviewDecs(coDec,DEC_PROPERTY[lang],lang==='en'?'Co-Borrower Property':'\u5171\u540c\u501f\u6b3e\u4eba - \u623f\u4ea7');
      else if(st.type==="coDecFinancial")h+=reviewDecs(coDec,DEC_FINANCIAL[lang],lang==='en'?'Co-Borrower Financial':'\u5171\u540c\u501f\u6b3e\u4eba - \u8d22\u52a1');
      else if(st.type==="multi"){var vals=st.fields.map(function(f){return answers[f.id]||'';}).filter(Boolean).join(' ');if(vals)h+='<div class="review-row"><span class="review-q">'+st.q+'</span><span class="review-a">'+esc(vals)+'</span></div>';}
      else if(st.type==="loanltv"){if(answers.loanAmount)h+='<div class="review-row"><span class="review-q">'+(lang==='en'?'Loan Amount':'\u8d37\u6b3e\u91d1\u989d')+'</span><span class="review-a">$'+esc(answers.loanAmount)+'</span></div>';if(answers.ltvCalc)h+='<div class="review-row"><span class="review-q">LTV</span><span class="review-a">'+esc(answers.ltvCalc)+'%</span></div>';}
      else if(st.type!=="attestation"&&answers[st.id]){var v=answers[st.id];if(st.type==="duration"){var p=v.split("|");v=(p[0]||0)+" "+t.years+", "+(p[1]||0)+" "+t.months;}h+='<div class="review-row"><span class="review-q">'+st.q+'</span><span class="review-a">'+esc(v)+'</span></div>';}
    }
    h+='</div></div><button class="primary" onclick="phase=\'done\';render()">'+t.submit+'</button><div class="nav-center"><button class="ghost" onclick="phase=\'form\';step='+(total-1)+';render()">'+t.back+'</button></div>';app.innerHTML=h;return;
  }
  if(phase==='done'){
    document.body.style.justifyContent='center';
    setTimeout(sendEmail,500);
    h='<div style="text-align:center"><div class="done-check">\u2713</div><h2 class="done-title">'+t.submitted+'</h2><p style="color:#6b5c42;font-size:.95rem;line-height:1.55;margin-bottom:10px">'+t.submittedSub+'</p><p style="color:#6b5c42;font-size:.88rem;line-height:1.6;margin-bottom:20px;white-space:pre-line;text-align:left;padding:14px 18px;background:#fdf9f0;border-radius:10px;border:1px solid #f0e4d0">'+t.submittedNote+'</p><div id="email-status" class="status-msg">'+(emailSent?t.sentToJack:t.sendingToJack)+'</div><p style="color:#a0926e;font-size:.78rem;margin-top:24px;line-height:1.5">'+(lang==='en'?'Questions? Call Jack at ':'\u95ee\u9898\uff1f\u81f4\u7535 Jack: ')+'<a href="tel:9295235865" style="color:#b45309;font-weight:600;text-decoration:none">929-523-5865</a></p></div>';
    app.innerHTML=h;return;
  }
  document.body.style.justifyContent='center';
  if(cur.type==='decProperty'||cur.type==='decFinancial'||cur.type==='coDecProperty'||cur.type==='coDecFinancial'){
    var isCo=(cur.type==='coDecProperty'||cur.type==='coDecFinancial');
    var isFin=(cur.type==='decFinancial'||cur.type==='coDecFinancial');
    var store=isCo?coDec:dec;
    var sv=isCo?'coDec':'dec';
    var yL=lang==='en'?'Yes':'\u662f';
    var nL=lang==='en'?'No':'\u5426';
    var decList=isFin?DEC_FINANCIAL[lang]:DEC_PROPERTY[lang];
    var selectPrompt=lang==='en'?'-- Select --':'-- \u8bf7\u9009\u62e9 --';
    function buildSubs(subList){
      var r='';
      for(var si=0;si<subList.length;si++){
        var sub=subList[si];var sid=sub.id;
        var indent='padding:10px 0 10px 20px;border-left:3px solid #f0e4d0;margin-left:4px;margin-top:6px';
        if(sub.type==='dropdown'){
          r+='<div style="'+indent+'"><div class="sub-label">'+sub.q+'</div><select class="dur-select" data-sv="'+sv+'" data-did="'+sid+'" onchange="window.handleDecDropdown(this)"><option value="">'+selectPrompt+'</option>';
          for(var oi=0;oi<sub.opts.length;oi++){var opt=sub.opts[oi];r+='<option value="'+esc(opt)+'"'+(store[sid]===opt?' selected':'')+'>'+esc(opt)+'</option>';}
          r+='</select></div>';
        }else if(sub.type==='choice'){
          r+='<div style="'+indent+'"><div class="sub-label">'+sub.q+'</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
          for(var oi=0;oi<sub.opts.length;oi++){var opt=sub.opts[oi];var sel=(store[sid]===opt)?';border:2px solid #b45309;background:#b45309;color:#fff;font-weight:600':'';r+='<button type="button" class="pill" style="padding:10px;font-size:.82rem'+sel+'" data-sv="'+sv+'" data-did="'+sid+'" data-val="'+esc(opt)+'" onclick="window.handleDec(this)">'+esc(opt)+'</button>';}
          r+='</div></div>';
        }else if(sub.type==='text'){
          r+='<div style="'+indent+'"><div class="sub-label">'+sub.q+'</div><input class="text-input" style="padding:10px 14px;font-size:.88rem" placeholder="'+esc(sub.ph||'')+'" value="'+esc(store[sid]||'')+'" data-sv="'+sv+'" data-did="'+sid+'" oninput="window.handleDecText(this)"></div>';
        }else{
          // Default: Yes/No nested question (no explicit type set)
          var ysel2=(store[sid]===yL)?' sel':'';var nsel2=(store[sid]===nL)?' sel':'';
          r+='<div style="'+indent+'"><div class="dec-row" style="border-bottom:none;padding:0"><div class="dec-q" style="font-size:.88rem">'+sub.q+'</div><div class="dec-btns">';
          r+='<button type="button" class="dec-btn'+ysel2+'" data-sv="'+sv+'" data-did="'+sid+'" data-val="'+yL+'" onclick="window.handleDec(this)">'+yL+'</button>';
          r+='<button type="button" class="dec-btn'+nsel2+'" data-sv="'+sv+'" data-did="'+sid+'" data-val="'+nL+'" onclick="window.handleDec(this)">'+nL+'</button>';
          r+='</div></div></div>';
        }
        if(sub.trigger&&triggerMatch(store[sid],sub.trigger.val)){r+=buildSubs(sub.trigger.show);}
      }
      return r;
    }
    h+='<button class="lang-btn" onclick="toggleLang()">'+t.lang+'</button><div style="margin-bottom:6px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="sec-label">'+cur.section+'</span><span style="font-size:.72rem;color:#a0926e">'+(step+1)+' '+t.of+' '+total+'</span></div><div class="progress-bar"><div class="progress-fill" style="width:'+((step+1)/total*100)+'%"></div></div></div>';
    h+='<h2 style="font-size:1.15rem;font-weight:700;color:#3a2e1e;margin:16px 0 4px">'+(isCo?t.coDecTitle:t.decTitle)+'</h2><p style="font-size:.82rem;color:#8a7a60;margin-bottom:16px;line-height:1.4">'+(isCo?t.coDecSub:t.decSub)+'</p>';
    h+='<div class="scroll-area"><div class="dec-section-label">'+(isFin?t.decFinancial:t.decProperty)+'</div>';
    for(var di=0;di<decList.length;di++){
      var d=decList[di];if(d.purchaseOnly&&!isPurch)continue;
      var did=d.id;
      var ysel=(store[did]===yL)?' sel':'';var nsel=(store[did]===nL)?' sel':'';
      h+='<div class="dec-row"><div class="dec-q">'+d.q+'</div><div class="dec-btns">';
      h+='<button type="button" class="dec-btn'+ysel+'" data-sv="'+sv+'" data-did="'+did+'" data-val="'+yL+'" onclick="window.handleDec(this)">'+yL+'</button>';
      h+='<button type="button" class="dec-btn'+nsel+'" data-sv="'+sv+'" data-did="'+did+'" data-val="'+nL+'" onclick="window.handleDec(this)">'+nL+'</button>';
      h+='</div></div>';
      if(d.trigger&&triggerMatch(store[did],d.trigger.val)){h+=buildSubs(d.trigger.show);}
    }
    var allDone=allDecAnswered(store,isFin,isPurch);
    h+='</div><button class="primary" id="decNextBtn" style="margin-top:16px" '+(allDone?'':'disabled')+' onclick="goNext()">'+t.next+'</button><div class="nav-center"><button class="ghost" onclick="goBack()">'+t.back+'</button></div>';
    app.innerHTML=h;return;
  }
  if(cur.type==='attestation'){h+='<div style="margin-bottom:6px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="sec-label">'+cur.section+'</span><span style="font-size:.72rem;color:#a0926e">'+(step+1)+' '+t.of+' '+total+'</span></div><div class="progress-bar"><div class="progress-fill" style="width:'+((step+1)/total*100)+'%"></div></div></div><h2 style="font-size:1.15rem;font-weight:700;color:#3a2e1e;margin:16px 0 12px">'+t.attestTitle+'</h2><div class="attest-box"><p class="attest-text">'+t.attestText+'</p></div><div class="check-row" onclick="attested=!attested;render()"><div class="checkbox'+(attested?' checked':'')+'">'+(attested?'\u2713':'')+'</div><span style="font-size:.88rem;color:#4a3f32;line-height:1.4">'+t.attestCheck+'</span></div><button class="primary" '+(attested?'':'disabled')+' onclick="goNext()">'+t.review+' \u2192</button><div class="nav-center"><button class="ghost" onclick="goBack()">'+t.back+'</button></div>';app.innerHTML=h;return;}
  h+='<button class="lang-btn" onclick="toggleLang()">'+t.lang+'</button><div style="margin-bottom:6px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="sec-label">'+(cur.section||'')+'</span><span style="font-size:.72rem;color:#a0926e">'+(step+1)+' '+t.of+' '+total+'</span></div><div class="progress-bar"><div class="progress-fill" style="width:'+((step+1)/total*100)+'%"></div></div></div><div class="q-area"><h2 class="q-title">'+cur.q+'</h2>';
  if(cur.sub)h+='<p class="q-sub">'+cur.sub+'</p>';else h+='<div style="height:12px"></div>';
  if(cur.type==='choice'){h+='<div class="pills">';for(var oi3=0;oi3<cur.opts.length;oi3++){var opt=cur.opts[oi3];h+='<div class="pill'+(answers[cur.id]===opt?' sel':'')+'" onclick="pick(\''+esc(opt)+'\')">'+opt+'</div>';}h+='</div>';}
  if(cur.type==='text'){var canGo=cur.req?!!answers[cur.id]:true;h+='<input class="text-input" id="qinput" type="text" placeholder="'+esc(cur.ph||'')+'" value="'+esc(answers[cur.id]||'')+'" oninput="answers[\''+cur.id+'\']=this.value;document.getElementById(\'nextbtn\').disabled=this.value===\'\'&&'+cur.req+'" onkeydown="if(event.key===\'Enter\'&&!document.getElementById(\'nextbtn\').disabled)goNext()"><button class="primary" id="nextbtn" style="margin-top:16px" '+(canGo?'':'disabled')+' onclick="goNext()">'+(step===total-1?t.review:t.next)+'</button>';}
  if(cur.type==='address'){var canGo=!!answers[cur.id];h+='<div style="position:relative"><input class="text-input" id="qinput" type="text" autocomplete="off" placeholder="'+esc(cur.ph||'')+'" value="'+esc(answers[cur.id]||'')+'" oninput="window.onAddrInput(this)" onkeydown="if(event.key===\'Enter\'&&!document.getElementById(\'nextbtn\').disabled)goNext()"><div id="addrSuggestBox" style="display:none;position:absolute;top:100%;left:0;right:0;background:#fff;border:1px solid #e8dcc4;border-radius:10px;margin-top:4px;box-shadow:0 4px 12px rgba(58,46,30,.08);max-height:240px;overflow-y:auto;z-index:10"></div></div><button class="primary" id="nextbtn" style="margin-top:16px" '+(canGo?'':'disabled')+' onclick="goNext()">'+(step===total-1?t.review:t.next)+'</button>';}
  if(cur.type==='loanltv'){calcLTV();h+='<input class="text-input" id="qinput" type="text" placeholder="$ Amount" value="'+esc(answers.loanAmount||'')+'" oninput="answers.loanAmount=this.value;calcLTV();document.getElementById(\'ltvField\').value=answers.ltvCalc||\'\';document.getElementById(\'nextbtn\').disabled=!this.value;">';h+='<div class="ltv-row"><span class="ltv-label">LTV:</span><input class="ltv-input" id="ltvField" type="text" placeholder="0.000%" value="'+esc(answers.ltvCalc||'')+'" oninput="answers.ltvCalc=this.value;calcLoanFromLTV();document.getElementById(\'qinput\').value=answers.loanAmount||\'\';">';h+='<span class="ltv-label">%</span></div>';var canGo=!!answers.loanAmount;h+='<button class="primary" id="nextbtn" style="margin-top:16px" '+(canGo?'':'disabled')+' onclick="goNext()">'+t.next+'</button>';}
  if(cur.type==='dropdowns'){var occOpts=lang==='en'?["","Primary Residence","Second Home","Investment Property"]:["","\u81ea\u4f4f\u623f","\u5ea6\u5047\u5c4b","\u6295\u8d44\u623f"];var occL=lang==='en'?["Select occupancy...","Primary Residence","Second Home","Investment Property"]:["\u8bf7\u9009\u62e9...","\u81ea\u4f4f\u623f","\u5ea6\u5047\u5c4b","\u6295\u8d44\u623f"];var ptOpts=lang==='en'?["","Single Family","2-Family","3-Family","4-Family","Condo / Townhouse","PUD","Co-op"]:["","\u4e00\u5bb6\u5ead","\u4e24\u5bb6\u5ead","\u4e09\u5bb6\u5ead","\u56db\u5bb6\u5ead","Condo/Townhouse","PUD","Co-op"];var ptL=lang==='en'?["Select property type...","Single Family","2-Family","3-Family","4-Family","Condo / Townhouse","PUD","Co-op"]:["\u8bf7\u9009\u62e9...","\u4e00\u5bb6\u5ead","\u4e24\u5bb6\u5ead","\u4e09\u5bb6\u5ead","\u56db\u5bb6\u5ead","Condo/Townhouse","PUD","Co-op"];h+='<div style="margin-bottom:14px"><label class="dur-label">'+(lang==='en'?'Occupancy':'\u623f\u5c4b\u7528\u9014')+'</label><select class="dur-select" onchange="answers.occupancy=this.value;checkDropdowns()"><option value="">'+(lang==='en'?'Select...':'\u8bf7\u9009\u62e9...')+'</option>';for(var i=1;i<occOpts.length;i++)h+='<option value="'+esc(occOpts[i])+'"'+(answers.occupancy===occOpts[i]?' selected':'')+'>'+occL[i]+'</option>';h+='</select></div>';h+='<div><label class="dur-label">'+(lang==='en'?'Property Type':'\u623f\u4ea7\u7c7b\u578b')+'</label><select class="dur-select" onchange="answers.propertyType=this.value;checkDropdowns()"><option value="">'+(lang==='en'?'Select...':'\u8bf7\u9009\u62e9...')+'</option>';for(var i=1;i<ptOpts.length;i++)h+='<option value="'+esc(ptOpts[i])+'"'+(answers.propertyType===ptOpts[i]?' selected':'')+'>'+ptL[i]+'</option>';h+='</select></div>';var ddOk=!!answers.occupancy&&!!answers.propertyType;h+='<button class="primary" id="nextbtn" style="margin-top:16px" '+(ddOk?'':'disabled')+' onclick="goNext()">'+t.next+'</button>';}
  if(cur.type==='duration'){var parsed=(answers[cur.id]||'').split('|'),yrs=parsed[0]||'',mos=(parsed[1]===''||parsed[1]===undefined)?'0':parsed[1];h+='<div class="dur-wrap"><div style="flex:1"><label class="dur-label">'+t.years+'</label><select class="dur-select" onchange="answers[\''+cur.id+'\']=this.value+\'|\'+(((answers[\''+cur.id+'\']||\'\').split(\'|\')[1])||\'0\');render()"><option value="">--</option>';for(var i=0;i<=30;i++)h+='<option value="'+i+'"'+(yrs==String(i)?' selected':'')+'>'+i+'</option>';h+='</select></div><div style="flex:1"><label class="dur-label">'+t.months+'</label><select class="dur-select" onchange="var p=(answers[\''+cur.id+'\']||\'\').split(\'|\');answers[\''+cur.id+'\']=(p[0]||\'\')+\'|\'+this.value;render()">';for(var i=0;i<12;i++)h+='<option value="'+i+'"'+(mos==String(i)?' selected':'')+'>'+i+'</option>';h+='</select></div></div><button class="primary" style="margin-top:16px" '+((yrs!==''&&mos!=='')?'':'disabled')+' onclick="goNext()">'+t.next+'</button>';}
  if(cur.type==='multi'){var cols=cur.fields.length>2?2:cur.fields.length;h+='<div style="display:grid;grid-template-columns:repeat('+cols+',1fr);gap:10px">';for(var fi=0;fi<cur.fields.length;fi++){var f=cur.fields[fi];var v=answers[f.id]||'';var isInvalid=v&&!validField(f,v);var inputType=f.format==='email'?'email':(f.format==='phone'?'tel':'text');var oninput=f.format==='phone'?'this.value=window.formatPhone(this.value);answers[\''+f.id+'\']=this.value;checkMultiNext()':'answers[\''+f.id+'\']=this.value;checkMultiNext()';var onblur=f.format?'render()':'';var inputMode=f.format==='phone'?' inputmode="tel"':(f.format==='email'?' inputmode="email" autocapitalize="off" autocorrect="off"':'');var borderStyle=isInvalid?';border-color:#c83232':'';h+='<div><input class="text-input" id="qinput_'+f.id+'" type="'+inputType+'"'+inputMode+' style="'+borderStyle+'" placeholder="'+esc(f.ph||'')+'" value="'+esc(v)+'" oninput="'+oninput+'"'+(onblur?' onblur="'+onblur+'"':'')+' onkeydown="if(event.key===\'Enter\'&&!document.getElementById(\'nextbtn\').disabled)goNext()">';if(isInvalid){var errMsg=f.format==='email'?(lang==='en'?'Enter a valid email address':'\u8bf7\u8f93\u5165\u6709\u6548\u7684\u7535\u5b50\u90ae\u7bb1'):(lang==='en'?'Enter a 10-digit phone number':'\u8bf7\u8f93\u5165\u6709\u6548\u768410\u4f4d\u7535\u8bdd\u53f7\u7801');h+='<div style="color:#c83232;font-size:.72rem;margin-top:4px;padding-left:4px">'+errMsg+'</div>';}h+='</div>';}h+='</div>';var allValid=cur.fields.every(function(f){return validField(f,answers[f.id]);});h+='<button class="primary" id="nextbtn" style="margin-top:16px" '+(allValid?'':'disabled')+' onclick="goNext()">'+(step===total-1?t.review:t.next)+'</button>';}
  h+='</div><div class="nav-center"><button class="ghost" onclick="goBack()">'+t.back+'</button></div>';app.innerHTML=h;
  if(cur.type==='text'||cur.type==='loanltv'||cur.type==='address'){var inp=document.getElementById('qinput');if(inp)setTimeout(function(){inp.focus();},100);}
  if(cur.type==='multi'){var inp2=document.getElementById('qinput_'+cur.fields[0].id);if(inp2)setTimeout(function(){inp2.focus();},100);}
}
window.render = render;

function checkDropdowns(){var btn=document.getElementById('nextbtn');if(btn)btn.disabled=!(answers.occupancy&&answers.propertyType);}
function checkMultiNext(){var steps=getSteps(),cur=steps[step];if(!cur||cur.type!=='multi')return;var allValid=cur.fields.every(function(f){return validField(f,answers[f.id]);});var btn=document.getElementById('nextbtn');if(btn)btn.disabled=!allValid;}
window.checkDropdowns = checkDropdowns;
window.checkMultiNext = checkMultiNext;
render();

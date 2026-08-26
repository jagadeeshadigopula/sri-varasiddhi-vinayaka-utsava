/* IMPORTANT: Paste your deployed Google Apps Script Web App URL here. */
const API_URL = "PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
let sessionToken = "";

const $ = (id) => document.getElementById(id);

function setMessage(id, text, ok=false){
  const el=$(id); el.textContent=text; el.style.color=ok?"#287a3e":"#9b2d20";
}

function todayISO(){
  const d=new Date();
  const local=new Date(d.getTime()-d.getTimezoneOffset()*60000);
  return local.toISOString().slice(0,10);
}

function formatDate(value){
  if(!value) return "—";
  const [y,m,d]=value.split("-");
  return `${d}-${m}-${y}`;
}

async function api(action, payload={}){
  if(API_URL.includes("PASTE_GOOGLE")) throw new Error("Google Apps Script URL is not configured yet.");
  const response=await fetch(API_URL,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({action,...payload})});
  const data=await response.json();
  if(!data.ok) throw new Error(data.message||"Request failed");
  return data;
}

window.addEventListener("DOMContentLoaded",()=>{
  $("donationDate").value=todayISO();

  $("loginForm").addEventListener("submit",async(e)=>{
    e.preventDefault();
    setMessage("loginMessage","Signing in...",true);
    try{
      const data=await api("login",{username:$("username").value.trim(),password:$("password").value});
      sessionToken=data.token;
      $("loginPanel").classList.add("hidden");
      $("dashboardPanel").classList.remove("hidden");
      setMessage("loginMessage","");
    }catch(err){setMessage("loginMessage",err.message);}
  });

  $("logoutButton").addEventListener("click",()=>{
    sessionToken="";
    $("dashboardPanel").classList.add("hidden");
    $("loginPanel").classList.remove("hidden");
    $("password").value="";
  });

  $("donationForm").addEventListener("submit",async(e)=>{
    e.preventDefault();
    if(!sessionToken){setMessage("saveMessage","Please login again.");return;}
    const payload={
      token:sessionToken,
      donorName:$("donorName").value.trim(),
      phone:$("phone").value.trim(),
      amount:Number($("amount").value),
      paymentMethod:$("paymentMethod").value,
      donationDate:$("donationDate").value,
      remarks:$("remarks").value.trim()
    };
    if(!payload.donorName||!payload.phone||!payload.amount||!payload.paymentMethod||!payload.donationDate){setMessage("saveMessage","Please complete all required fields.");return;}
    setMessage("saveMessage","Saving donation...",true);
    try{
      const data=await api("saveDonation",payload);
      updateReceipt(payload,data.generatedAt);
      setMessage("saveMessage","Donation saved successfully. Payment slip is ready.",true);
      $("printButton").disabled=false;
    }catch(err){setMessage("saveMessage",err.message);}
  });

  $("printButton").addEventListener("click",()=>window.print());
});

function updateReceipt(p,generatedAt){
  $("rName").textContent=p.donorName;
  $("rPhone").textContent=p.phone;
  $("rAmount").textContent=`₹ ${p.amount.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
  $("rMethod").textContent=p.paymentMethod;
  $("rDate").textContent=formatDate(p.donationDate);
  $("rRemarks").textContent=p.remarks||"—";
  $("rGenerated").textContent=`Generated: ${generatedAt||new Date().toLocaleString()}`;
}

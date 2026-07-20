function saveSettings(){

let data={

aluRate:parseFloat(document.getElementById("aluRate").value)||0,

glassRate:parseFloat(document.getElementById("glassRate").value)||0,

labourRate:parseFloat(document.getElementById("labourRate").value)||0,

profit:parseFloat(document.getElementById("profit").value)||0

};

localStorage.setItem("erpSettings",JSON.stringify(data));

alert("Settings Saved");

}

window.onload=function(){

let s=JSON.parse(localStorage.getItem("erpSettings"));

if(!s)return;

document.getElementById("aluRate").value=s.aluRate;
document.getElementById("glassRate").value=s.glassRate;
document.getElementById("labourRate").value=s.labourRate;
document.getElementById("profit").value=s.profit;

}

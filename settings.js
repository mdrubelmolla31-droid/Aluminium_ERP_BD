function saveSettings() {

let settings = {

aluRate: parseFloat(document.getElementById("aluRate").value) || 0,

glassRate: parseFloat(document.getElementById("glassRate").value) || 0,

labourRate: parseFloat(document.getElementById("labourRate").value) || 0,

profit: parseFloat(document.getElementById("profit").value) || 0

};

localStorage.setItem("erpSettings", JSON.stringify(settings));

alert("Settings Saved Successfully");

}

window.onload = function(){

let settings = JSON.parse(localStorage.getItem("erpSettings"));

if(settings){

document.getElementById("aluRate").value = settings.aluRate;

document.getElementById("glassRate").value = settings.glassRate;

document.getElementById("labourRate").value = settings.labourRate;

document.getElementById("profit").value = settings.profit;

}

}

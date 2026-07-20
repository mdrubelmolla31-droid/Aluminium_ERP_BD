function saveSettings() {

let settings = {

company: document.getElementById("company").value,

series: document.getElementById("series").value,

aluRate: parseFloat(document.getElementById("aluRate").value) || 0,

glassCompany: document.getElementById("glassCompany").value,

glassThickness: document.getElementById("glassThickness").value,

glassColour: document.getElementById("glassColour").value,

glassRate: parseFloat(document.getElementById("glassRate").value) || 0,

labourRate: parseFloat(document.getElementById("labourRate").value) || 0,

profit: parseFloat(document.getElementById("profit").value) || 0

};

localStorage.setItem("erpSettings", JSON.stringify(settings));

alert("Settings Saved Successfully");

}

window.onload = function () {

let settings = JSON.parse(localStorage.getItem("erpSettings"));

if (!settings) return;

document.getElementById("company").value = settings.company;

document.getElementById("series").value = settings.series;

document.getElementById("aluRate").value = settings.aluRate;

document.getElementById("glassCompany").value = settings.glassCompany;

document.getElementById("glassThickness").value = settings.glassThickness;

document.getElementById("glassColour").value = settings.glassColour;

document.getElementById("glassRate").value = settings.glassRate;

document.getElementById("labourRate").value = settings.labourRate;

document.getElementById("profit").value = settings.profit;

};

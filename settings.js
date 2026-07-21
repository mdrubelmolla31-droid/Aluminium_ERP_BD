let rates = JSON.parse(localStorage.getItem("rates")) || [];

function saveSettings(){

let rate={

company:document.getElementById("company").value,

series:document.getElementById("series").value,

aluThickness:document.getElementById("aluThickness").value,

glassCompany:document.getElementById("glassCompany").value,

glassThickness:document.getElementById("glassThickness").value,

glassColour:document.getElementById("glassColour").value,

aluRate:Number(document.getElementById("aluRate").value),

glassRate:Number(document.getElementById("glassRate").value),

hardwareRate:Number(document.getElementById("hardwareRate").value),

fittingsRate:Number(document.getElementById("fittingsRate").value),

labourRate:Number(document.getElementById("labourRate").value),

profit:Number(document.getElementById("profit").value)

};

let index=rates.findIndex(r=>

r.company===rate.company&&

r.series===rate.series&&

r.aluThickness===rate.aluThickness&&

r.glassCompany===rate.glassCompany&&

r.glassThickness===rate.glassThickness&&

r.glassColour===rate.glassColour

);

if(index>=0){

rates[index]=rate;

}else{

rates.push(rate);

}

localStorage.setItem("rates",JSON.stringify(rates));
  
alert(localStorage.getItem("rates"));
  
loadRates();

alert("Rate Saved");
  
function loadRates(){

rates = JSON.parse(localStorage.getItem("rates")) || [];

let body = document.getElementById("rateBody");

body.innerHTML = "";

rates.forEach((r,i)=>{

body.innerHTML += `

<tr>

<td>${r.company}</td>

<td>${r.series}</td>

<td>${r.aluThickness}</td>

<td>${r.glassCompany}</td>

<td>${r.glassThickness}</td>

<td>${r.glassColour}</td>

<td>${r.aluRate}</td>

<td>${r.glassRate}</td>

<td>${r.hardwareRate}</td>

<td>${r.fittingsRate}</td>

<td>${r.labourRate}</td>

<td>${r.profit}%</td>

<td>

<button onclick="deleteRate(${i})">

Delete

</button>

</td>

</tr>

`;

});

}
}
function deleteRate(index){

rates = JSON.parse(localStorage.getItem("rates")) || [];

rates.splice(index,1);

localStorage.setItem("rates",JSON.stringify(rates));

loadRates();

}

window.onload=function(){

loadRates();

};

//================ MASTER DATA =================//

function addCompany(){

let v=document.getElementById("newCompany").value.trim();

if(v=="") return;

let s=document.getElementById("company");

let exist=false;

for(let i=0;i<s.options.length;i++){

if(s.options[i].value==v){

exist=true;

}

}

if(!exist){

s.innerHTML+=`<option>${v}</option>`;

}

document.getElementById("newCompany").value="";

}

function addSeries(){

let v=document.getElementById("newSeries").value.trim();

if(v=="") return;

let s=document.getElementById("series");

let exist=false;

for(let i=0;i<s.options.length;i++){

if(s.options[i].value==v){

exist=true;

}

}

if(!exist){

s.innerHTML+=`<option>${v}</option>`;

}

document.getElementById("newSeries").value="";

}

function addThickness(){

let v=document.getElementById("newThickness").value.trim();

if(v=="") return;

let s=document.getElementById("aluThickness");

let exist=false;

for(let i=0;i<s.options.length;i++){

if(s.options[i].value==v){

exist=true;

}

}

if(!exist){

s.innerHTML+=`<option>${v}</option>`;

}

document.getElementById("newThickness").value="";

}

function addGlassCompany(){

let v=document.getElementById("newGlassCompany").value.trim();

if(v=="") return;

let s=document.getElementById("glassCompany");

let exist=false;

for(let i=0;i<s.options.length;i++){

if(s.options[i].value==v){

exist=true;

}

}

if(!exist){

s.innerHTML+=`<option>${v}</option>`;

}

document.getElementById("newGlassCompany").value="";

}

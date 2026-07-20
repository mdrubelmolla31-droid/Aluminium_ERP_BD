let rates = JSON.parse(localStorage.getItem("rates")) || [];

function saveSettings(){
let rate = {

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

// একই Combination থাকলে Update করবে

let index=rates.findIndex(r=>

r.company==rate.company &&
r.series==rate.series &&
r.glassCompany==rate.glassCompany &&
r.glassThickness==rate.glassThickness &&
r.glassColour==rate.glassColour

);

if(index>=0){

rates[index]=rate;

}else{

rates.push(rate);

}

localStorage.setItem("rates",JSON.stringify(rates));

alert("Rate Saved Successfully");

loadRates();

}

function loadRates(){

let body=document.getElementById("rateBody");

body.innerHTML="";

rates=JSON.parse(localStorage.getItem("rates"))||[];

rates.forEach((r,i)=>{

body.innerHTML+=`

<tr>

<td>${r.company}</td>
<td>${r.series}</td>
<td>${r.glassCompany}</td>
<td>${r.glassThickness}</td>
<td>${r.glassColour}</td>
<td>${r.aluRate}</td>
<td>${r.glassRate}</td>
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

function deleteRate(i){

rates.splice(i,1);

localStorage.setItem("rates",JSON.stringify(rates));

loadRates();

}

window.onload=loadRates;

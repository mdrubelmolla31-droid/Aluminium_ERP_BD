let rates = JSON.parse(localStorage.getItem("rates")) || [];

function saveSettings(){

let data = {

company: document.getElementById("company").value,
series: document.getElementById("series").value,

glassCompany: document.getElementById("glassCompany").value,
glassThickness: document.getElementById("glassThickness").value,
glassColour: document.getElementById("glassColour").value,

aluRate: Number(document.getElementById("aluRate").value),
glassRate: Number(document.getElementById("glassRate").value),
labourRate: Number(document.getElementById("labourRate").value),
profit: Number(document.getElementById("profit").value)

};

rates.push(data);

localStorage.setItem("rates", JSON.stringify(rates));

loadRates();

}

function loadRates(){

let body = document.getElementById("rateBody");

body.innerHTML = "";

rates.forEach((r,index)=>{

body.innerHTML += `
<tr>

<td>${r.company}</td>
<td>${r.series}</td>
<td>${r.glassCompany}</td>
<td>${r.glassThickness}</td>
<td>${r.aluRate}</td>
<td>${r.glassRate}</td>
<td>${r.labourRate}</td>
<td>${r.profit}%</td>

<td>
<button onclick="deleteRate(${index})">Delete</button>
</td>

</tr>
`;

});

}

function deleteRate(index){

rates.splice(index,1);

localStorage.setItem("rates", JSON.stringify(rates));

loadRates();

}

window.onload = loadRates;

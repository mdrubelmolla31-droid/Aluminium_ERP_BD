let rates = JSON.parse(localStorage.getItem("rates")) || [];

function saveSettings() {

let data = {

company: document.getElementById("company").value,

series: document.getElementById("series").value,

glassCompany: document.getElementById("glassCompany").value,

glassThickness: document.getElementById("glassThickness").value,

glassColour: document.getElementById("glassColour").value,

aluRate: parseFloat(document.getElementById("aluRate").value),

glassRate: parseFloat(document.getElementById("glassRate").value),

labourRate: parseFloat(document.getElementById("labourRate").value),

profit: parseFloat(document.getElementById("profit").value)

};

rates.push(data);

localStorage.setItem("rates", JSON.stringify(rates));

showRates();

alert("Rate Saved");

}

function showRates() {

let body = document.getElementById("rateBody");

body.innerHTML = "";

rates.forEach((r, i) => {

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

<button onclick="deleteRate(${i})">Delete</button>

</td>

</tr>

`;

});

}

function deleteRate(index){

rates.splice(index,1);

localStorage.setItem("rates",JSON.stringify(rates));

showRates();

}

window.onload = showRates;

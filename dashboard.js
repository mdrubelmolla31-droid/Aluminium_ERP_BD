let quotationList = JSON.parse(localStorage.getItem("quotationList")) || [];

loadDashboard();

function loadDashboard(){

let body=document.getElementById("quotationBody");

body.innerHTML="";

let totalSale=0;

let totalSqft=0;

quotationList.forEach((q,i)=>{

totalSale+=Number(q.sellingPrice)||0;

totalSqft+=Number(q.glass)||0;

body.innerHTML+=`

<tr>

<td>${q.date||""}</td>

<td>${q.customerName||""}</td>

<td>${q.mobile||""}</td>

<td>${q.company||""}</td>

<td>${q.series||""}</td>

<td>${Number(q.sellingPrice||0).toFixed(2)} ৳</td>

<td>

<button onclick="openQuotation(${i})">

Open

</button>

<button onclick="deleteQuotation(${i})">

Delete

</button>

</td>

</tr>

`;

});

document.getElementById("totalQuotation").innerHTML=quotationList.length;

document.getElementById("totalSale").innerHTML=totalSale.toFixed(2)+" ৳";

let avg=0;

if(totalSqft>0){

avg=totalSale/totalSqft;

}

document.getElementById("avgSqft").innerHTML=avg.toFixed(2)+" ৳";

}

function searchQuotation(){

let txt=document.getElementById("search").value.toLowerCase();

let rows=document.querySelectorAll("#quotationBody tr");

rows.forEach(r=>{

if(r.innerText.toLowerCase().includes(txt)){

r.style.display="";

}else{

r.style.display="none";

}

});

}

function deleteQuotation(i){

quotationList.splice(i,1);

localStorage.setItem("quotationList",JSON.stringify(quotationList));

loadDashboard();

}

function openQuotation(i){

localStorage.setItem(

"quotation",

JSON.stringify(quotationList[i])

);

window.location.href="quotation.html";

}

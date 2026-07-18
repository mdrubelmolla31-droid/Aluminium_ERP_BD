function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username === "admin" && password === "1234"){
        alert("Login Successful");
        window.location.href = "dashboard.html";
    } else {
        alert("Wrong Username or Password");
    }

}
function calculateMaterial(){

let w=parseFloat(document.getElementById("width").value);
let h=parseFloat(document.getElementById("height").value);
let q=parseInt(document.getElementById("qty").value);

if(!w || !h || !q){

alert("সব তথ্য দিন");

return;

}

let glass=((w*h)/144)*q;

document.getElementById("result").innerHTML=`

<h2>Result</h2>

<p>Glass : ${glass.toFixed(2)} Sqft</p>

<p>Quantity : ${q}</p>

<p><b>Formula Engine Coming...</b></p>

`;

}
// =========================
// Company Management
// =========================

let companies = JSON.parse(localStorage.getItem("companies")) || [];

function addCompany(){

    let input = document.getElementById("companyName");

    if(!input) return;

    let name = input.value.trim();

    if(name==""){

        alert("কোম্পানির নাম লিখুন");

        return;

    }

    companies.push(name);

    localStorage.setItem("companies",JSON.stringify(companies));

    input.value="";

    showCompanies();

}

function showCompanies(){

    let list=document.getElementById("companyList");

    if(!list) return;

    list.innerHTML="";

    companies.forEach(function(company,index){

        list.innerHTML+=`
        <li>
            ${company}
            <button onclick="deleteCompany(${index})">
            ❌
            </button>
        </li>
        `;

    });

}

function deleteCompany(index){

    companies.splice(index,1);

    localStorage.setItem("companies",JSON.stringify(companies));

    showCompanies();

}

window.onload=function(){

    showCompanies();

}

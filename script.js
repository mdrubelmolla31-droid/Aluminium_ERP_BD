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

let outerSide = h * 2 * q;
let outerTop = w * q;
let outerBottom = w * q;
let totalAluminium = outerSide + outerTop + outerBottom;

document.getElementById("outerSide").innerText = outerSide.toFixed(2);
document.getElementById("outerTop").innerText = outerTop.toFixed(2);
document.getElementById("outerBottom").innerText = outerBottom.toFixed(2);
document.getElementById("glass").innerText = glass.toFixed(2);
document.getElementById("totalAluminium").innerText = totalAluminium.toFixed(2);
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

// =====================
// Glass Management
// =====================

let glasses = JSON.parse(localStorage.getItem("glasses")) || [];

function addGlass(){

    let input = document.getElementById("glassName");

    if(!input) return;

    let name = input.value.trim();

    if(name==""){
        alert("Glass Company লিখুন");
        return;
    }

    glasses.push(name);

    localStorage.setItem("glasses", JSON.stringify(glasses));

    input.value="";

    showGlasses();

}

function showGlasses(){

    let list=document.getElementById("glassList");

    if(!list) return;

    list.innerHTML="";

    glasses.forEach(function(item,index){

        list.innerHTML+=`
        <li>
            ${item}
            <button onclick="deleteGlass(${index})">❌</button>
        </li>
        `;

    });

}

function deleteGlass(index){

    glasses.splice(index,1);

    localStorage.setItem("glasses", JSON.stringify(glasses));

    showGlasses();

}

showGlasses();

// ===== Admin Login =====

if (localStorage.getItem("admin") == null) {
    let admin = {
        username: "admin",
        password: "1234"
    };
    localStorage.setItem("admin", JSON.stringify(admin));
}

function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let admin = JSON.parse(localStorage.getItem("admin"));

    if (username == admin.username && password == admin.password) {

        alert("Login Successful");

        window.location.href = "dashboard.html";

    } else {

        alert("Wrong Username or Password");

    }

}

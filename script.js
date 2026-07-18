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

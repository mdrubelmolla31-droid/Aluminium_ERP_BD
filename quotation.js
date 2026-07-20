window.onload = function () {

let data = JSON.parse(localStorage.getItem("quotation"));

if (!data) {
alert("No Quotation Found");
return;
}

document.getElementById("customer").innerHTML = data.customer;
document.getElementById("mobile").innerHTML = data.mobile;
document.getElementById("address").innerHTML = data.address;

document.getElementById("company").innerHTML = data.company;
document.getElementById("series").innerHTML = data.series;

document.getElementById("glassCompany").innerHTML = data.glassCompany;
document.getElementById("glassThickness").innerHTML = data.glassThickness;
document.getElementById("glassColour").innerHTML = data.glassColour;

document.getElementById("width").innerHTML = data.width + " Inch";
document.getElementById("height").innerHTML = data.height + " Inch";
document.getElementById("qty").innerHTML = data.qty;

document.getElementById("totalAluminium").innerHTML =
data.totalAluminium.toFixed(2) + " Ft";

document.getElementById("glass").innerHTML =
data.glass.toFixed(2) + " Sqft";

document.getElementById("materialCost").innerHTML =
data.materialCost.toFixed(2) + " ৳";

document.getElementById("costPerSqft").innerHTML =
data.costPerSqft.toFixed(2) + " ৳";

document.getElementById("sellingPrice").innerHTML =
data.sellingPrice.toFixed(2) + " ৳";

};

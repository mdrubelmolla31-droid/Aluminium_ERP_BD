window.onload = function () {

let data = JSON.parse(localStorage.getItem("quotation"));

if (!data) {
    alert("No Quotation Found");
    return;
}

document.getElementById("customer").innerHTML = data.customerName;
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

document.getElementById("totalAluminium").innerHTML = data.totalAluminium;
document.getElementById("glass").innerHTML = data.glass;
document.getElementById("materialCost").innerHTML = data.materialCost;
document.getElementById("costPerSqft").innerHTML = data.costPerSqft;
document.getElementById("sellingPrice").innerHTML = data.sellingPrice;

};

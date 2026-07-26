// ======================================
// ALUMINIUM CALCULATOR
// calculator.js
// PART-1
// ======================================

// =======================
// GLOBAL DATA
// =======================
console.log(JSON.parse(localStorage.getItem("rates")));
let rates = JSON.parse(localStorage.getItem("rates")) || [];

let totalOuterSide = 0;
let totalOuterTop = 0;
let totalOuterBottom = 0;

let totalShutterLock = 0;
let totalShutterInterlock = 0;
let totalShutterTop = 0;
let totalShutterBottom = 0;

let grandTotalAluminium = 0;
let totalGlass = 0;

// =======================
// PAGE LOAD
// =======================

document.addEventListener("DOMContentLoaded", () => {

    loadDropdowns();

});

// =======================
// LOAD DROPDOWNS
// =======================

function loadDropdowns(){

    rates = JSON.parse(localStorage.getItem("rates")) || [];

    fillSelect("company","company");
    fillSelect("series","series");

    fillSelect("aluThickness","aluThickness");
    fillSelect("aluColour","aluColour");

    fillSelect("glassCompany","glassCompany");
    fillSelect("glassThickness","glassThickness");
    fillSelect("glassColour","glassColour");

}

// =======================
// FILL SELECT
// =======================

function fillSelect(id,key){

    let select = document.getElementById(id);

    if(!select) return;

    select.innerHTML = "<option value=''>Select</option>";

    let values = [

        ...new Set(

            rates
            .map(r=>r[key])
            .filter(v=>v && v.trim()!="")

        )

    ];

    values.forEach(v=>{

        let option = document.createElement("option");

        option.value = v;
        option.textContent = v;

        select.appendChild(option);

    });

}

// ======================================
// PART-2
// CALCULATE MATERIAL
// ======================================

function calculateMaterial(){

    rates = JSON.parse(localStorage.getItem("rates")) || [];

    const company =
        document.getElementById("company").value;

    const series =
        document.getElementById("series").value;

    const aluThickness =
        document.getElementById("aluThickness").value;

    const aluColour =
        document.getElementById("aluColour").value;

    const glassCompany =
        document.getElementById("glassCompany").value;

    const glassThickness =
        document.getElementById("glassThickness").value;

    const glassColour =
        document.getElementById("glassColour").value;

    const setting = rates.find(r =>

        r.company === company &&
        r.series === series &&
        r.aluThickness === aluThickness &&
        r.aluColour === aluColour &&
        r.glassCompany === glassCompany &&
        r.glassThickness === glassThickness &&
        r.glassColour === glassColour

    );

    if(!setting){

        alert("Rate Not Found");
        return;

    }

    totalOuterSide = 0;
    totalOuterTop = 0;
    totalOuterBottom = 0;

    totalShutterLock = 0;
    totalShutterInterlock = 0;
    totalShutterTop = 0;
    totalShutterBottom = 0;

    grandTotalAluminium = 0;
    totalGlass = 0;

    calculateWindow(
        "width",
        "height",
        "qty"
    );

    calculateWindow(
        "width2",
        "height2",
        "qty2"
    );

    calculateWindow(
        "width3",
        "height3",
        "qty3"
    );

    calculateWindow(
        "width4",
        "height4",
        "qty4"
    );

    calculateWindow(
        "width5",
        "height5",
        "qty5"
    );

// ======================================
// PART-3
// WINDOW CALCULATION
// ======================================

function calculateWindow(widthId,heightId,qtyId){

    let width =
        parseFloat(document.getElementById(widthId).value) || 0;

    let height =
        parseFloat(document.getElementById(heightId).value) || 0;

    let qty =
        parseInt(document.getElementById(qtyId).value) || 0;

    if(width<=0 || height<=0 || qty<=0){
        return;
    }

    let outerSide =
        ((height * 2) / 12) * qty;

    let outerTop =
        (width / 12) * qty;

    let outerBottom =
        (width / 12) * qty;

    let shutterLock =
        ((height * 2) / 12) * qty;

    let shutterInterlock =
        ((height * 2) / 12) * qty;

    let shutterTop =
        (width / 12) * qty;

    let shutterBottom =
        (width / 12) * qty;

    let totalAluminium =

        outerSide +
        outerTop +
        outerBottom +
        shutterLock +
        shutterInterlock +
        shutterTop +
        shutterBottom;

    let glass =
        ((width * height) / 144) * qty;

    grandTotalAluminium += totalAluminium;
    totalGlass += glass;

    totalOuterSide += outerSide;
    totalOuterTop += outerTop;
    totalOuterBottom += outerBottom;

    totalShutterLock += shutterLock;
    totalShutterInterlock += shutterInterlock;
    totalShutterTop += shutterTop;
    totalShutterBottom += shutterBottom;

}

// ======================================
// PART-4
// MATERIAL DETAILS
// ======================================

document.getElementById("outerSide").innerHTML =
    totalOuterSide.toFixed(2) + " ft";

document.getElementById("outerTop").innerHTML =
    totalOuterTop.toFixed(2) + " ft";

document.getElementById("outerBottom").innerHTML =
    totalOuterBottom.toFixed(2) + " ft";

document.getElementById("shutterLock").innerHTML =
    totalShutterLock.toFixed(2) + " ft";

document.getElementById("shutterInterlock").innerHTML =
    totalShutterInterlock.toFixed(2) + " ft";

document.getElementById("shutterTop").innerHTML =
    totalShutterTop.toFixed(2) + " ft";

document.getElementById("shutterBottom").innerHTML =
    totalShutterBottom.toFixed(2) + " ft";

document.getElementById("totalAluminium").innerHTML =
    grandTotalAluminium.toFixed(2) + " ft";

document.getElementById("glass").innerHTML =
    totalGlass.toFixed(2) + " Sqft";
// ======================================
// PART-5
// 18.6 ft CUTTING REPORT
// ======================================

let profile186 = [];

function add186(name,length,qty){

    let piece = 18.6;

    let each = length / 12;

    while(qty>0){

        let used = 0;
        let count = 0;

        while(qty>0 && used+each<=piece){

            used += each;
            qty--;
            count++;

        }

        profile186.push({

            profile:name,
            pieces:count,
            used:used,
            remain:(piece-used)

        });

    }

}

add186("Outer Side",height*2,document.getElementById("qty").value||0);
add186("Outer Side",height2*2,document.getElementById("qty2").value||0);
add186("Outer Side",height3*2,document.getElementById("qty3").value||0);
add186("Outer Side",height4*2,document.getElementById("qty4").value||0);
add186("Outer Side",height5*2,document.getElementById("qty5").value||0);

// ======================================
// PART-6
// 21 ft CUTTING REPORT
// ======================================

let profile21 = [];

function add21(name,length,qty){

    let piece = 21;

    let each = length / 12;

    while(qty>0){

        let used = 0;
        let count = 0;

        while(qty>0 && used + each <= piece){

            used += each;
            qty--;
            count++;

        }

        profile21.push({

            profile:name,
            pieces:count,
            used:used,
            remain:(piece-used)

        });

    }

}

add21("Outer Top",width,qty);
add21("Outer Bottom",width,qty);
add21("Shutter Top",width,qty);
add21("Shutter Bottom",width,qty);

add21("Outer Top",width2,qty2);
add21("Outer Bottom",width2,qty2);
add21("Shutter Top",width2,qty2);
add21("Shutter Bottom",width2,qty2);

add21("Outer Top",width3,qty3);
add21("Outer Bottom",width3,qty3);
add21("Shutter Top",width3,qty3);
add21("Shutter Bottom",width3,qty3);

add21("Outer Top",width4,qty4);
add21("Outer Bottom",width4,qty4);
add21("Shutter Top",width4,qty4);
add21("Shutter Bottom",width4,qty4);

add21("Outer Top",width5,qty5);
add21("Outer Bottom",width5,qty5);
add21("Shutter Top",width5,qty5);
add21("Shutter Bottom",width5,qty5);

// ======================================
// PART-7
// REMAINING LENGTH
// ======================================

let remain186 = 0;

profile186.forEach(r => {

    remain186 += r.remain;

});

let remain21 = 0;

profile21.forEach(r => {

    remain21 += r.remain;

});

document.getElementById("remain186").innerHTML =
    remain186.toFixed(2) + " ft";

document.getElementById("remain21").innerHTML =
    remain21.toFixed(2) + " ft";

// ======================================
// COST CALCULATION
// ======================================

let aluminiumCost =
    grandTotalAluminium * setting.aluRate;

let glassCost =
    totalGlass * setting.glassRate;

let hardwareCost =
    totalGlass * setting.hardwareRate;

let fittingsCost =
    totalGlass * setting.fittingsRate;

let labourCost =
    totalGlass * setting.labourRate;

let materialCost =
    aluminiumCost +
    glassCost +
    hardwareCost +
    fittingsCost +
    labourCost;

let profitAmount =
    materialCost * setting.profit / 100;

let sellingPrice =
    materialCost + profitAmount;

document.getElementById("hardwareCost").innerHTML =
    hardwareCost.toFixed(2);

document.getElementById("fittingsCost").innerHTML =
    fittingsCost.toFixed(2);

document.getElementById("labourCost").innerHTML =
    labourCost.toFixed(2);

document.getElementById("materialCost").innerHTML =
    materialCost.toFixed(2);

document.getElementById("sellingPrice").innerHTML =
    sellingPrice.toFixed(2);

if(totalGlass>0){

    document.getElementById("materialSqft").innerHTML =
        (materialCost/totalGlass).toFixed(2);

    document.getElementById("sellingSqft").innerHTML =
        (sellingPrice/totalGlass).toFixed(2);

    document.getElementById("profitSqft").innerHTML =
        (profitAmount/totalGlass).toFixed(2);

    document.getElementById("costPerSqft").innerHTML =
        (materialCost/totalGlass).toFixed(2);

}else{

    document.getElementById("materialSqft").innerHTML = "0";
    document.getElementById("sellingSqft").innerHTML = "0";
    document.getElementById("profitSqft").innerHTML = "0";
    document.getElementById("costPerSqft").innerHTML = "0";

}

}

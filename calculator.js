// =====================================
// MATERIAL CALCULATOR (Fixed Cutting Report with Full Bar & Extra Feet)
// calculator.js
// =====================================

let rates = JSON.parse(localStorage.getItem("rates")) || [];

document.addEventListener("DOMContentLoaded", () => {
    loadDropdowns();
});

function loadDropdowns() {
    rates = JSON.parse(localStorage.getItem("rates")) || [];

    fillSelect("company", "company");
    fillSelect("series", "series");
    fillSelect("aluThickness", "aluThickness");
    fillSelect("aluColour", "aluColour");
    fillSelect("glassCompany", "glassCompany");
    fillSelect("glassThickness", "glassThickness");
    fillSelect("glassColour", "glassColour");
}

function fillSelect(id, key) {
    const select = document.getElementById(id);
    if (!select) return;

    select.innerHTML = `<option value="">Select Option</option>`;

    const values = [...new Set(
        rates
            .map(r => r[key])
            .filter(v => v && String(v).trim() !== "")
    )];

    values.forEach(v => {
        const option = document.createElement("option");
        option.value = v;
        option.textContent = v;
        select.appendChild(option);
    });
}

function calculateMaterial() {
    rates = JSON.parse(localStorage.getItem("rates")) || [];

    let company = document.getElementById("company") ? document.getElementById("company").value : "";
    let series = document.getElementById("series") ? document.getElementById("series").value : "";
    let aluThickness = document.getElementById("aluThickness") ? document.getElementById("aluThickness").value : "";
    let aluColour = document.getElementById("aluColour") ? document.getElementById("aluColour").value : "";
    let glassCompany = document.getElementById("glassCompany") ? document.getElementById("glassCompany").value : "";
    let glassThickness = document.getElementById("glassThickness") ? document.getElementById("glassThickness").value : "";
    let glassColour = document.getElementById("glassColour") ? document.getElementById("glassColour").value : "";

    let setting = rates.find(r =>
        r.company === company &&
        r.series === series &&
        r.aluThickness === aluThickness &&
        (r.aluColour || "") === aluColour &&
        r.glassCompany === glassCompany &&
        r.glassThickness === glassThickness &&
        r.glassColour === glassColour
    );

    if (!setting) {
        alert("সিলেক্ট করা অপশন অনুযায়ী Admin Panel-এ কোনো Rate খুঁজে পাওয়া যায়নি!");
        return;
    }

    // Input Reading (Window 1 to 5)
    let getWinData = (wId, hId, qId) => {
        return {
            w: parseFloat(document.getElementById(wId)?.value) || 0,
            h: parseFloat(document.getElementById(hId)?.value) || 0,
            q: parseInt(document.getElementById(qId)?.value) || 0
        };
    };

    let wins = [
        getWinData("width", "height", "qty"),
        getWinData("width2", "height2", "qty2"),
        getWinData("width3", "height3", "qty3"),
        getWinData("width4", "height4", "qty4"),
        getWinData("width5", "height5", "qty5")
    ];

    // Total Length Calculation for all windows
    let totalOuterSide = 0, totalOuterTop = 0, totalOuterBottom = 0;
    let totalShutterLock = 0, totalShutterInterlock = 0;
    let totalShutterTop = 0, totalShutterBottom = 0;
    let totalGlass = 0;

    // Track Height preferred bar size (If height > 60 inch -> 21ft bar, else 18.6ft bar)
    let outerSide186Ft = 0, outerSide21Ft = 0;
    let shutterLock186Ft = 0, shutterLock21Ft = 0;
    let shutterInterlock186Ft = 0, shutterInterlock21Ft = 0;

    wins.forEach(win => {
        if (win.q > 0 && win.w > 0 && win.h > 0) {
            let oSide = ((win.h * 2) / 12) * win.q;
            let oTop = (win.w / 12) * win.q;
            let oBot = (win.w / 12) * win.q;

            let sLock = ((win.h * 2) / 12) * win.q; // 2 Shutter Lock vertical
            let sInter = ((win.h * 2) / 12) * win.q; // 2 Shutter Interlock vertical
            let sTop = ((win.w * 2) / 12) * win.q; // 2 Shutter Top horizontal
            let sBot = ((win.w * 2) / 12) * win.q; // 2 Shutter Bottom horizontal

            totalOuterSide += oSide;
            totalOuterTop += oTop;
            totalOuterBottom += oBot;
            totalShutterLock += sLock;
            totalShutterInterlock += sInter;
            totalShutterTop += sTop;
            totalShutterBottom += sBot;

            totalGlass += ((win.w * win.h) / 144) * win.q;

            // Height based separation for Vertical Items (18.6ft vs 21ft)
            if (win.h > 60) {
                outerSide21Ft += oSide;
                shutterLock21Ft += sLock;
                shutterInterlock21Ft += sInter;
            } else {
                outerSide186Ft += oSide;
                shutterLock186Ft += sLock;
                shutterInterlock186Ft += sInter;
            }
        }
    });

    let grandTotalAluminium = totalOuterSide + totalOuterTop + totalOuterBottom +
                            totalShutterLock + totalShutterInterlock +
                            totalShutterTop + totalShutterBottom;

    // Helper Function to calculate Full Bars & Remaining Extra Feet
    let calcBar = (totalFeet, barLength) => {
        if (totalFeet <= 0) return "0 Pcs";
        let fullPcs = Math.floor(totalFeet / barLength);
        let extraFt = (totalFeet % barLength).toFixed(1);
        if (fullPcs > 0 && extraFt > 0) {
            return `${fullPcs} Pcs + ${extraFt} ft`;
        } else if (fullPcs > 0) {
            return `${fullPcs} Pcs`;
        } else {
            return `${extraFt} ft`;
        }
    };

    // Costs Calculation (Sqft Based)
    let aluminiumCost = totalGlass * (setting.aluRate || 0);
    let glassCost = totalGlass * (setting.glassRate || 0);
    let hardwareCost = totalGlass * (setting.hardwareRate || 0);
    let fittingsCost = totalGlass * (setting.fittingsRate || 0);
    let labourCost = totalGlass * (setting.labourRate || 0);

    let materialCost = aluminiumCost + glassCost + hardwareCost + fittingsCost + labourCost;
    let profitAmount = materialCost * (setting.profit || 0) / 100;
    let sellingPrice = materialCost + profitAmount;

    let materialSqft = totalGlass > 0 ? materialCost / totalGlass : 0;
    let sellingSqft = totalGlass > 0 ? sellingPrice / totalGlass : 0;
    let profitSqft = totalGlass > 0 ? profitAmount / totalGlass : 0;

    // UI Updates - Material Details
    let setTxt = (id, val) => { if(document.getElementById(id)) document.getElementById(id).innerText = val; };

    setTxt("outerSide", totalOuterSide.toFixed(2) + " ft");
    setTxt("outerTop", totalOuterTop.toFixed(2) + " ft");
    setTxt("outerBottom", totalOuterBottom.toFixed(2) + " ft");
    setTxt("shutterLock", totalShutterLock.toFixed(2) + " ft");
    setTxt("shutterInterlock", totalShutterInterlock.toFixed(2) + " ft");
    setTxt("shutterTop", totalShutterTop.toFixed(2) + " ft");
    setTxt("shutterBottom", totalShutterBottom.toFixed(2) + " ft");

    setTxt("totalAluminium", grandTotalAluminium.toFixed(2) + " ft");
    setTxt("glass", totalGlass.toFixed(2) + " Sqft");

    setTxt("aluCost", aluminiumCost.toFixed(2) + " ৳");
    setTxt("glassCost", glassCost.toFixed(2) + " ৳");
    setTxt("hardwareCost", hardwareCost.toFixed(2) + " ৳");
    setTxt("fittingsCost", fittingsCost.toFixed(2) + " ৳");
    setTxt("labourCost", labourCost.toFixed(2) + " ৳");
    setTxt("materialCost", materialCost.toFixed(2) + " ৳");
    setTxt("materialSqft", materialSqft.toFixed(2) + " ৳");
    setTxt("sellingSqft", sellingSqft.toFixed(2) + " ৳");
    setTxt("profitSqft", profitSqft.toFixed(2) + " ৳");
    setTxt("sellingPrice", sellingPrice.toFixed(2) + " ৳");

    // UI Updates - Cutting Report (Full Pcs + Extra Feet)
    // Horizontal items (Outer Top, Outer Bottom, Shutter Top, Shutter Bottom) -> ALWAYS 21 FT BAR
    setTxt("outerTop186", "-");
    setTxt("outerTop21", calcBar(totalOuterTop, 21));

    setTxt("outerBottom186", "-");
    setTxt("outerBottom21", calcBar(totalOuterBottom, 21));

    setTxt("shutterTop186", "-");
    setTxt("shutterTop21", calcBar(totalShutterTop, 21));

    setTxt("shutterBottom186", "-");
    setTxt("shutterBottom21", calcBar(totalShutterBottom, 21));

    // Vertical items (Outer Side, Shutter Lock, Shutter Interlock) -> Can be 18.6 FT or 21 FT
    setTxt("outerSide186", calcBar(outerSide186Ft, 18.6));
    setTxt("outerSide21", calcBar(outerSide21Ft, 21));

    setTxt("shutterLock186", calcBar(shutterLock186Ft, 18.6));
    setTxt("shutterLock21", calcBar(shutterLock21Ft, 21));

    setTxt("shutterInterlock186", calcBar(shutterInterlock186Ft, 18.6));
    setTxt("shutterInterlock21", calcBar(shutterInterlock21Ft, 21));
}

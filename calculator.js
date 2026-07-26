// =====================================
// EXACT ALUMNIUN CUTTING CALCULATOR (STRICT)
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

    // 1. Read Inputs
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

    // Totals for Material Costing
    let totalOuterSide = 0, totalOuterTop = 0, totalOuterBottom = 0;
    let totalShutterLock = 0, totalShutterInterlock = 0;
    let totalShutterTop = 0, totalShutterBottom = 0;
    let totalGlass = 0;

    let heightFt186 = 0;
    let heightFt21 = 0;

    wins.forEach(win => {
        if (win.q > 0 && win.w > 0 && win.h > 0) {
            let oSide = ((win.h * 2) / 12) * win.q;
            let oTop = (win.w / 12) * win.q;
            let oBot = (win.w / 12) * win.q;

            let sLock = ((win.h * 2) / 12) * win.q;
            let sInter = ((win.h * 2) / 12) * win.q;
            let sTop = ((win.w * 2) / 12) * win.q;
            let sBot = ((win.w * 2) / 12) * win.q;

            totalOuterSide += oSide;
            totalOuterTop += oTop;
            totalOuterBottom += oBot;
            totalShutterLock += sLock;
            totalShutterInterlock += sInter;
            totalShutterTop += sTop;
            totalShutterBottom += sBot;

            totalGlass += ((win.w * win.h) / 144) * win.q;

            // Height Logic (4.5 ft / 54 inch or lower -> 18.6 ft bar pool)
            if (win.h <= 54) {
                heightFt186 += oSide;
            } else {
                heightFt21 += oSide;
            }
        }
    });

    let grandTotalAluminium = totalOuterSide + totalOuterTop + totalOuterBottom +
                            totalShutterLock + totalShutterInterlock +
                            totalShutterTop + totalShutterBottom;

    // 2. Strict Calculation Logic
    // STRICT RULE: 18.6 ft ONLY takes full bars (Math.floor). ANY extra feet goes directly to 21 ft pool!
    let full186Pcs = Math.floor(heightFt186 / 18.6);
    let extraFtFrom186 = heightFt186 % 18.6;

    let total21FtPool = heightFt21 + extraFtFrom186;
    let full21PcsVert = Math.floor(total21FtPool / 21);
    let extra21FtVert = Math.round(total21FtPool % 21);

    // Format Horizontal Items (Always 21 ft bar)
    let calcHorizontal21 = (totalFt) => {
        let pcs = Math.floor(totalFt / 21);
        let extra = Math.round(totalFt % 21);
        if (pcs > 0 && extra > 0) return `${pcs} Pcs + ${extra}.0 ft`;
        if (pcs > 0) return `${pcs} Pcs`;
        if (extra > 0) return `${extra}.0 ft`;
        return "-";
    };

    // Cost Calculation
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

    // 3. Update UI
    let setTxt = (id, val) => { if(document.getElementById(id)) document.getElementById(id).innerText = val; };

    // Material Details Outputs
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

    // Cutting Report Outputs (Strict Format)
    // 18.6 ft text can ONLY be "X Pcs" or "-"
    let str186 = full186Pcs > 0 ? `${full186Pcs} Pcs` : "-";

    // 21 ft text gets all remaining extra feet
    let str21Vert = full21PcsVert > 0 && extra21FtVert > 0 
        ? `${full21PcsVert} Pcs + ${extra21FtVert}.0 ft` 
        : (full21PcsVert > 0 ? `${full21PcsVert} Pcs` : `${extra21FtVert}.0 ft`);

    // Vertical Items
    setTxt("outerSide186", str186);
    setTxt("outerSide21", str21Vert);

    setTxt("shutterLock186", str186);
    setTxt("shutterLock21", str21Vert);

    setTxt("shutterInterlock186", str186);
    setTxt("shutterInterlock21", str21Vert);

    // Horizontal Items (STRICTLY ONLY 21 FT)
    setTxt("outerTop186", "-");
    setTxt("outerTop21", calcHorizontal21(totalOuterTop));

    setTxt("outerBottom186", "-");
    setTxt("outerBottom21", calcHorizontal21(totalOuterBottom));

    setTxt("shutterTop186", "-");
    setTxt("shutterTop21", calcHorizontal21(totalShutterTop));

    setTxt("shutterBottom186", "-");
    setTxt("shutterBottom21", calcHorizontal21(totalShutterBottom));
}

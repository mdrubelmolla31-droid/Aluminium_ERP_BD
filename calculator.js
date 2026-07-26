// =====================================
// EXACT PIECE-BY-PIECE CUTTING CALCULATOR
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

    // Piece collection for Cutting Report
    let heightPieces = []; // For Outer Side, Lock, Interlock
    let outerWidthPieces = []; // For Outer Top, Outer Bottom
    let shutterWidthPieces = []; // For Shutter Top, Shutter Bottom

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

            // Individual Cut Sizes (in inches)
            // Height pieces: 2 Outer Side, 2 Lock, 2 Interlock per window
            for (let i = 0; i < win.q * 2; i++) {
                heightPieces.push(win.h);
            }

            // Outer Width pieces: 1 Top, 1 Bottom per window
            for (let i = 0; i < win.q; i++) {
                outerWidthPieces.push(win.w);
            }

            // Shutter Width pieces: 2 Shutters, so 2 Top, 2 Bottom pieces per window (each ~ w/2)
            for (let i = 0; i < win.q * 2; i++) {
                shutterWidthPieces.push(win.w / 2);
            }
        }
    });

    let grandTotalAluminium = totalOuterSide + totalOuterTop + totalOuterBottom +
                            totalShutterLock + totalShutterInterlock +
                            totalShutterTop + totalShutterBottom;

    // 2. Bin Packing Optimizer Logic
    function optimizeCuts(pieces, barLengthInch) {
        let sorted = [...pieces].sort((a, b) => b - a);
        let bars = [];

        sorted.forEach(p => {
            let placed = false;
            for (let i = 0; i < bars.length; i++) {
                if (bars[i] >= p) {
                    bars[i] -= p;
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                bars.push(barLengthInch - p);
            }
        });

        let fullPcs = 0;
        let extraInches = 0;

        bars.forEach(rem => {
            let usedInches = barLengthInch - rem;
            if (usedInches >= barLengthInch - 6) { // Almost full bar used
                fullPcs++;
            } else {
                extraInches += usedInches;
            }
        });

        return { fullPcs, extraFt: (extraInches / 12).toFixed(0) };
    }

    // Custom Optimizer for Vertical Items (18.6 ft & 21 ft mixed)
    function optimizeVertical(pieces) {
        let p21 = [];
        let p186 = [];

        pieces.sort((a, b) => b - a).forEach(p => {
            if (p > 54) {
                p21.push(p);
            } else {
                p186.push(p);
            }
        });

        let res21 = optimizeCuts(p21, 252);   // 21 ft = 252 inch
        let res186 = optimizeCuts(p186, 223.2); // 18.6 ft = 223.2 inch

        return {
            v21Full: res21.fullPcs,
            v21Extra: res21.extraFt,
            v186Full: res186.fullPcs,
            v186Extra: res186.extraFt
        };
    }

    let vertReport = optimizeVertical(heightPieces);
    let outerWidthReport = optimizeCuts(outerWidthPieces, 252);
    let shutterWidthReport = optimizeCuts(shutterWidthPieces, 252);

    // Format display string
    let fmtStr = (full, extra) => {
        let f = parseInt(full) || 0;
        let e = parseFloat(extra) || 0;
        if (f > 0 && e > 0) return `${f} Pcs + ${e} ft`;
        if (f > 0) return `${f} Pcs`;
        if (e > 0) return `${e} ft`;
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

    // Cutting Report Outputs
    setTxt("outerSide186", fmtStr(vertReport.v186Full, vertReport.v186Extra));
    setTxt("outerSide21", fmtStr(vertReport.v21Full, vertReport.v21Extra));

    setTxt("shutterLock186", fmtStr(vertReport.v186Full, vertReport.v186Extra));
    setTxt("shutterLock21", fmtStr(vertReport.v21Full, vertReport.v21Extra));

    setTxt("shutterInterlock186", fmtStr(vertReport.v186Full, vertReport.v186Extra));
    setTxt("shutterInterlock21", fmtStr(vertReport.v21Full, vertReport.v21Extra));

    setTxt("outerTop186", "-");
    setTxt("outerTop21", fmtStr(outerWidthReport.fullPcs, outerWidthReport.extraFt));

    setTxt("outerBottom186", "-");
    setTxt("outerBottom21", fmtStr(outerWidthReport.fullPcs, outerWidthReport.extraFt));

    setTxt("shutterTop186", "-");
    setTxt("shutterTop21", fmtStr(shutterWidthReport.fullPcs, shutterWidthReport.extraFt));

    setTxt("shutterBottom186", "-");
    setTxt("shutterBottom21", fmtStr(shutterWidthReport.fullPcs, shutterWidthReport.extraFt));
}

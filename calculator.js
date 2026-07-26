// =====================================
// MATERIAL CALCULATOR & CUTTING OPTIMIZER
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
            w: parseFloat(document.getElementById(wId)?.value) || 0, // inch
            h: parseFloat(document.getElementById(hId)?.value) || 0, // inch
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

    // 2. Material Details Total Feet
    let totalOuterSide = 0, totalOuterTop = 0, totalOuterBottom = 0;
    let totalShutterLock = 0, totalShutterInterlock = 0;
    let totalShutterTop = 0, totalShutterBottom = 0;
    let totalGlass = 0;

    // Arrays to collect every single cut length in inches for optimization
    let heightCutsList = []; // For Outer Side, Lock, Interlock

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

            // Each window has 2 height cuts per piece
            for (let i = 0; i < win.q * 2; i++) {
                heightCutsList.push(win.h);
            }
        }
    });

    let grandTotalAluminium = totalOuterSide + totalOuterTop + totalOuterBottom +
                            totalShutterLock + totalShutterInterlock +
                            totalShutterTop + totalShutterBottom;

    // 3. Optimization Logic for Height Items (Outer Side, Lock, Interlock)
    // 18.6 ft = 223.2 inch, 21 ft = 252 inch
    function optimizeVerticalCuts(cuts) {
        if (cuts.length === 0) return { bar186: 0, bar21: 0, extraFt186: 0, extraFt21: 0 };

        // Sort cuts largest to smallest
        let sortedCuts = [...cuts].sort((a, b) => b - a);

        let bars186Count = 0;
        let bars21Count = 0;

        let remainingPieces = [...sortedCuts];

        // First try to fit in 18.6 ft bars (223.2 inches)
        let fitInBar = (barSize) => {
            let usedBars = 0;
            let tempPieces = [...remainingPieces];
            let remainingAfter = [];

            while (tempPieces.length > 0) {
                let currentBarSpace = barSize;
                let usedInThisBar = false;
                let nextTemp = [];

                for (let piece of tempPieces) {
                    if (piece <= currentBarSpace) {
                        currentBarSpace -= piece;
                        usedInThisBar = true;
                    } else {
                        nextTemp.push(piece);
                    }
                }

                if (usedInThisBar) {
                    usedBars++;
                    tempPieces = nextTemp;
                } else {
                    break;
                }
            }
            return { usedBars, remainingUncut: tempPieces };
        };

        // Decide whether 18.6ft or 21ft gives better utilization
        let cuts186 = [];
        let cuts21 = [];

        sortedCuts.forEach(cut => {
            // If piece size itself is <= 54 inch (4.5 ft) or <= 60 inch, prefer 18.6 ft bar logic
            if (cut <= 54) {
                cuts186.push(cut);
            } else {
                cuts21.push(cut);
            }
        });

        let opt186 = fitInBarHelper(cuts186, 223.2);
        let opt21 = fitInBarHelper(cuts21, 252);

        return {
            bar186: opt186.bars,
            extraFt186: (opt186.remSpace / 12).toFixed(1),
            bar21: opt21.bars,
            extraFt21: (opt21.remSpace / 12).toFixed(1)
        };
    }

    function fitInBarHelper(pieces, maxBarLen) {
        if (pieces.length === 0) return { bars: 0, remSpace: 0 };
        let bars = [];

        pieces.forEach(p => {
            let fitted = false;
            for (let i = 0; i < bars.length; i++) {
                if (bars[i] >= p) {
                    bars[i] -= p;
                    fitted = true;
                    break;
                }
            }
            if (!fitted) {
                bars.push(maxBarLen - p);
            }
        });

        let totalRemSpace = bars.reduce((a, b) => a + b, 0);
        return { bars: bars.length, remSpace: totalRemSpace };
    }

    let vertReport = optimizeVerticalCuts(heightCutsList);

    // 4. Horizontal Items (Outer Top, Bottom, Shutter Top, Bottom) - Always 21 FT Bar
    let calcHorizontalBar = (totalFt) => {
        if (totalFt <= 0) return "-";
        let pcs = Math.floor(totalFt / 21);
        let remFt = (totalFt % 21).toFixed(1);
        if (pcs > 0 && parseFloat(remFt) > 0) return `${pcs} Pcs + ${remFt} ft`;
        if (pcs > 0) return `${pcs} Pcs`;
        return `${remFt} ft`;
    };

    let formatVertRes = (pcs, extra) => {
        if (pcs === 0 && parseFloat(extra) === 0) return "-";
        if (pcs > 0 && parseFloat(extra) > 0) return `${pcs} Pcs + ${extra} ft`;
        if (pcs > 0) return `${pcs} Pcs`;
        return `${extra} ft`;
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

    // 5. Update UI
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

    // Cutting Report Outputs (Optimized)
    setTxt("outerTop186", "-");
    setTxt("outerTop21", calcHorizontalBar(totalOuterTop));

    setTxt("outerBottom186", "-");
    setTxt("outerBottom21", calcHorizontalBar(totalOuterBottom));

    setTxt("shutterTop186", "-");
    setTxt("shutterTop21", calcHorizontalBar(totalShutterTop));

    setTxt("shutterBottom186", "-");
    setTxt("shutterBottom21", calcHorizontalBar(totalShutterBottom));

    setTxt("outerSide186", formatVertRes(vertReport.bar186, vertReport.extraFt186));
    setTxt("outerSide21", formatVertRes(vertReport.bar21, vertReport.extraFt21));

    setTxt("shutterLock186", formatVertRes(vertReport.bar186, vertReport.extraFt186));
    setTxt("shutterLock21", formatVertRes(vertReport.bar21, vertReport.extraFt21));

    setTxt("shutterInterlock186", formatVertRes(vertReport.bar186, vertReport.extraFt186));
    setTxt("shutterInterlock21", formatVertRes(vertReport.bar21, vertReport.extraFt21));
}

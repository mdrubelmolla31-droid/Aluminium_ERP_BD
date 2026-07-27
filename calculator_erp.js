// ============================================
// CALCULATOR & CUTTING ENGINE (ERP Phase 1 & 3)
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    loadMasterDropdowns();
});

function loadMasterDropdowns() {
    let masterData = JSON.parse(localStorage.getItem("masterDataERP")) || {};
    
    let fields = [
        "aluCompany", "aluSeries", "aluColour", "aluThickness",
        "glassCompany", "glassThickness", "glassColour",
        "hwBrand", "lockBrand"
    ];

    fields.forEach(field => {
        let select = document.getElementById(field);
        if (select) {
            select.innerHTML = `<option value="">Select</option>`;
            if (masterData[field]) {
                masterData[field].forEach(item => {
                    select.innerHTML += `<option value="${item}">${item}</option>`;
                });
            }
        }
    });
}

function calculateAllERP() {
    let h = parseFloat(document.getElementById("height").value) || 0;
    let w = parseFloat(document.getElementById("width").value) || 0;
    let q = parseInt(document.getElementById("qty").value) || 1;

    if (h === 0 || w === 0) {
        alert("উচ্চতা এবং চওড়ার সঠিক মাপ দিন!");
        return;
    }

    // Measure Formulations
    let outerSide = ((h * 2) / 12) * q;
    let outerTop = (w / 12) * q;
    let outerBottom = (w / 12) * q;

    let shutterH = Math.max(0, h - 1.5);
    let shutterW = Math.max(0, (w / 2) + 0.5);

    let shutterLock = ((shutterH * 2) / 12) * q;
    let interlock = ((shutterH * 2) / 12) * q;
    let cBox = (shutterW / 12) * q;
    let bottomBeat = (shutterW / 12) * q;
    let fixedTop = (w / 12) * q;
    let fixedBottom = (w / 12) * q;

    let glassArea = ((h * w) / 144) * q;
    let rubber = (shutterH + shutterW) * 4 * q / 12; // Perimeter rubber
    let screw = q * 32; // Standard 32 screws per window

    let totalAlu = outerSide + outerTop + outerBottom + shutterLock + interlock + cBox + bottomBeat + fixedTop + fixedBottom;

    // Output UI
    setTxt("resOuterSide", outerSide.toFixed(2) + " ft");
    setTxt("resOuterTop", outerTop.toFixed(2) + " ft");
    setTxt("resOuterBottom", outerBottom.toFixed(2) + " ft");
    setTxt("resShutterLock", shutterLock.toFixed(2) + " ft");
    setTxt("resInterlock", interlock.toFixed(2) + " ft");
    setTxt("resCBox", cBox.toFixed(2) + " ft");
    setTxt("resBottomBeat", bottomBeat.toFixed(2) + " ft");
    setTxt("resFixedTop", fixedTop.toFixed(2) + " ft");
    setTxt("resFixedBottom", fixedBottom.toFixed(2) + " ft");
    setTxt("resRubber", rubber.toFixed(2) + " Rft");
    setTxt("resScrew", screw + " Pcs");
    setTxt("resGlassArea", glassArea.toFixed(2) + " Sqft");
    setTxt("resTotalAlu", totalAlu.toFixed(2) + " ft");

    // Standard Rates Computation
    let aluRate = 220; 
    let glassRate = 110;
    let labourRate = 25;
    let profitPercent = 15;

    let matCost = (totalAlu * aluRate) + (glassArea * glassRate);
    let labour = glassArea * labourRate;
    let profit = ((matCost + labour) * profitPercent) / 100;
    let sellingPrice = matCost + labour + profit;
    let costPerSqft = glassArea > 0 ? (sellingPrice / glassArea) : 0;

    setTxt("resMatCost", matCost.toFixed(2) + " ৳");
    setTxt("resLabour", labour.toFixed(2) + " ৳");
    setTxt("resProfit", profit.toFixed(2) + " ৳");
    setTxt("resSellingPrice", sellingPrice.toFixed(2) + " ৳");
    setTxt("resCostSqft", costPerSqft.toFixed(2) + " ৳");

    // Cutting Report Generator
    renderCuttingReport({
        "Outer Side": Array(q * 2).fill(h),
        "Outer Top": Array(q).fill(w),
        "Outer Bottom": Array(q).fill(w),
        "Shutter Lock": Array(q * 2).fill(shutterH),
        "Shutter Interlock": Array(q * 2).fill(shutterH),
        "Shutter Top/Bottom Beat": Array(q * 4).fill(shutterW)
    });
}

function renderCuttingReport(items) {
    let tbody = document.getElementById("cuttingBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    const BAR_186 = 18.6 * 12; // 223.2 Inches

    for (let item in items) {
        let cuts = [...items[item]].sort((a, b) => b - a);
        let bars = [];

        cuts.forEach(piece => {
            let placed = false;
            for (let i = 0; i < bars.length; i++) {
                if (bars[i] >= piece) {
                    bars[i] -= piece;
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                bars.push(BAR_186 - piece);
            }
        });

        let offcuts = bars.map(b => b.toFixed(1) + "″").join(", ");

        tbody.innerHTML += `<tr>
            <td><b>${item}</b></td>
            <td>${bars.length} পিস</td>
            <td>0 পিস</td>
            <td style="color:#d97706; font-weight:bold;">${offcuts}</td>
        </tr>`;
    }
}

function setTxt(id, val) {
    let el = document.getElementById(id);
    if (el) el.innerText = val;
}

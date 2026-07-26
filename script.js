// গ্লোবাল ভ্যারিয়েবল (সেটিংসের রেট ধরে রাখার জন্য)
let currentRates = {
    aluRate: 160,
    glassRate: 110,
    hardwareRate: 25,
    fittingsRate: 25,
    labourRate: 15,
    profitPercent: 0
};

// ড্রপডাউন পরিবর্তন হলেই রেট সেটিংস থেকে রেট খুঁজে নিবে
function autoFillRates() {
    let company = document.getElementById('company').value;
    let series = document.getElementById('series').value;
    let aluThick = document.getElementById('aluThickness').value;
    let aluColour = document.getElementById('aluColour').value;
    let glassCo = document.getElementById('glassCompany').value;
    let glassThick = document.getElementById('glassThickness').value;
    let glassColour = document.getElementById('glassColour').value;

    let savedRates = JSON.parse(localStorage.getItem("erp_rates") || "[]");

    // মেলানো রেট খুঁজে বের করা
    let matched = savedRates.find(item => {
        return (!company || item.company === company) &&
               (!series || item.series === series) &&
               (!aluThick || item.aluThickness === aluThick) &&
               (!aluColour || item.aluColour === aluColour) &&
               (!glassCo || item.glassCompany === glassCo) &&
               (!glassThick || item.glassThickness === glassThick) &&
               (!glassColour || item.glassColour === glassColour);
    });

    if (matched) {
        currentRates.aluRate = parseFloat(matched.aluRate) || 0;
        currentRates.glassRate = parseFloat(matched.glassRate) || 0;
        currentRates.hardwareRate = parseFloat(matched.hardwareRate) || 0;
        currentRates.fittingsRate = parseFloat(matched.fittingsRate) || 0;
        currentRates.labourRate = parseFloat(matched.labourRate) || 0;
        currentRates.profitPercent = parseFloat(matched.profit) || 0;
    }
}

function calculateMaterial() {
    // প্রতিবার ক্যালকুলেশনে সেভ হওয়া রেট নিশ্চিত করা
    autoFillRates();

    let heights = document.querySelectorAll('.w-height');
    let widths = document.querySelectorAll('.w-width');
    let qtys = document.querySelectorAll('.w-qty');

    let itemMeasurements = {
        "Outer Side": [],
        "Outer Top": [],
        "Outer Bottom": [],
        "Shutter Lock": [],
        "Shutter Interlock": [],
        "Shutter Top": [],
        "Shutter Bottom": []
    };

    let totalAreaSqft = 0;

    for (let i = 0; i < heights.length; i++) {
        let h = parseFloat(heights[i].value) || 0;
        let w = parseFloat(widths[i].value) || 0;
        let q = parseFloat(qtys[i].value) || 0;

        if (h > 0 && w > 0 && q > 0) {
            let sideLen = h;
            let topBottomLen = w;
            let shutterHeight = Math.max(0, h - 1.5);
            let shutterWidth = Math.max(0, (w / 2) + 0.5);

            for (let k = 0; k < q; k++) {
                itemMeasurements["Outer Side"].push(sideLen, sideLen);
                itemMeasurements["Outer Top"].push(topBottomLen);
                itemMeasurements["Outer Bottom"].push(topBottomLen);

                itemMeasurements["Shutter Lock"].push(shutterHeight, shutterHeight);
                itemMeasurements["Shutter Interlock"].push(shutterHeight, shutterHeight);
                itemMeasurements["Shutter Top"].push(shutterWidth, shutterWidth);
                itemMeasurements["Shutter Bottom"].push(shutterWidth, shutterWidth);
            }

            totalAreaSqft += ((h * w) / 144) * q;
        }
    }

    let sumInches = (arr) => arr.reduce((a, b) => a + b, 0);

    let outerSideFt = sumInches(itemMeasurements["Outer Side"]) / 12;
    let outerTopFt = sumInches(itemMeasurements["Outer Top"]) / 12;
    let outerBottomFt = sumInches(itemMeasurements["Outer Bottom"]) / 12;
    let shutterLockFt = sumInches(itemMeasurements["Shutter Lock"]) / 12;
    let shutterInterlockFt = sumInches(itemMeasurements["Shutter Interlock"]) / 12;
    let shutterTopFt = sumInches(itemMeasurements["Shutter Top"]) / 12;
    let shutterBottomFt = sumInches(itemMeasurements["Shutter Bottom"]) / 12;

    let totalAluFt = outerSideFt + outerTopFt + outerBottomFt + shutterLockFt + shutterInterlockFt + shutterTopFt + shutterBottomFt;

    // UI আপডেট
    document.getElementById('resOuterSide').innerText = outerSideFt.toFixed(2) + " ft";
    document.getElementById('resOuterTop').innerText = outerTopFt.toFixed(2) + " ft";
    document.getElementById('resOuterBottom').innerText = outerBottomFt.toFixed(2) + " ft";
    document.getElementById('resShutterLock').innerText = shutterLockFt.toFixed(2) + " ft";
    document.getElementById('resShutterInterlock').innerText = shutterInterlockFt.toFixed(2) + " ft";
    document.getElementById('resShutterTop').innerText = shutterTopFt.toFixed(2) + " ft";
    document.getElementById('resShutterBottom').innerText = shutterBottomFt.toFixed(2) + " ft";
    document.getElementById('resTotalAlu').innerText = totalAluFt.toFixed(2) + " ft";
    document.getElementById('resGlassTotal').innerText = totalAreaSqft.toFixed(2) + " Sqft";

    // 💡 রেট সেটিংসের সেভ হওয়া ভ্যালু থেকে হিসাব
    let aluPrice = totalAluFt * currentRates.aluRate; 
    let glassPrice = totalAreaSqft * currentRates.glassRate;
    let hardware = totalAreaSqft * currentRates.hardwareRate;
    let fittings = totalAreaSqft * currentRates.fittingsRate;
    let labour = totalAreaSqft * currentRates.labourRate;

    let totalCost = aluPrice + glassPrice + hardware + fittings + labour;
    let costPerSqft = totalAreaSqft > 0 ? totalCost / totalAreaSqft : 0;
    
    // প্রফিট % অনুযায়ী লাভ হিসাব
    let profitAmount = (costPerSqft * currentRates.profitPercent) / 100;
    let sellingSqft = costPerSqft + profitAmount;
    let sellingTotal = sellingSqft * totalAreaSqft;

    document.getElementById('resHardware').innerText = hardware.toFixed(2) + " ৳";
    document.getElementById('resFittings').innerText = fittings.toFixed(2) + " ৳";
    document.getElementById('resLabour').innerText = labour.toFixed(2) + " ৳";
    document.getElementById('resCostTotal').innerText = totalCost.toFixed(2) + " ৳";
    document.getElementById('resCostSqft').innerText = costPerSqft.toFixed(2) + " ৳";
    document.getElementById('resProfitSqft').innerText = profitAmount.toFixed(2) + " ৳";
    document.getElementById('resSellSqft').innerText = sellingSqft.toFixed(2) + " ৳";
    document.getElementById('resSellTotal').innerText = sellingTotal.toFixed(2) + " ৳";

    generateCuttingReport(itemMeasurements);
}

function generateCuttingReport(itemMeasurements) {
    let tbody = document.getElementById('cuttingReportBody');
    tbody.innerHTML = '';

    const BAR_186_INCH = 18.6 * 12;

    for (let itemName in itemMeasurements) {
        let cuts = itemMeasurements[itemName].slice();

        if (cuts.length === 0) {
            appendReportRow(tbody, itemName, 0, 0, "0 in");
            continue;
        }

        cuts.sort((a, b) => b - a);

        let barCount186 = 0;
        let totalOffcutInches = 0;
        let currentBarFreeSpace = 0;

        cuts.forEach(piece => {
            if (piece <= currentBarFreeSpace) {
                currentBarFreeSpace -= piece;
            } else {
                if (currentBarFreeSpace > 0) {
                    totalOffcutInches += currentBarFreeSpace;
                }
                barCount186++;
                currentBarFreeSpace = BAR_186_INCH - piece;
            }
        });

        totalOffcutInches += currentBarFreeSpace;

        appendReportRow(tbody, itemName, barCount186, 0, totalOffcutInches.toFixed(1) + " in");
    }
}

function appendReportRow(tbody, name, b18, b21, offcut) {
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${name}</td>
        <td>${b18}</td>
        <td>${b21}</td>
        <td style="color: #d97706; font-weight: bold;">${offcut}</td>
    `;
    tbody.appendChild(tr);
}

function calculateMaterial() {
    let heights = document.querySelectorAll('.w-height');
    let widths = document.querySelectorAll('.w-width');
    let qtys = document.querySelectorAll('.w-qty');

    // ইনভেন্টরি টুকরো লিস্ট ট্র্যাকিংয়ের জন্য
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
            // ১টি জানালার জন্য প্রতিটি পার্টসের সাইজ (ইনচিতে)
            let sideLen = h;
            let topBottomLen = w;

            // ২-পাল্লার থাই জানালার শাটার মাপের সাধারণ স্ট্যান্ডার্ড
            let shutterHeight = Math.max(0, h - 1.5);
            let shutterWidth = Math.max(0, (w / 2) + 0.5);

            for (let k = 0; k < q; k++) {
                // ২ পাশ
                itemMeasurements["Outer Side"].push(sideLen, sideLen);
                itemMeasurements["Outer Top"].push(topBottomLen);
                itemMeasurements["Outer Bottom"].push(topBottomLen);

                // শাটার (২ টি পাল্লা)
                itemMeasurements["Shutter Lock"].push(shutterHeight, shutterHeight);
                itemMeasurements["Shutter Interlock"].push(shutterHeight, shutterHeight);
                itemMeasurements["Shutter Top"].push(shutterWidth, shutterWidth);
                itemMeasurements["Shutter Bottom"].push(shutterWidth, shutterWidth);
            }

            // মোট স্কয়ার ফিট হিসাব
            totalAreaSqft += ((h * w) / 144) * q;
        }
    }

    // প্রতি আইটেমের মোট দৈর্ঘ্য (ফুট)
    let sumInches = (arr) => arr.reduce((a, b) => a + b, 0);

    let outerSideFt = sumInches(itemMeasurements["Outer Side"]) / 12;
    let outerTopFt = sumInches(itemMeasurements["Outer Top"]) / 12;
    let outerBottomFt = sumInches(itemMeasurements["Outer Bottom"]) / 12;
    let shutterLockFt = sumInches(itemMeasurements["Shutter Lock"]) / 12;
    let shutterInterlockFt = sumInches(itemMeasurements["Shutter Interlock"]) / 12;
    let shutterTopFt = sumInches(itemMeasurements["Shutter Top"]) / 12;
    let shutterBottomFt = sumInches(itemMeasurements["Shutter Bottom"]) / 12;

    let totalAluFt = outerSideFt + outerTopFt + outerBottomFt + shutterLockFt + shutterInterlockFt + shutterTopFt + shutterBottomFt;

    // UI রেজাল্ট আপডেট
    document.getElementById('resOuterSide').innerText = outerSideFt.toFixed(2) + " ft";
    document.getElementById('resOuterTop').innerText = outerTopFt.toFixed(2) + " ft";
    document.getElementById('resOuterBottom').innerText = outerBottomFt.toFixed(2) + " ft";
    document.getElementById('resShutterLock').innerText = shutterLockFt.toFixed(2) + " ft";
    document.getElementById('resShutterInterlock').innerText = shutterInterlockFt.toFixed(2) + " ft";
    document.getElementById('resShutterTop').innerText = shutterTopFt.toFixed(2) + " ft";
    document.getElementById('resShutterBottom').innerText = shutterBottomFt.toFixed(2) + " ft";
    document.getElementById('resTotalAlu').innerText = totalAluFt.toFixed(2) + " ft";
    document.getElementById('resGlassTotal').innerText = totalAreaSqft.toFixed(2) + " Sqft";

    // দাম ও বাজেট হিসাব (স্ট্যান্ডার্ড রেট)
    let aluPrice = totalAluFt * 160; 
    let glassPrice = totalAreaSqft * 110;
    let hardware = totalAreaSqft * 25;
    let fittings = totalAreaSqft * 25;
    let labour = totalAreaSqft * 15;

    let totalCost = aluPrice + glassPrice + hardware + fittings + labour;
    let costPerSqft = totalAreaSqft > 0 ? totalCost / totalAreaSqft : 0;
    let profitPerSqft = 35;
    let sellingSqft = costPerSqft + profitPerSqft;
    let sellingTotal = sellingSqft * totalAreaSqft;

    document.getElementById('resHardware').innerText = hardware.toFixed(2) + " ৳";
    document.getElementById('resFittings').innerText = fittings.toFixed(2) + " ৳";
    document.getElementById('resLabour').innerText = labour.toFixed(2) + " ৳";
    document.getElementById('resCostTotal').innerText = totalCost.toFixed(2) + " ৳";
    document.getElementById('resCostSqft').innerText = costPerSqft.toFixed(2) + " ৳";
    document.getElementById('resProfitSqft').innerText = profitPerSqft.toFixed(2) + " ৳";
    document.getElementById('resSellSqft').innerText = sellingSqft.toFixed(2) + " ৳";
    document.getElementById('resSellTotal').innerText = sellingTotal.toFixed(2) + " ৳";

    // কাটিং রিপোর্ট ও টুকরো মাল হিসাব
    generateCuttingReport(itemMeasurements);
}

// বার কাটিং ও টুকরো মালের নিখুঁত অ্যালগরিদম ( First Fit Decreasing )
function generateCuttingReport(itemMeasurements) {
    let tbody = document.getElementById('cuttingReportBody');
    tbody.innerHTML = '';

    const BAR_186_INCH = 18.6 * 12; // 223.2 Inches

    for (let itemName in itemMeasurements) {
        let cuts = itemMeasurements[itemName].slice(); // অ্যারে কপি

        if (cuts.length === 0) {
            appendReportRow(tbody, itemName, 0, 0, "0 in");
            continue;
        }

        // টুকরোগুলো বড় থেকে ছোট সাজানো
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

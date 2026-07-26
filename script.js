let currentRates = {
    aluRate: 160,
    glassRate: 110,
    hardwareRate: 25,
    fittingsRate: 25,
    labourRate: 15,
    profitPercent: 10
};

// ড্রপডাউন সিলেক্টের রেট লোড করার জন্য
function autoFillRates() {
    let company = document.getElementById('company').value;
    let series = document.getElementById('series').value;
    let aluThick = document.getElementById('aluThickness').value;
    let aluColour = document.getElementById('aluColour').value;
    let glassCo = document.getElementById('glassCompany').value;
    let glassThick = document.getElementById('glassThickness').value;
    let glassColour = document.getElementById('glassColour').value;

    let savedRates = JSON.parse(localStorage.getItem("erp_rates") || "[]");

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

// Calculate বাটনের কাজ
function calculateMaterial() {
    autoFillRates();

    let heights = document.querySelectorAll('.w-height');
    let widths = document.querySelectorAll('.w-width');
    let qtys = document.querySelectorAll('.w-qty');

    let totalOuterSide = 0;
    let totalOuterTop = 0;
    let totalOuterBottom = 0;
    let totalShutterLock = 0;
    let totalShutterInterlock = 0;
    let totalShutterTop = 0;
    let totalShutterBottom = 0;

    let totalAreaSqft = 0;

    for (let i = 0; i < heights.length; i++) {
        let h = parseFloat(heights[i].value) || 0;
        let w = parseFloat(widths[i].value) || 0;
        let q = parseFloat(qtys[i].value) || 0;

        if (h > 0 && w > 0 && q > 0) {
            let sideLen = h * 2 * q;
            let topLen = w * q;
            let bottomLen = w * q;
            
            let shutterH = Math.max(0, h - 1.5);
            let shutterW = Math.max(0, (w / 2) + 0.5);

            let sLock = shutterH * 2 * q;
            let sInterlock = shutterH * 2 * q;
            let sTop = shutterW * 2 * q;
            let sBottom = shutterW * 2 * q;

            totalOuterSide += sideLen;
            totalOuterTop += topLen;
            totalOuterBottom += bottomLen;
            totalShutterLock += sLock;
            totalShutterInterlock += sInterlock;
            totalShutterTop += sTop;
            totalShutterBottom += sBottom;

            totalAreaSqft += ((h * w) / 144) * q;
        }
    }

    // ইঞ্চি থেকে ফুট এ রূপান্তর
    let outerSideFt = totalOuterSide / 12;
    let outerTopFt = totalOuterTop / 12;
    let outerBottomFt = totalOuterBottom / 12;
    let shutterLockFt = totalShutterLock / 12;
    let shutterInterlockFt = totalShutterInterlock / 12;
    let shutterTopFt = totalShutterTop / 12;
    let shutterBottomFt = totalShutterBottom / 12;

    let totalAluFt = outerSideFt + outerTopFt + outerBottomFt + shutterLockFt + shutterInterlockFt + shutterTopFt + shutterBottomFt;

    // UI রেজাল্ট ফিল্ডে মান দেখানো
    document.getElementById('resOuterSide').innerText = outerSideFt.toFixed(2) + " ft";
    document.getElementById('resOuterTop').innerText = outerTopFt.toFixed(2) + " ft";
    document.getElementById('resOuterBottom').innerText = outerBottomFt.toFixed(2) + " ft";
    document.getElementById('resShutterLock').innerText = shutterLockFt.toFixed(2) + " ft";
    document.getElementById('resShutterInterlock').innerText = shutterInterlockFt.toFixed(2) + " ft";
    document.getElementById('resShutterTop').innerText = shutterTopFt.toFixed(2) + " ft";
    document.getElementById('resShutterBottom').innerText = shutterBottomFt.toFixed(2) + " ft";
    document.getElementById('resTotalAlu').innerText = totalAluFt.toFixed(2) + " ft";
    document.getElementById('resGlassTotal').innerText = totalAreaSqft.toFixed(2) + " Sqft";

    // প্রাইস হিসাব
    let aluPrice = totalAluFt * currentRates.aluRate; 
    let glassPrice = totalAreaSqft * currentRates.glassRate;
    let hardware = totalAreaSqft * currentRates.hardwareRate;
    let fittings = totalAreaSqft * currentRates.fittingsRate;
    let labour = totalAreaSqft * currentRates.labourRate;

    let totalCost = aluPrice + glassPrice + hardware + fittings + labour;
    let costPerSqft = totalAreaSqft > 0 ? totalCost / totalAreaSqft : 0;
    
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
}

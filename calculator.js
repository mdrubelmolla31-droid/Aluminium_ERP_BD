document.addEventListener("DOMContentLoaded", () => {
    loadMasterDataToCalculator();
});

function loadMasterDataToCalculator() {
    let data = JSON.parse(localStorage.getItem("masterData")) || {};

    function populateSelect(id, key) {
        let select = document.getElementById(id);
        if (!select) return;
        select.innerHTML = "";
        if (data[key]) {
            data[key].forEach(val => {
                let opt = document.createElement("option");
                opt.value = val;
                opt.textContent = val;
                select.appendChild(opt);
            });
        }
    }

    populateSelect("company", "company");
    populateSelect("series", "series");
    populateSelect("aluThickness", "aluThickness");
    populateSelect("glassCompany", "glassCompany");
    populateSelect("glassThickness", "glassThickness");
    populateSelect("glassColour", "glassColour");
}

function calculateMaterial() {
    let inputs = [
        { h: "height", w: "width", q: "qty" },
        { h: "height2", w: "width2", q: "qty2" },
        { h: "height3", w: "width3", q: "qty3" },
        { h: "height4", w: "width4", q: "qty4" },
        { h: "height5", w: "width5", q: "qty5" }
    ];

    let totalOuterSide = 0, totalOuterTop = 0, totalOuterBottom = 0;
    let totalShutterLock = 0, totalShutterInterlock = 0, totalShutterTop = 0, totalShutterBottom = 0;
    let totalGlassSqft = 0;

    inputs.forEach(item => {
        let hElem = document.getElementById(item.h);
        let wElem = document.getElementById(item.w);
        let qElem = document.getElementById(item.q);

        if (hElem && wElem && qElem) {
            let h = parseFloat(hElem.value) || 0;
            let w = parseFloat(wElem.value) || 0;
            let q = parseInt(qElem.value) || 0;

            if (h > 0 && w > 0 && q > 0) {
                totalOuterSide += ((h * 2) / 12) * q;
                totalOuterTop += (w / 12) * q;
                totalOuterBottom += (w / 12) * q;

                totalShutterLock += ((h * 2) / 12) * q;
                totalShutterInterlock += ((h * 2) / 12) * q;
                totalShutterTop += (w / 12) * q;
                totalShutterBottom += (w / 12) * q;

                totalGlassSqft += ((w * h) / 144) * q;
            }
        }
    });

    let totalAluFeet = totalOuterSide + totalOuterTop + totalOuterBottom + totalShutterLock + totalShutterInterlock + totalShutterTop + totalShutterBottom;

    // সেট করা রেট ফেচ করা (Settings Data)
    let rates = JSON.parse(localStorage.getItem("rates")) || [];
    let activeCompany = document.getElementById("company")?.value;
    let activeSeries = document.getElementById("series")?.value;

    let matchedRate = rates.find(r => r.company === activeCompany && r.series === activeSeries) || {
        aluRate: 0, glassRate: 0, hardwareRate: 40, fittingsRate: 30, labourRate: 20, profit: 0
    };

    let aluPrice = totalAluFeet * matchedRate.aluRate;
    let glassPrice = totalGlassSqft * matchedRate.glassRate;
    let hardwareCost = totalGlassSqft * matchedRate.hardwareRate;
    let fittingsCost = totalGlassSqft * matchedRate.fittingsRate;
    let labourCost = totalGlassSqft * matchedRate.labourRate;

    let materialCost = aluPrice + glassPrice + hardwareCost + fittingsCost + labourCost;
    let profitAmount = (materialCost * matchedRate.profit) / 100;
    let sellingPrice = materialCost + profitAmount;

    // রেজাল্ট আপডেট
    document.getElementById("outerSide").innerText = totalOuterSide.toFixed(2) + " ft";
    document.getElementById("outerTop").innerText = totalOuterTop.toFixed(2) + " ft";
    document.getElementById("outerBottom").innerText = totalOuterBottom.toFixed(2) + " ft";
    document.getElementById("shutterLock").innerText = totalShutterLock.toFixed(2) + " ft";
    document.getElementById("shutterInterlock").innerText = totalShutterInterlock.toFixed(2) + " ft";
    document.getElementById("shutterTop").innerText = totalShutterTop.toFixed(2) + " ft";
    document.getElementById("shutterBottom").innerText = totalShutterBottom.toFixed(2) + " ft";

    document.getElementById("totalAluminium").innerText = totalAluFeet.toFixed(2) + " ft";
    document.getElementById("glass").innerText = totalGlassSqft.toFixed(2) + " Sqft";

    document.getElementById("hardwareCost").innerText = hardwareCost.toFixed(2) + " ৳";
    document.getElementById("fittingsCost").innerText = fittingsCost.toFixed(2) + " ৳";
    document.getElementById("labourCost").innerText = labourCost.toFixed(2) + " ৳";
    document.getElementById("materialCost").innerText = materialCost.toFixed(2) + " ৳";

    if(totalGlassSqft > 0) {
        document.getElementById("materialSqft").innerText = (materialCost / totalGlassSqft).toFixed(2) + " ৳";
        document.getElementById("sellingSqft").innerText = (sellingPrice / totalGlassSqft).toFixed(2) + " ৳";
        document.getElementById("profitSqft").innerText = (profitAmount / totalGlassSqft).toFixed(2) + " ৳";
        document.getElementById("costPerSqft").innerText = (materialCost / totalGlassSqft).toFixed(2) + " ৳";
    }

    document.getElementById("sellingPrice").innerText = sellingPrice.toFixed(2) + " ৳";

    // বারের হিসাব (১৮.৬ এবং ২১ ফিট)
    document.getElementById("outerSide186").innerText = Math.ceil(totalOuterSide / 18.6);
    document.getElementById("outerSide21").innerText = Math.ceil(totalOuterSide / 21);
    document.getElementById("outerTop186").innerText = Math.ceil(totalOuterTop / 18.6);
    document.getElementById("outerTop21").innerText = Math.ceil(totalOuterTop / 21);
    document.getElementById("outerBottom186").innerText = Math.ceil(totalOuterBottom / 18.6);
    document.getElementById("outerBottom21").innerText = Math.ceil(totalOuterBottom / 21);
}

function openQuotation() {
    let quotationData = {
        customerName: document.getElementById("customerName")?.value || "",
        mobile: document.getElementById("mobile")?.value || "",
        address: document.getElementById("address")?.value || "",
        company: document.getElementById("company")?.value || "",
        series: document.getElementById("series")?.value || "",
        glass: document.getElementById("glass")?.innerText || "0",
        totalAluminium: document.getElementById("totalAluminium")?.innerText || "0",
        sellingPrice: document.getElementById("sellingPrice")?.innerText || "0 ৳",
        date: new Date().toLocaleDateString("bn-BD")
    };

    let list = JSON.parse(localStorage.getItem("quotationList")) || [];
    list.push(quotationData);
    localStorage.setItem("quotationList", JSON.stringify(list));

    window.location.href = "quotation.html";
}

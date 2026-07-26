// পেজ লোড হলে সেভ হওয়া ডাটা লোড করবে
document.addEventListener("DOMContentLoaded", function () {
    loadSavedRates();
});

// ১. মাস্টার ডাটা ড্রপডাউনে যুক্ত করার ফাংশন
function addMasterData(selectId, inputId) {
    let inputElem = document.getElementById(inputId);
    let selectElem = document.getElementById(selectId);

    let val = inputElem.value.trim();
    if (val === "") {
        alert("অনুগ্রহ করে সঠিক নাম লিখুন!");
        return;
    }

    let option = document.createElement("option");
    option.text = val;
    option.value = val;
    option.selected = true;
    selectElem.add(option);

    inputElem.value = "";
    alert(`${val} ড্রপডাউনে যোগ করা হয়েছে!`);
}

// ২. রেট সেভ করার ফাংশন
function saveSettings() {
    let rateData = {
        id: Date.now(),
        company: document.getElementById("company").value,
        series: document.getElementById("series").value,
        aluThickness: document.getElementById("aluThickness").value,
        aluColour: document.getElementById("aluColour").value,
        glassCompany: document.getElementById("glassCompany").value,
        glassThickness: document.getElementById("glassThickness").value,
        glassColour: document.getElementById("glassColour").value,
        aluRate: document.getElementById("aluRate").value || 0,
        glassRate: document.getElementById("glassRate").value || 0,
        hardwareRate: document.getElementById("hardwareRate").value || 0,
        fittingsRate: document.getElementById("fittingsRate").value || 0,
        labourRate: document.getElementById("labourRate").value || 0,
        profit: document.getElementById("profit").value || 0
    };

    if (!rateData.company || !rateData.series) {
        alert("কমপক্ষে Company এবং Series সিলেক্ট করুন!");
        return;
    }

    let rates = JSON.parse(localStorage.getItem("erp_rates") || "[]");
    rates.push(rateData);
    localStorage.setItem("erp_rates", JSON.stringify(rates));

    alert("রেট সফলভাবে সেভ করা হয়েছে!");
    loadSavedRates();
}

// ৩. সেভ করা ডাটা টেবিলে দেখানোর ফাংশন
function loadSavedRates() {
    let tbody = document.getElementById("rateBody");
    tbody.innerHTML = "";

    let rates = JSON.parse(localStorage.getItem("erp_rates") || "[]");

    if (rates.length === 0) {
        tbody.innerHTML = `<tr><td colspan="14" style="text-align:center; color:var(--text-muted);">কোনো সেভ করা রেট নেই</td></tr>`;
        return;
    }

    rates.forEach(item => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.company}</td>
            <td>${item.series}</td>
            <td>${item.aluThickness}</td>
            <td>${item.aluColour}</td>
            <td>${item.glassCompany}</td>
            <td>${item.glassThickness}</td>
            <td>${item.glassColour}</td>
            <td>৳${item.aluRate}</td>
            <td>৳${item.glassRate}</td>
            <td>৳${item.hardwareRate}</td>
            <td>৳${item.fittingsRate}</td>
            <td>৳${item.labourRate}</td>
            <td>${item.profit}%</td>
            <td><button class="btn-delete" onclick="deleteRate(${item.id})">🗑️</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// ৪. রেট ডিলেট করার ফাংশন
function deleteRate(id) {
    if (confirm("আপনি কি এই রেটটি মুছে ফেলতে চান?")) {
        let rates = JSON.parse(localStorage.getItem("erp_rates") || "[]");
        rates = rates.filter(item => item.id !== id);
        localStorage.setItem("erp_rates", JSON.stringify(rates));
        loadSavedRates();
    }
}

let rates = JSON.parse(localStorage.getItem("rates")) || [];

window.onload = function () {
    loadMasterData();
    loadRates();
};

function saveSettings() {
    let rate = {
        company: document.getElementById("company").value,
        series: document.getElementById("series").value,
        aluRate: Number(document.getElementById("aluRate").value) || 0,
        glassRate: Number(document.getElementById("glassRate").value) || 0,
        hardwareRate: Number(document.getElementById("hardwareRate").value) || 0,
        fittingsRate: Number(document.getElementById("fittingsRate").value) || 0,
        labourRate: Number(document.getElementById("labourRate").value) || 0,
        profit: Number(document.getElementById("profit").value) || 0
    };

    rates.push(rate);
    localStorage.setItem("rates", JSON.stringify(rates));
    loadRates();
    alert("Rate Saved Successfully!");
}

function loadRates() {
    rates = JSON.parse(localStorage.getItem("rates")) || [];
    let body = document.getElementById("rateBody");
    if (!body) return;
    body.innerHTML = "";
    rates.forEach((r, i) => {
        body.innerHTML += `<tr>
            <td>${r.company}</td>
            <td>${r.series}</td>
            <td>${r.aluRate}</td>
            <td>${r.glassRate}</td>
            <td>${r.hardwareRate}</td>
            <td>${r.profit}%</td>
            <td><button style="background:#ef4444" onclick="deleteRate(${i})">Delete</button></td>
        </tr>`;
    });
}

function deleteRate(index) {
    rates.splice(index, 1);
    localStorage.setItem("rates", JSON.stringify(rates));
    loadRates();
}

function addMaster(key, inputId) {
    let val = document.getElementById(inputId)?.value.trim();
    if (!val) return;
    let data = JSON.parse(localStorage.getItem("masterData")) || {};
    if (!data[key]) data[key] = [];
    if (!data[key].includes(val)) data[key].push(val);
    localStorage.setItem("masterData", JSON.stringify(data));
    loadMasterData();
    document.getElementById(inputId).value = "";
}

function loadMasterData() {
    let data = JSON.parse(localStorage.getItem("masterData")) || {};
    ["company", "series", "aluThickness"].forEach(key => {
        let select = document.getElementById(key);
        if (select && data[key]) {
            select.innerHTML = "";
            data[key].forEach(v => {
                select.innerHTML += `<option value="${v}">${v}</option>`;
            });
        }
    });
}

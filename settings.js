// ======================================
// SETTINGS.JS
// ======================================

let rates = JSON.parse(localStorage.getItem("rates")) || [];

window.onload = function () {
    loadMasterData();
    loadRates();
};

// ===============================
// SAVE RATE
// ===============================

function saveSettings() {
    let rate = {
        company: document.getElementById("company").value,
        series: document.getElementById("series").value,
        aluThickness: document.getElementById("aluThickness").value,
        aluColour: document.getElementById("aluColour").value,
        glassCompany: document.getElementById("glassCompany").value,
        glassThickness: document.getElementById("glassThickness").value,
        glassColour: document.getElementById("glassColour").value,

        aluRate: Number(document.getElementById("aluRate").value),
        glassRate: Number(document.getElementById("glassRate").value),
        hardwareRate: Number(document.getElementById("hardwareRate").value),
        fittingsRate: Number(document.getElementById("fittingsRate").value),
        labourRate: Number(document.getElementById("labourRate").value),
        profit: Number(document.getElementById("profit").value)
    };

    let index = rates.findIndex(r =>
        r.company === rate.company &&
        r.series === rate.series &&
        r.aluThickness === rate.aluThickness &&
        r.aluColour === rate.aluColour &&
        r.glassCompany === rate.glassCompany &&
        r.glassThickness === rate.glassThickness &&
        r.glassColour === rate.glassColour
    );

    if (index >= 0) {
        rates[index] = rate;
    } else {
        rates.push(rate);
    }

    localStorage.setItem("rates", JSON.stringify(rates));
    loadRates();
    alert("Rate Saved Successfully!");
}

// ===============================
// LOAD RATE LIST
// ===============================

function loadRates() {
    rates = JSON.parse(localStorage.getItem("rates")) || [];
    let body = document.getElementById("rateBody");
    if (!body) return;

    body.innerHTML = "";

    rates.forEach((r, i) => {
        body.innerHTML += `
            <tr>
                <td>${r.company}</td>
                <td>${r.series}</td>
                <td>${r.aluThickness}</td>
                <td>${r.aluColour || "-"}</td>
                <td>${r.glassCompany}</td>
                <td>${r.glassThickness}</td>
                <td>${r.glassColour}</td>
                <td>${r.aluRate}</td>
                <td>${r.glassRate}</td>
                <td>${r.hardwareRate}</td>
                <td>${r.fittingsRate}</td>
                <td>${r.labourRate}</td>
                <td>${r.profit}%</td>
                <td>
                    <button onclick="deleteRate(${i})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ===============================
// DELETE RATE
// ===============================

function deleteRate(index) {
    rates.splice(index, 1);
    localStorage.setItem("rates", JSON.stringify(rates));
    loadRates();
}

// ===============================
// MASTER DATA SAVE
// ===============================

function saveMaster(key, value) {
    let data = JSON.parse(localStorage.getItem("masterData")) || {};

    if (!data[key]) {
        data[key] = [];
    }

    if (!data[key].includes(value)) {
        data[key].push(value);
    }

    localStorage.setItem("masterData", JSON.stringify(data));
}

// ===============================
// GENERIC MASTER DATA ADD
// ===============================

function addMasterData(key, inputId) {
    let input = document.getElementById(inputId);
    if (!input) return;

    let v = input.value.trim();
    if (v === "") {
        alert("দয়া করে মান লিখুন!");
        return;
    }

    saveMaster(key, v);

    let select = document.getElementById(key);
    if (select) {
        let option = document.createElement("option");
        option.value = v;
        option.textContent = v;
        select.appendChild(option);
    }

    input.value = "";
    alert("Added Successfully!");
}

// ===============================
// SPECIFIC ADD FUNCTIONS
// ===============================

function addCompany() { addMasterData('company', 'newCompany'); }
function addSeries() { addMasterData('series', 'newSeries'); }
function addThickness() { addMasterData('aluThickness', 'newThickness'); }
function addGlassCompany() { addMasterData('glassCompany', 'newGlassCompany'); }
function addGlassColour() { addMasterData('glassColour', 'newGlassColour'); }

// ===============================
// LOAD MASTER DATA
// ===============================

function loadMasterData() {
    let data = JSON.parse(localStorage.getItem("masterData")) || {};

    function fill(id, key) {
        let select = document.getElementById(id);
        if (!select) return;

        if (data[key]) {
            data[key].forEach(v => {
                if (![...select.options].some(o => o.value === v)) {
                    let option = document.createElement("option");
                    option.value = v;
                    option.textContent = v;
                    select.appendChild(option);
                }
            });
        }
    }

    fill("company", "company");
    fill("series", "series");
    fill("aluThickness", "aluThickness");
    fill("aluColour", "aluColour");
    fill("glassCompany", "glassCompany");
    fill("glassColour", "glassColour");
    fill("glassThickness", "glassThickness");
}

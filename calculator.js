// ============================
// Material Calculator
// ============================

let rates = JSON.parse(localStorage.getItem("rates")) || [];

document.addEventListener("DOMContentLoaded", function () {

    loadDropdowns();

});

// ============================
// LOAD DROPDOWNS
// ============================

function loadDropdowns() {

    rates = JSON.parse(localStorage.getItem("rates")) || [];

    fillSelect("company", "company");
    fillSelect("series", "series");
    fillSelect("aluThickness", "aluThickness");
    fillSelect("glassCompany", "glassCompany");
    fillSelect("glassThickness", "glassThickness");
    fillSelect("glassColour", "glassColour");

}

function fillSelect(id, key) {

    let select = document.getElementById(id);

    select.innerHTML = '<option value="">Select</option>';

    let values = [...new Set(

        rates
        .map(r => r[key])
        .filter(v => v && v.trim() !== "")

    )];

    values.forEach(function (v) {

        let option = document.createElement("option");

        option.value = v;
        option.textContent = v;

        select.appendChild(option);

    });

}

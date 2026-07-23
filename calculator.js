//==================================
// MATERIAL CALCULATOR
//==================================

let rates = [];

//==================================
// PAGE LOAD
//==================================

document.addEventListener("DOMContentLoaded", function () {

    rates = JSON.parse(localStorage.getItem("rates")) || [];

    loadDropdowns();

});

//==================================
// LOAD DROPDOWNS
//==================================

function loadDropdowns() {

    fillSelect("company", "company");
    fillSelect("series", "series");
    fillSelect("aluThickness", "aluThickness");
    fillSelect("glassCompany", "glassCompany");
    fillSelect("glassThickness", "glassThickness");
    fillSelect("glassColour", "glassColour");

}

//==================================
// FILL SELECT
//==================================

function fillSelect(id, key) {

    let select = document.getElementById(id);

    if (!select) return;

    select.innerHTML = `<option value="">Select</option>`;

    let values = [...new Set(

        rates
            .map(r => r[key])
            .filter(v => v && v !== "")

    )];

    values.forEach(function (value) {

        let option = document.createElement("option");

        option.value = value;

        option.textContent = value;

        select.appendChild(option);

    });

}

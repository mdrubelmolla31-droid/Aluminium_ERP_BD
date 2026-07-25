// ======================================
// SETTINGS.JS
// PART-1
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
        r.glassCompany === rate.glassCompany &&
        r.glassThickness === rate.glassThickness &&
        r.glassColour === rate.glassColour

    );

    if(index >= 0){

        rates[index] = rate;

    }else{

        rates.push(rate);

    }

    localStorage.setItem("rates", JSON.stringify(rates));

    loadRates();

    alert("Rate Saved");

}
// ===============================
// LOAD RATE LIST
// ===============================

function loadRates() {

    rates = JSON.parse(localStorage.getItem("rates")) || [];

    let body = document.getElementById("rateBody");

    body.innerHTML = "";

    rates.forEach((r, i) => {

        body.innerHTML += `
<tr>
<td>${r.company}</td>
<td>${r.series}</td>
<td>${r.aluThickness}</td>
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

function saveMaster(key, value){

    let data = JSON.parse(localStorage.getItem("masterData")) || {};

    if(!data[key]){
        data[key] = [];
    }

    if(!data[key].includes(value)){
        data[key].push(value);
    }

    localStorage.setItem("masterData", JSON.stringify(data));

}

// ===============================
// ADD COMPANY
// ===============================

function addCompany(){

    let v = document.getElementById("newCompany").value.trim();

    if(v==""){
        alert("Company লিখুন");
        return;
    }

    saveMaster("company", v);

    document.getElementById("company").innerHTML += `<option>${v}</option>`;

    document.getElementById("newCompany").value = "";

    alert("Company Added");

}

// ===============================
// ADD SERIES
// ===============================

function addSeries(){

    let v = document.getElementById("newSeries").value.trim();

    if(v==""){
        alert("Series লিখুন");
        return;
    }

    saveMaster("series", v);

    document.getElementById("series").innerHTML += `<option>${v}</option>`;

    document.getElementById("newSeries").value = "";

    alert("Series Added");

}

// ===============================
// ADD ALUMINIUM THICKNESS
// ===============================

function addThickness(){

    let v = document.getElementById("newThickness").value.trim();

    if(v==""){
        alert("Thickness লিখুন");
        return;
    }

    saveMaster("aluThickness", v);

    document.getElementById("aluThickness").innerHTML += `<option>${v}</option>`;

    document.getElementById("newThickness").value = "";

    alert("Thickness Added");

}

// ===============================
// ADD GLASS COMPANY
// ===============================

function addGlassCompany(){

    let v = document.getElementById("newGlassCompany").value.trim();

    if(v==""){
        alert("Glass Company লিখুন");
        return;
    }

    saveMaster("glassCompany", v);

    document.getElementById("glassCompany").innerHTML += `<option>${v}</option>`;

    document.getElementById("newGlassCompany").value = "";

    alert("Glass Company Added");

}

// ===============================
// ADD GLASS COLOUR
// ===============================

function addGlassColour(){

    let v = document.getElementById("newGlassColour").value.trim();

    if(v==""){
        alert("Glass Colour লিখুন");
        return;
    }

    saveMaster("glassColour", v);

    document.getElementById("glassColour").innerHTML += `<option>${v}</option>`;

    document.getElementById("newGlassColour").value = "";

    alert("Glass Colour Added");

}

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
    fill("glassCompany", "glassCompany");
    fill("glassColour", "glassColour");
fill("glassThickness", "glassThickness");
    
}


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
    fill("glassCompany", "glassCompany");
    fill("glassColour", "glassColour");

}

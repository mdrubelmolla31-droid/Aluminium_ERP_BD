// =====================================
// DASHBOARD - SCRIPT
// =====================================

document.addEventListener("DOMContentLoaded", () => {
    loadDashboardData();
});

function loadDashboardData() {
    let quotations = JSON.parse(localStorage.getItem("quotationList")) || [];
    
    // সিঙ্গেল ড্রাফট কোটেশন থাকলে লিস্টে রূপান্তর
    let lastSingleQuotation = JSON.parse(localStorage.getItem("quotation"));
    if (lastSingleQuotation && quotations.length === 0) {
        quotations.push({
            date: new Date().toISOString().split('T')[0],
            customerName: lastSingleQuotation.customerName || "N/A",
            mobile: lastSingleQuotation.mobile || "N/A",
            company: lastSingleQuotation.company || "N/A",
            series: lastSingleQuotation.series || "N/A",
            price: parseFloat(lastSingleQuotation.sellingPrice) || 0,
            glassSqft: parseFloat(lastSingleQuotation.glass) || 0
        });
        localStorage.setItem("quotationList", JSON.stringify(quotations));
    }

    let totalQuotationCount = quotations.length;
    let totalSalesAmount = 0;
    let totalSqft = 0;

    let tbody = document.getElementById("quotationBody");
    if (tbody) tbody.innerHTML = "";

    quotations.forEach((q, index) => {
        let price = parseFloat(q.price) || 0;
        let sqft = parseFloat(q.glassSqft) || 0;

        totalSalesAmount += price;
        totalSqft += sqft;

        if (tbody) {
            let row = `<tr>
                <td>${q.date || 'N/A'}</td>
                <td>${q.customerName || 'N/A'}</td>
                <td>${q.mobile || 'N/A'}</td>
                <td>${q.company || 'N/A'}</td>
                <td>${q.series || 'N/A'}</td>
                <td>${price.toFixed(2)} ৳</td>
                <td>
                    <button style="background:#ef4444; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;" 
                            onclick="deleteQuotation(${index})">Delete</button>
                </td>
            </tr>`;
            tbody.innerHTML += row;
        }
    });

    let avgPerSqft = totalSqft > 0 ? (totalSalesAmount / totalSqft) : 0;

    setTxt("totalQuotation", totalQuotationCount);
    setTxt("totalSale", totalSalesAmount.toFixed(2) + " ৳");
    setTxt("avgSqft", avgPerSqft.toFixed(2) + " ৳");
}

function searchQuotation() {
    let input = document.getElementById("search")?.value.toLowerCase() || "";
    let tbody = document.getElementById("quotationBody");
    if (!tbody) return;

    let rows = tbody.getElementsByTagName("tr");
    for (let row of rows) {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    }
}

function deleteQuotation(index) {
    let quotations = JSON.parse(localStorage.getItem("quotationList")) || [];
    quotations.splice(index, 1);
    localStorage.setItem("quotationList", JSON.stringify(quotations));
    loadDashboardData();
}

function setTxt(id, val) {
    let el = document.getElementById(id);
    if (el) el.innerText = val;
}

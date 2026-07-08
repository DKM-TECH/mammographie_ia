document.addEventListener("DOMContentLoaded", () => {

    loadDoctor();
    loadDashboard();
    loadHistory();
    initLogout();
});

/* =========================
   DOCTOR INFO
========================= */
function loadDoctor() {

    const defaultDoctor = {
        name: "Médecin",
        specialty: "Oncologie",
        hospital: "CHU Kinshasa"
    };

    const doctor = JSON.parse(localStorage.getItem("doctor")) || defaultDoctor;

    document.getElementById("doctorName").textContent = doctor.name;
}

/* =========================
   DASHBOARD STATS (MOCK)
========================= */

function loadDashboard() {

    document.getElementById("patientsCount").textContent = 120;
    document.getElementById("diagnosisCount").textContent = 340;
    document.getElementById("suspectCount").textContent = 45;

    initCharts({
        labels: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
        values: [10, 20, 15, 30, 25],
        pie: [60, 25, 15]
    });
}

/* =========================
   HISTORY (MOCK)
========================= */

function loadHistory() {

    const data = [
        {
            patient: "Jean K.",
            exam: "IRM",
            result: "Suspect",
            confidence: 88,
            date: "2026-06-27"
        },
        {
            patient: "Marie L.",
            exam: "Scanner",
            result: "Normal",
            confidence: 95,
            date: "2026-06-26"
        }
    ];

    const table = document.getElementById("historyTable");
    table.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.patient}</td>
            <td>${item.exam}</td>
            <td>
                <span class="badge ${item.result === "Suspect" ? "bg-danger" : "bg-success"}">
                    ${item.result}
                </span>
            </td>
            <td>${item.confidence}%</td>
            <td>${item.date}</td>
        `;

        table.appendChild(row);
    });
}

/* =========================
   CHARTS
========================= */

let lineChart = null;
let pieChart = null;

function initCharts(chartData) {

    const ctxLine = document.getElementById("lineChart");
    const ctxPie = document.getElementById("pieChart");

    if (!ctxLine || !ctxPie) return;

    if (lineChart) lineChart.destroy();
    if (pieChart) pieChart.destroy();

    lineChart = new Chart(ctxLine, {
        type: "line",
        data: {
            labels: chartData.labels,
            datasets: [{
                label: "Diagnostics",
                data: chartData.values,
                borderColor: "#38bdf8",
                backgroundColor: "rgba(56,189,248,0.2)",
                fill: true,
                tension: 0.4
            }]
        }
    });

    pieChart = new Chart(ctxPie, {
        type: "doughnut",
        data: {
            labels: ["Normaux", "Suspects", "Critiques"],
            datasets: [{
                data: chartData.pie,
                backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"]
            }]
        }
    });
}

/* =========================
   LOGOUT (SIMPLE)
========================= */

function initLogout() {
    document.getElementById("logout").addEventListener("click", (e) => {
        e.preventDefault();

        localStorage.removeItem("doctor");

        window.location.href = "index.html";
    });
}
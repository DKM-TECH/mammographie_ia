document.addEventListener("DOMContentLoaded", () => {
    loadPatients();
});

/* =========================
   LOAD PATIENTS
========================= */

function loadPatients() {

    // 🔥 MOCK DATA (remplaçable par API FastAPI)
    const patients = [
        {
            name: "Jean K.",
            age: 54,
            sex: "M",
            diagnosis: "Suspect",
            date: "2026-06-25"
        },
        {
            name: "Marie L.",
            age: 47,
            sex: "F",
            diagnosis: "Normal",
            date: "2026-06-24"
        },
        {
            name: "Paul M.",
            age: 61,
            sex: "M",
            diagnosis: "Critique",
            date: "2026-06-23"
        }
    ];

    const table = document.getElementById("patientsTable");
    table.innerHTML = "";

    patients.forEach(p => {

        const badge =
            p.diagnosis === "Suspect"
                ? "bg-warning"
                : p.diagnosis === "Critique"
                ? "bg-danger"
                : "bg-success";

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.sex}</td>
            <td>
                <span class="badge ${badge}">
                    ${p.diagnosis}
                </span>
            </td>
            <td>${p.date}</td>
            <td>
                <button class="btn btn-sm btn-primary">
                    Voir
                </button>
                <button class="btn btn-sm btn-danger">
                    Supprimer
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}
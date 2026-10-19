// Sample participant data (In production, this can fetch from a JSON API or RideWithGPS club export)
const participants = [
    { name: "Ken Poland", outdoorKm: 320, indoorKm: 45, refunded: 10, forfeited: 0, balance: 120, audax: false },
    { name: "Participant 2", outdoorKm: 280, indoorKm: 60, refunded: 5, forfeited: 5, balance: 120, audax: false },
    { name: "Participant 3", outdoorKm: 140, indoorKm: 20, refunded: 0, forfeited: 10, balance: 120, audax: false },
    { name: "Participant 4", outdoorKm: 450, indoorKm: 0, refunded: 10, forfeited: 0, balance: 120, audax: false }
];

function renderDashboard() {
    const tableBody = document.getElementById("table-body");
    const visualBars = document.getElementById("visual-bars");
    
    tableBody.innerHTML = "";
    visualBars.innerHTML = "";

    let totalRefundsSum = 0;
    let totalForfeitedSum = 0;

    participants.forEach(p => {
        totalRefundsSum += p.refunded;
        totalForfeitedSum += p.forfeited;

        // Populate Table
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${p.name}</strong></td>
            <td>${p.outdoorKm} km</td>
            <td style="color: #6c757d;">${p.indoorKm} km</td>
            <td>€${p.refunded}</td>
            <td>€${p.forfeited}</td>
            <td><strong>€${p.balance}</strong></td>
            <td>${p.audax ? '✅' : '❌'}</td>
        `;
        tableBody.appendChild(row);

        // Populate Side-by-Side Visual Progress Bars
        const maxTarget = 600; // Monthly target benchmark
        const percentage = Math.min(Math.round((p.outdoorKm / maxTarget) * 100), 100);

        const barWrapper = document.createElement("div");
        barWrapper.className = "bar-row";
        barWrapper.innerHTML = `
            <div class="bar-label">
                <span>${p.name}</span>
                <span>${p.outdoorKm} km / ${maxTarget} km (${percentage}%)</span>
            </div>
            <div class="bar-track">
                <div class="bar-fill" style="width: ${percentage}%;">${percentage}%</div>
            </div>
        `;
        visualBars.appendChild(barWrapper);
    });

    // Update Pot Banner
    document.getElementById("total-pool").innerText = `€${participants.length * 130}`;
    document.getElementById("total-refunds").innerText = `€${totalRefundsSum}`;
    document.getElementById("final-pot").innerText = `€${totalForfeitedSum}`;
}

// Initialize on load
document.addEventListener("DOMContentLoaded", renderDashboard);
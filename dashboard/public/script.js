async function loadDashboard() {

    try {
        const response = await fetch("/api/system");
        const data = await response.json();

        // CPU
        document.getElementById("cpu").innerHTML = `
            <p><strong>Architecture:</strong> ${data.cpu.architecture}</p>
            <p><strong>Model:</strong> ${data.cpu.model}</p>
            <p><strong>Logical CPUs:</strong> ${data.cpu.cpus}</p>
            <p><strong>Physical Cores:</strong> ${data.cpu.cores}</p>
            <p><strong>Threads/Core:</strong> ${data.cpu.threadsPerCore}</p>
        `;

        // Memory
        document.getElementById("memory").innerHTML = `
            <p><strong>Total:</strong> ${data.memory.total}</p>
            <p><strong>Used:</strong> ${data.memory.used}</p>
            <p><strong>Free:</strong> ${data.memory.free}</p>
            <p><strong>Available:</strong> ${data.memory.available}</p>
        `;

        // Processes
        const processTable = document.getElementById("processes");
        processTable.innerHTML = "";

        data.processes.forEach(process => {
            processTable.innerHTML += `
                <tr>
                    <td>${process.pid}</td>
                    <td>${process.name}</td>
                    <td>${process.state}</td>
                    <td>${process.cpu}</td>
                    <td>${process.memory}</td>
                </tr>
            `;
        });

        // Locality
        const localityTable = document.getElementById("locality");
        localityTable.innerHTML = "";

        data.locality.forEach(result => {

            const isMean = result.run === "mean";

            localityTable.innerHTML += `
                <tr class="${isMean ? "mean-row" : ""}">
                    <td>${result.run}</td>
                    <td>${result.rowMajor}</td>
                    <td>${result.columnMajor}</td>
                    <td>${result.ratio}×</td>
                </tr>
            `;
        });

        // Locality summary
        const mean = data.locality.find(result => result.run === "mean");

        if (mean) {
            document.getElementById("locality-summary").innerHTML = `
                <div class="locality-summary">
                    <strong>Mean comparison:</strong>
                    Row-major ${mean.rowMajor}s vs
                    Column-major ${mean.columnMajor}s
                    — ${mean.ratio}× ratio
                </div>
            `;

            const rowTime = parseFloat(mean.rowMajor);
            const columnTime = parseFloat(mean.columnMajor);

            const maxTime = Math.max(rowTime, columnTime);

            document.getElementById("row-bar").style.width =
                `${(rowTime / maxTime) * 100}%`;

            document.getElementById("column-bar").style.width =
                `${(columnTime / maxTime) * 100}%`;

            document.getElementById("row-time").textContent =
                `${mean.rowMajor}s`;

            document.getElementById("column-time").textContent =
                `${mean.columnMajor}s`;
        }

        document.getElementById("updated").textContent =
            "Last updated: " + new Date().toLocaleTimeString();

    } catch (error) {
        console.error("Dashboard error:", error);
    }
}

document.getElementById("refreshBtn").addEventListener(
    "click",
    loadDashboard
);

loadDashboard();


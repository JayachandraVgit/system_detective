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
            localityTable.innerHTML += `
                <tr>
                    <td>${result.run}</td>
                    <td>${result.rowMajor}</td>
                    <td>${result.columnMajor}</td>
                    <td>${result.ratio}×</td>
                </tr>
            `;
        });

        document.getElementById("updated").textContent =
            "Last updated: " + new Date().toLocaleTimeString();

    } catch (error) {
        console.error("Dashboard error:", error);
    }
}

loadDashboard();

const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(stdout.trim());
        });
    });
}

async function getSystemData() {
    const [cpuRaw, memoryRaw, processesRaw, localityRaw] =
        await Promise.all([
            runCommand("lscpu"),
            runCommand("free -h"),
            runCommand("ps -eo pid,comm,stat,%cpu,%mem --sort=-%cpu | head -n 6"),
            fs.promises.readFile(
                path.join(__dirname, "../locality/results.csv"),
                "utf8"
            )
        ]);

    const cpu = {};

    cpuRaw.split("\n").forEach(line => {
        const parts = line.split(":");

        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join(":").trim();

            if (key === "Architecture") cpu.architecture = value;
            if (key === "Model name") cpu.model = value;
            if (key === "CPU(s)") cpu.cpus = value;
            if (key === "Core(s) per socket") cpu.cores = value;
            if (key === "Thread(s) per core") cpu.threadsPerCore = value;
        }
    });

    const memoryLines = memoryRaw.split("\n");
    const memoryParts = memoryLines[1].trim().split(/\s+/);

    const memory = {
        total: memoryParts[1],
        used: memoryParts[2],
        free: memoryParts[3],
        available: memoryParts[6]
    };

    const processLines = processesRaw.split("\n").slice(1);

    const processes = processLines.map(line => {
        const parts = line.trim().split(/\s+/);

        return {
            pid: parts[0],
            name: parts[1],
            state: parts[2],
            cpu: parts[3],
            memory: parts[4]
        };
    });

    const localityLines = localityRaw.trim().split("\n").slice(1);

    const locality = localityLines.map(line => {
        const parts = line.split(",");

        return {
            run: parts[0],
            rowMajor: parts[1],
            columnMajor: parts[2],
            ratio: parts[3]
        };
    });

    return {
        cpu,
        memory,
        processes,
        locality
    };
}

const server = http.createServer(async (req, res) => {

    if (req.url === "/api/system") {
        try {
            const data = await getSystemData();

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(data));

        } catch (error) {
            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                error: error.message
            }));
        }

        return;
    }

    let filePath = req.url === "/"
        ? path.join(PUBLIC_DIR, "index.html")
        : path.join(PUBLIC_DIR, req.url);

    const ext = path.extname(filePath);

    const contentTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript"
    };

    fs.readFile(filePath, (error, content) => {

        if (error) {
            res.writeHead(404);
            res.end("File not found");
            return;
        }

        res.writeHead(200, {
            "Content-Type": contentTypes[ext] || "text/plain"
        });

        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`System Detective Dashboard running at http://localhost:${PORT}`);
});

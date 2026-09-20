const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const LOCALITY_DIR = path.join(__dirname, "../locality");

function runCommand(command, options = {}) {
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(stderr || error.message));
                return;
            }

            resolve(stdout.trim());
        });
    });
}

function parseLocality(csv) {
    const lines = csv.trim().split("\n").slice(1);

    return lines.map(line => {
        const parts = line.split(",");

        return {
            run: parts[0],
            rowMajor: parts[1],
            columnMajor: parts[2],
            ratio: parts[3]
        };
    });
}

async function getSystemData() {
    const [cpuRaw, memoryRaw, processesRaw, localityRaw] =
        await Promise.all([
            runCommand("lscpu"),
            runCommand("free -h"),
            runCommand(
                "ps -eo pid,comm,stat,%cpu,%mem --sort=-%cpu | head -n 6"
            ),
            fs.promises.readFile(
                path.join(LOCALITY_DIR, "results.csv"),
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

    const locality = parseLocality(localityRaw);

    return {
        cpu,
        memory,
        processes,
        locality
    };
}

async function runLocalityExperiment() {
    const output = await runCommand(
        "gcc -O2 locality.c -o locality_c && ./locality_c",
        {
            cwd: LOCALITY_DIR
        }
    );

    const csv = await fs.promises.readFile(
        path.join(LOCALITY_DIR, "results.csv"),
        "utf8"
    );

    return {
        output,
        locality: parseLocality(csv)
    };
}

const server = http.createServer(async (req, res) => {

    // Live system data
    if (req.method === "GET" && req.url === "/api/system") {
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

    // Run locality benchmark
    if (req.method === "POST" && req.url === "/api/locality/run") {
        try {
            console.log("Running locality experiment...");

            const result = await runLocalityExperiment();

            console.log("Locality experiment completed.");

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(result));

        } catch (error) {
            console.error("Locality experiment failed:", error);

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                error: error.message
            }));
        }

        return;
    }

    // Serve frontend files
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
    console.log(
        `System Detective Dashboard running at http://localhost:${PORT}`
    );
});

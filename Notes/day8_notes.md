# System Detective — Day 8

## Objective
Begin development of the system dashboard using live data from the WSL2 environment.

## Dashboard
A simple dashboard was created using:
- HTML
- CSS
- JavaScript
- Node.js

A lightweight Node.js server was implemented to collect system information from Linux commands and provide it to the frontend through an API.

## Live Data
The dashboard currently displays:

- CPU / ISA information
- Memory usage
- Top 5 processes with process states
- Memory locality experiment results

System information is obtained using live commands including:
- `lscpu`
- `free -h`
- `ps`

Locality results are read from:

`locality/results.csv`

## Dashboard Structure

```text
dashboard/
├── server.js
└── public/
    ├── index.html
    ├── style.css
    └── script.js

# System Detective — Day 11

## Objective

Perform final verification of the dashboard using live WSL2 system data and the locality benchmark.

## Dashboard Verification

The dashboard was tested using the Node.js server in the WSL2 Ubuntu environment.

Two dashboard actions were verified:

- **Refresh Data** fetches the latest CPU, memory, process and locality information.
- **Run Locality Experiment** compiles and executes the locality benchmark and updates the results.

## Locality API Test

The locality experiment was triggered using:

```bash
curl -X POST http://localhost:3000/api/locality/run

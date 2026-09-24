# System Detective — Day 12

## Objective

Complete the AI Interaction Log and verify an AI-generated
machine-specific prediction against actual WSL2 system output.

## AI Prediction Test

The AI predicted that the process with the highest CPU usage would have
a CPU value greater than 0.0%.

The following command was executed:

```bash
ps -eo pid,comm,stat,%cpu,%mem --sort=-%cpu | head -n 6

# Day 1 — Environment Setup & System Inspection

## Date
11 September 2026

## Environment

- OS: Ubuntu 24.04.2 LTS
- Distribution codename: noble
- Linux kernel: 5.15.167.4-microsoft-standard-WSL2
- Environment: WSL2
- Architecture: x86_64
- Linux user: vanda

## Tools

The following tools were verified/installed:

- lscpu
- free
- top
- ps
- strace 6.8
- htop 3.3.0
- sysstat

## Required Commands Captured

The raw outputs of all five required commands are stored in the `outputs/` directory.

| File | Command |
|---|---|
| `01_lscpu.txt` | `lscpu` |
| `02_free.txt` | `free -h` |
| `03_top.txt` | `top -b -n 1` |
| `04_ps.txt` | `ps -eLf` |
| `05_strace.txt` | `strace -c ls` |

## Initial Observations

- The WSL2 environment reports an x86_64 architecture with 8 logical CPUs.
- The system reports 4 physical cores and 2 threads per core.
- Memory and swap information was captured using `free -h`.
- Process and thread information was captured using `top` and `ps -eLf`.
- System-call statistics were captured using `strace -c ls`.

## Project Directory

```text
/home/vanda/system-detective

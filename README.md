# System Detective — CIE-1

Computer Organisation & Operating Systems — CIE-1

## Objective

Inspect and analyze a Linux environment using system-level commands, investigate memory locality using row-major and column-major traversal, and present the findings through a simple dashboard.

## Environment

- Ubuntu 24.04.2 LTS
- WSL2
- x86_64
- Linux kernel: 5.15.167.4-microsoft-standard-WSL2

## System Inspection

The following commands were executed and their raw outputs were saved:

- `lscpu`
- `free -h`
- `top -b -n 1`
- `ps -eLf`
- `strace -c ls`

Outputs are stored in the `outputs/` directory.

## Locality Experiment

A C program was developed to compare row-major and column-major traversal of a 2D array.

### Configuration

- Array size: `4096 × 4096`
- Element type: `double`
- Total elements: `16,777,216`
- Element size: `8 bytes`
- Array size: `128 MiB`
- Compiler: GCC with `-O2`
- Three timed runs per experiment

### Checkpoint Result

Latest checkpoint run:

| Metric | Result |
|---|---:|
| Mean Row-major | 0.020493 s |
| Mean Column-major | 0.253000 s |
| Mean Ratio | 12.35× |

Row-major traversal was significantly faster because C stores multidimensional arrays in row-major order, allowing consecutive memory accesses and better spatial locality.

The experiment source is available in:

locality/locality.c

## Project Structure
```text

system-detective/
├── README.md
├── day1_notes.md
├── day2_notes.md
├── day3_notes.md
├── day4_notes.md
├── day5_notes.md
├── day6_notes.md
├── day7_notes.md
├── day8_notes.md
├── day9_notes.md
├── day10_notes.md
├── day11_notes.md
├── day12_notes.md
├── ai_log.md
├── outputs/
│   ├── 01_lscpu.txt
│   ├── 02_free.txt
│   ├── 03_top.txt
│   ├── 04_ps.txt
│   └── 05_strace.txt
├── locality/
│   ├── locality.c
│   ├── locality_c
│   ├── results.csv
│   └── results_day6.csv
├── dashboard/
└── screenshots/
    ├── checkpoint1_01_lscpu.png
    ├── checkpoint1_02_free.png
    ├── checkpoint1_03_top.png
    ├── checkpoint1_04_ps.png
    ├── checkpoint1_05_strace.png
    └── checkpoint2_locality.png

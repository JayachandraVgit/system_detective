# AI Interaction Log

## CIE-1 — System Detective

**Student:** Jayachandra  
**Date Started:** 11 September 2026

---

## Purpose

AI tools were used during this project for understanding Linux commands,
Operating System concepts, debugging, documentation, and project planning.

All machine-specific values were verified using actual commands on the
local WSL2 environment. AI was not treated as a source of machine-specific
measurements.

---

## Interaction 1 — Understanding the Assignment

### Prompt

I have a CIE assignment called "System Detective" where I need to inspect
my Linux system using commands such as lscpu, free -h, top, ps -eLf and
strace -c, perform a row-major vs column-major locality experiment, and
create a dashboard.

### AI Response / Guidance

AI explained the assignment requirements and suggested breaking the work
into stages: environment setup, command output collection, locality
experiments, dashboard development, AI logging, and final documentation.

### Action Taken

I set up an Ubuntu 24.04.2 LTS WSL2 environment and created the project
directory:

`/home/vanda/system-detective`

---

## Interaction 2 — Linux Environment Setup

### Prompt

Which Linux commands and tools should I install or verify for the
System Detective assignment?

### AI Response / Guidance

AI recommended verifying `lscpu`, `free`, `top`, `ps`, and `strace`,
along with `htop` for process inspection.

### Actual Verification

The tools were verified/installed on the WSL2 environment.

`strace` version: 6.8  
`htop` version: 3.3.0

The required command outputs were saved in the `outputs/` directory.

---

## Interaction 3 — Saving Actual Machine Data

### Prompt

Should I manually copy the machine values into my notes, or should I save
the actual command output?

### AI Response / Guidance

AI recommended preserving the original command outputs as raw evidence
and keeping the notes as a summary.

### Action Taken

The following raw outputs were saved:

- `outputs/01_lscpu.txt`
- `outputs/02_free.txt`
- `outputs/03_top.txt`
- `outputs/04_ps.txt`
- `outputs/05_strace.txt`

This provides reproducible evidence for the values used in the report.

---

## AI Verification Principle

For this project, AI-generated explanations and predictions will be
compared against actual Linux command output whenever they involve
machine-specific information.

If an AI prediction is incorrect, the incorrect prediction and the actual
machine result will be documented honestly in this log.

---

## Genuine AI Error

**To be added after an actual AI prediction is tested against the machine.**

No AI error has been fabricated for this log.

---

## Lessons Learned

- AI can explain Linux and Operating System concepts.
- AI cannot directly know the current state of my machine without being
  provided with actual output.
- Machine-dependent values must be obtained by running the commands.
- AI-generated predictions should be verified experimentally.

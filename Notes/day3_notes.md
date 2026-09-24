# System Detective — Day 3

## Objective

Continue preparing the Linux environment and organize the system inspection results for the System Detective CIE-1 activity.

## Environment

* WSL2
* Ubuntu 24.04.2 LTS
* x86_64 architecture
* Project: `/home/vanda/system-detective`

## Work Completed

* Verified required Linux commands and utilities.
* Captured outputs of:

  * `lscpu`
  * `free -h`
  * `top -b -n 1`
  * `ps -eLf`
  * `strace -c ls`
* Stored raw outputs in the `outputs/` directory.
* Organized the project using Git and GitHub.

## Key Observations

* `lscpu` provides CPU, core, thread and cache information.
* `free -h` provides memory and swap information.
* `top` provides a snapshot of system activity.
* `ps -eLf` shows processes and their LWPs/threads.
* `strace -c` summarizes system calls made by a command.

## Reproducibility

All machine-specific results were collected directly from the WSL2 environment. No values were copied from sample reports or manually generated.

## Next Step

Prepare the five labelled screenshots for Checkpoint 1 and proceed with the 2D array memory locality experiment.

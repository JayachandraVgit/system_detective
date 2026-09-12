# Day 2 — Environment Setup

## Objective

Set up and verify the Linux environment required for the System Detective CIE-1 activity.

## Environment

* Operating System: Ubuntu 24.04.2 LTS
* Codename: noble
* Environment: WSL2
* Architecture: x86_64
* Kernel: 5.15.167.4-microsoft-standard-WSL2
* Linux User: vanda
* Project Directory: `/home/vanda/system-detective`

## Tools Required

The following tools were required for the System Detective activity:

* `lscpu` — CPU and architecture information
* `free` — memory and swap information
* `top` — process and system activity monitoring
* `ps` — process and thread information
* `strace` — system call tracing
* `htop` — interactive process monitoring
* `sysstat` — system performance monitoring utilities
* `git` — version control

## Verification

The required tools were installed and verified successfully.

Verified versions included:

* `strace 6.8`
* `htop 3.3.0`
* `git 2.43.0`

The other required Linux commands were also available and successfully executed.

## Project Setup

The project directory was created at:

```text
/home/vanda/system-detective
```

The project was initialized as a Git repository and connected to the GitHub repository:

```text
system_detective
```

The `main` branch was configured and SSH authentication with GitHub was successfully verified.

## Observations

The environment is a WSL2 Linux environment running under Microsoft's hypervisor.

The system exposes an x86_64 architecture and provides the Linux tools required for CPU, memory, process, thread, and system-call inspection.

The setup was completed without requiring a native Ubuntu installation.

## Reproducibility

All setup and verification steps were performed directly in the WSL2 environment.

The project uses saved command outputs rather than manually entered machine-specific values. This allows the results to be checked against the actual machine output.


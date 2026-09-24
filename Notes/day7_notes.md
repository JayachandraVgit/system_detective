# System Detective — Day 7

## Objective
Complete the locality experiment checkpoint and document the measured results.

## Checkpoint Experiment
A 4096 × 4096 array of `double` values was traversed using row-major and column-major access patterns.

- Total elements: 16,777,216
- Element size: 8 bytes
- Array size: 128 MiB
- Runs: 3
- Compiler: GCC with `-O2`

## Checkpoint Results

| Run | Row-major (s) | Column-major (s) | Ratio |
|---|---:|---:|---:|
| 1 | 0.022200 | 0.252546 | 11.38× |
| 2 | 0.020004 | 0.251715 | 12.58× |
| 3 | 0.019275 | 0.254740 | 13.22× |
| Mean | 0.020493 | 0.253000 | 12.35× |

## Observation
Row-major traversal was significantly faster than column-major traversal.

The array is stored in row-major order in C. Therefore, row-major traversal accesses consecutive memory locations, giving better spatial locality. Column-major traversal accesses elements farther apart in memory, resulting in poorer cache locality.

The exact execution times varied between runs, but the same overall performance pattern was observed consistently.

## Checkpoint Evidence
The locality experiment output was captured as:

`screenshots/checkpoint2_locality.png`

The measured results are also stored in:

`locality/results.csv`

## Reproducibility
The experiment was implemented in `locality/locality.c` and performs three timed runs automatically. Results are generated directly from the system rather than manually entered.

## Status
- Locality experiment implemented
- Row-major traversal tested
- Column-major traversal tested
- Multiple runs completed
- Results saved to CSV
- Reproducibility checked
- Checkpoint screenshot captured

## Next Step
Begin dashboard development.

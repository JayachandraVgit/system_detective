# System Detective — Day 5

## Objective

Implement and measure a 2D array memory locality experiment comparing row-major and column-major traversal.

## Experiment

A `4096 × 4096` array of `double` values was created in C.

- Total elements: 16,777,216
- Element size: 8 bytes
- Array size: 128 MiB
- Compiler: GCC with `-O2`

The same array was traversed in two different orders:

- Row-major: traverse each row from left to right.
- Column-major: traverse each column from top to bottom.

## Results

Three runs were performed on the actual WSL2 machine.

| Run | Row-major (s) | Column-major (s) | Ratio |
|---|---:|---:|---:|
| 1 | 0.018593 | 0.279465 | 15.03× |
| 2 | 0.020314 | 0.271410 | 13.36× |
| 3 | 0.019380 | 0.267495 | 13.80× |
| **Mean** | **0.019429** | **0.272790** | **14.04×** |

Both traversal methods produced the same sum, confirming that the same number of elements was processed.

## Observation

Row-major traversal was significantly faster than column-major traversal.

C stores multidimensional arrays in row-major order, so row-major traversal accesses consecutive memory locations. This improves cache locality because nearby elements are likely to be brought into the cache together.

Column-major traversal accesses elements separated by a larger memory distance, resulting in poorer spatial locality and more cache misses.

On this machine, column-major traversal was **14.04× slower on average** than row-major traversal.

## Reproducibility

The experiment was implemented in `locality/locality.c` and compiled using:

```bash
gcc -O2 locality.c -o locality_c

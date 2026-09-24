# System Detective — Day 6

## Objective
Verify the reproducibility of the 2D array locality experiment.

## Reproducibility Run
The same C program and experimental setup from Day 5 were executed again without changing the benchmark logic.

| Run | Row-major (s) | Column-major (s) | Ratio |
|---|---:|---:|---:|
| 1 | 0.018596 | 0.258836 | 13.92× |
| 2 | 0.018614 | 0.253079 | 13.60× |
| 3 | 0.018481 | 0.256654 | 13.89× |
| Mean | 0.018564 | 0.256190 | 13.80× |

## Observation
The exact execution times varied slightly from the Day 5 measurements, but the overall behaviour remained consistent. Row-major traversal was significantly faster than column-major traversal in both experiments.

This supports the expected effect of memory locality: row-major traversal accesses consecutive elements in memory, while column-major traversal accesses elements with larger memory gaps.

## Status
-  Experiment rerun
-  Three additional measurements completed
-  Results compared with Day 5
-  Reproducibility verified
-  Results saved to CSV

## Next Step
Prepare the locality results for integration into the dashboard.

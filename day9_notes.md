# System Detective — Day 9

## Objective
Improve the dashboard layout and visualize the collected system and locality data.

## Dashboard Improvements
The dashboard was enhanced using plain HTML, CSS, and JavaScript.

The following improvements were added:
- CPU and memory information displayed in separate cards
- Top 5 processes displayed in a structured table
- Process states, CPU usage, and memory usage displayed
- Row-major and column-major timings shown using a visual comparison
- Mean locality result highlighted
- Refresh Data button added
- Last updated time displayed

## Live Data
The dashboard continues to obtain system information from the WSL2 environment using live Linux commands through the Node.js backend.

Locality measurements are read from:

`locality/results.csv`

## Verification
The dashboard was opened in the browser and verified successfully.

The dashboard displayed:
- CPU architecture and hardware information
- Current memory information
- Top 5 processes
- Locality measurements for all three runs
- Mean locality comparison

The dashboard also showed the current update time and confirmed that the data source is WSL2 Ubuntu.

## Status
- Dashboard layout improved
- CPU and memory cards added
- Process table improved
- Locality visualization added
- Mean result highlighted
- Refresh functionality added
- Dashboard tested in browser

## Next Step
Perform final dashboard testing and verification.

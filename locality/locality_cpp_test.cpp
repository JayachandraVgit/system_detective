#include <iostream>
#include <vector>
#include <chrono>
#include <iomanip>

using namespace std;
using namespace chrono;

const int N = 4096;

int main() {
    vector<vector<double>> arr(N, vector<double>(N, 1.0));

    double row_sum = 0.0;
    double col_sum = 0.0;

    // Row-major traversal
    auto row_start = high_resolution_clock::now();

    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            row_sum += arr[i][j];
        }
    }

    auto row_end = high_resolution_clock::now();

    // Column-major traversal
    auto col_start = high_resolution_clock::now();

    for (int j = 0; j < N; j++) {
        for (int i = 0; i < N; i++) {
            col_sum += arr[i][j];
        }
    }

    auto col_end = high_resolution_clock::now();

    double row_time =
        duration<double>(row_end - row_start).count();

    double col_time =
        duration<double>(col_end - col_start).count();

    cout << fixed << setprecision(6);

    cout << "Array size: " << N << " x " << N << "\n";
    cout << "Row-major time: " << row_time << " seconds\n";
    cout << "Column-major time: " << col_time << " seconds\n";
    cout << "Row sum: " << row_sum << "\n";
    cout << "Column sum: " << col_sum << "\n";

    return 0;
}

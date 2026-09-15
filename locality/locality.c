#include <stdio.h>
#include <time.h>

#define N 4096
#define RUNS 3

static double arr[N][N];

double get_time(void) {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec + ts.tv_nsec / 1e9;
}

double row_major(void) {
    double sum = 0.0;

    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            sum += arr[i][j];
        }
    }

    return sum;
}

double column_major(void) {
    double sum = 0.0;

    for (int j = 0; j < N; j++) {
        for (int i = 0; i < N; i++) {
            sum += arr[i][j];
        }
    }

    return sum;
}

int main(void) {

    /* Initialize the array */
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            arr[i][j] = 1.0;
        }
    }

    FILE *file = fopen("results.csv", "w");

    if (file == NULL) {
        perror("Unable to create results.csv");
        return 1;
    }

    printf("Array size: %d x %d\n", N, N);
    printf("Total elements: %d\n", N * N);
    printf("Element size: %zu bytes\n", sizeof(double));
    printf("Array size: %.2f MiB\n\n",
           (double)sizeof(arr) / (1024 * 1024));

    printf("run,row_major_s,column_major_s,ratio\n");

    fprintf(file, "run,row_major_s,column_major_s,ratio\n");

    double row_total = 0.0;
    double col_total = 0.0;

    for (int run = 1; run <= RUNS; run++) {

        double start = get_time();
        double row_sum = row_major();
        double row_time = get_time() - start;

        start = get_time();
        double col_sum = column_major();
        double col_time = get_time() - start;

        double ratio = col_time / row_time;

        printf("%d,%.6f,%.6f,%.2f\n",
               run, row_time, col_time, ratio);

        fprintf(file, "%d,%.6f,%.6f,%.2f\n",
                run, row_time, col_time, ratio);

        row_total += row_time;
        col_total += col_time;

        if (row_sum != col_sum) {
            fprintf(stderr, "Error: sums do not match\n");
            fclose(file);
            return 1;
        }
    }

    double row_mean = row_total / RUNS;
    double col_mean = col_total / RUNS;
    double mean_ratio = col_mean / row_mean;

    printf("\nMean row-major time: %.6f seconds\n", row_mean);
    printf("Mean column-major time: %.6f seconds\n", col_mean);
    printf("Mean ratio: %.2fx\n", mean_ratio);

    fprintf(file, "mean,%.6f,%.6f,%.2f\n",
            row_mean, col_mean, mean_ratio);

    fclose(file);

    printf("\nResults saved to results.csv\n");

    return 0;
}

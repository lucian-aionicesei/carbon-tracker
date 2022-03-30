import Chart from "chart.js/auto";

const colors = ["#9BFFC2", "#FD7484"];

Chart.defaults.borderWidth = "0";
Chart.defaults.borderColor = "rgba(0, 0, 0, 0.0)";

export function createTestDonut() {
    const testCanvas = document.querySelector("#overall-donut-chart");
    const testData = [80, 20];

    let chart = createDonutChart(testData, testCanvas);
}

export function createTestPie() {
    const testCanvas = document.querySelector("#unused-script-chart");
    const testData = [80, 20];

    let chart = createPieChart(testData, testCanvas);
    setTimeout(() => {
        updateChart(chart, [80]);
    }, 2000);
}

export function createTestBars() {
    const testCanvas = document.querySelector("#media-sizes-chart");
    const testData1 = [100, 40, 50, 60, 80];
    const testData2 = [81, 20, 40, 50, 60];
    const labels = ["file1.jpg", "test.png", "fill.mp4", "small.png", "header.png"];

    let chart = createCoupledBars(testData1, testData2, labels, testCanvas);
    setTimeout(() => {
        updateChart(chart, testData2);
    }, 2000);
}

export function createDonutChart(data, canvas) {
    let donutChart = new Chart(canvas.getContext("2d"), {
        type: "doughnut",
        data: {
            datasets: [
                {
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 0,
                },
            ],
        },
        options: {
            cutout: 50,
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    });

    return donutChart;
}

export function createPieChart(data, canvas) {
    let pieChart = new Chart(canvas, {
        type: "pie",
        data: {
            datasets: [
                {
                    label: "ratio of used/unused Javascript",
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 0,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    });

    return pieChart;
}

export function createCoupledBars(dataSet1, dataset2, labels, canvas) {
    let barsChart = new Chart(canvas, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "media files currently",
                    data: dataSet1,
                    backgroundColor: colors[1],
                },
                {
                    label: "media files modernised",
                    data: dataset2,
                    backgroundColor: colors[0],
                },
            ],
        },

        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    min: 0,
                    max: Math.max(...dataSet1.concat(dataset2)),
                    // grid: {
                    //     color: "#ffffff",
                    // },
                },
                x: {
                    // grid: {
                    //     color: "#ffffff",
                    // },
                },
            },
        },
    });

    return barsChart;
}

// change the displayed data, the animation is done by the framework
export function updateChart(chart, newData) {
    // console.log("update called");
    chart.data.datasets.forEach((dataset) => {
        dataset.data = newData;
    });
    chart.update();
}

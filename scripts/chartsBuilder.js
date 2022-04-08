import Chart from "chart.js/auto";

const colors = ["#9BFFC2", "#FD7484"];

let charts = [];

Chart.defaults.borderWidth = 0;
Chart.defaults.borderColor = "rgba(0, 0, 0, 0.0)";

// takes an array with numbers and a canvas, creates donut chart
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
            cutout: "60%",
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    });

    charts.push(donutChart);
    return donutChart;
}

// takes a array of numbers and canvas and creates a pie Chart there
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

    charts.push(pieChart);
    return pieChart;
}

// groups the corresponding values from dataSet1 and dataSet2 in a bar chart
// dataSet1 and dataSet2 are arrays of numbers, labels are the group names, canvas is the element to create in.
export function createCoupledBars(dataSet1, dataset2, labels, canvas, stacked = false) {
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
                x: {
                    stacked: stacked,
                },
                y: {
                    min: 0,
                    max: Math.max(...dataSet1.concat(dataset2)),
                    display: false,
                    stacked: stacked,
                },
            },
        },
    });

    charts.push(barsChart);
    return barsChart;
}

export function createStackedBars(canvas, datasetBad, datasetGood, labels) {
    return createCoupledBars(datasetBad, datasetGood, labels, canvas, true);
}

// change the displayed data, newDataSets is an array of arrays which represent the data
export function updateChartData(chart, newDataSets) {
    // console.log("update called");
    // chart.data.datasets.forEach((dataset) => {
    //     dataset.data = newData;
    // });

    for (let i = 0; i < chart.data.datasets.length; i++) {
        let newIdx = i % newDataSets.length;
        chart.data.datasets[i].data = newDataSets[newIdx];
    }
    chart.update();
}

export function clearAllCharts() {
    charts.forEach((chart) => {
        chart.destroy();
        // chart.clear();
    });

    charts = [];
}

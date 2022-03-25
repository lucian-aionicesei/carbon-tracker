import Chart from "chart.js/auto";

const colors = ["#FD7484", "#9BFFC2"];

export function createTestPie() {
    const testCanvas = document.querySelector("#unused-script-chart");
    const testData = [80, 20];

    let chart = createPieChart(testData, testCanvas);
    setTimeout(() => {
        updateChart(chart, [80]);
    }, 2000);
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
                    borderColor: [],
                },
            ],
        },

        options: {
            responsive: true,
        },
    });

    return pieChart;
}

// change the displayed data, the animation is done by the framework
export function updateChart(chart, newData) {
    // console.log("update called");
    chart.data.datasets.forEach((dataset) => {
        dataset.data = newData;
    });
    chart.update();
}

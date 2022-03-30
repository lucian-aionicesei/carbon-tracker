import { createDonutChart } from "./chartsBuilder.js";

export function initReport(data) {
    const testData = [
        { title: "Reduce image Size", percentageData: [55, 45] },
        { title: "Minify code", percentageData: [75, 25] },
        { title: "Use cached files", percentageData: [27, 73] },
    ];

    createImprovementAreas(testData);
}

function createImprovementAreas(areaData) {
    const parent = document.querySelector(".biggest-improvement .sectors");
    const template = document.querySelector("#mostImportantTemplate");
    let exsiting = document.querySelectorAll(".biggest-improvement .improvement-sector");

    for (let i = 0; i < areaData.length; i++) {
        let newSector = template.content.cloneNode(true);
        console.log(newSector.querySelector("canvas.chart"));
        newSector.querySelector("[data-field=title]").textContent = areaData[i].title;
        newSector.querySelector(".numbered-donut [data-field=number]").textContent = areaData[i].percentageData[0];

        let chart = createDonutChart(areaData[i].percentageData, newSector.querySelector("canvas.chart"));

        parent.appendChild(newSector);
    }
}

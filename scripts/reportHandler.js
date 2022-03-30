import { createDonutChart, createPieChart, updateChart } from "./chartsBuilder.js";

export function initReport(data) {
    const testDataImprovement = [
        { title: "Reduce image Size", percentageData: [55, 45] },
        { title: "Minify code", percentageData: [75, 25] },
        { title: "Use cached files", percentageData: [27, 73] },
    ];

    createImprovementAreas(testDataImprovement);
    fillunMinifiedJsArticle(20, 80);
}

// fills the Elements chart and the values in the text,
// links the chartChange and oder styleChanges to the checkbox/sliders
function fillunMinifiedJsArticle(whiteSpaceSize, minifiedSize) {
    const percentage = Math.ceil((whiteSpaceSize / (minifiedSize + whiteSpaceSize)) * 100);
    const article = document.querySelector("#unminified-js");

    const chart = createPieChart([minifiedSize, whiteSpaceSize], article.querySelector("canvas.chart"));
    let sizeValContainer = article.querySelector("[data-field=size-vals]");
    sizeValContainer.textContent = `${whiteSpaceSize}kb or ${percentage}%`;

    let sliderCheckbox = article.querySelector(".toggle-container input[type=checkbox]");
    let divider = article.querySelector("hr");
    sliderCheckbox.addEventListener("change", (event) => {
        if (event.target.checked) {
            updateChart(chart, [minifiedSize]);
        } else {
            updateChart(chart, [minifiedSize, whiteSpaceSize]);
        }

        divider.classList.toggle("positive", event.target.checked);
    });
}

// creates the "biggest Areas of Improvement" section,
// area data should contain a "title" and "percentageData" to Display
function createImprovementAreas(areaData) {
    const parent = document.querySelector(".biggest-improvement .sectors");
    const template = document.querySelector("#mostImportantTemplate");
    let exsiting = document.querySelectorAll(".biggest-improvement .improvement-sector");

    for (let i = 0; i < areaData.length; i++) {
        let newSector = template.content.cloneNode(true);
        newSector.querySelector("[data-field=title]").textContent = areaData[i].title;
        newSector.querySelector(".numbered-donut [data-field=number]").textContent = areaData[i].percentageData[0];

        let chart = createDonutChart(areaData[i].percentageData, newSector.querySelector("canvas.chart"));

        parent.appendChild(newSector);
    }
}

import { createCoupledBars, createDonutChart, createPieChart, updateChartData } from "./chartsBuilder.js";

export function initReport(data) {
    const testDataImprovement = [
        { title: "Reduce image Size", percentageData: [55, 45] },
        { title: "Minify code", percentageData: [75, 25] },
        { title: "Use cached files", percentageData: [27, 73] },
    ];
    const datasetBig = [488, 352, 330];
    const datasetSmall = [350, 280, 250];
    const imageNames = ["1920x1080", "450x220", "800x900"];

    createImprovementAreas(testDataImprovement);
    fillunMinifiedJsArticle(20, 80);
    fillBiggestImagesArticle(datasetBig, datasetSmall, imageNames);
    fillGreenHostArticle(0.8, 1);
}

// fills the Elements chart and the values in the text,
// links the chartChange and oder styleChanges to the checkbox/sliders
function fillunMinifiedJsArticle(whiteSpaceSize, minifiedSize) {
    const percentage = Math.ceil((whiteSpaceSize / (minifiedSize + whiteSpaceSize)) * 100);
    const article = document.querySelector("#unminified-js");

    const chart = createPieChart([minifiedSize, whiteSpaceSize], article.querySelector("canvas.chart"));
    article.querySelector("[data-field=size-vals]").textContent = `${whiteSpaceSize}kb or ${percentage}%`;

    setSliderChangeFunc(article, (event) => {
        if (event.target.checked) {
            updateChartData(chart, [[minifiedSize]]);
        } else {
            updateChartData(chart, [[minifiedSize, whiteSpaceSize]]);
        }
    });
}

function fillBiggestImagesArticle(datasetBig, dataSetSmall, imageNames) {
    const article = document.querySelector("#old-image-types");
    const chart = createCoupledBars(datasetBig, dataSetSmall, imageNames, article.querySelector("canvas.chart"));

    const differences = calulateDifferencesFromArrays(datasetBig, dataSetSmall);
    article.querySelector("[data-field=size-vals]").textContent = `${differences.absolute}kb or ${differences.percentage}%`;

    setSliderChangeFunc(article, (event) => {
        // candy: maybe update colors here too
        if (event.target.checked) {
            updateChartData(chart, [dataSetSmall, dataSetSmall]);
        } else {
            updateChartData(chart, [datasetBig, dataSetSmall]);
        }
    });
}

function fillGreenHostArticle(co2green, co2grid) {
    const greenScale = co2green / co2grid;
    const article = document.querySelector("#renewable-host");

    article.querySelector("[data-field=size-vals]").textContent = `${(co2grid - co2green).toFixed(2)} grams or ${Math.round(greenScale * 100)}%`;
    let container = article.querySelector(".svg-chart");
    let svg = container.querySelector("svg");
    let text = container.querySelector("[data-field=carbon-weight]");
    text.textContent = co2grid.toFixed(2) + "g";

    setSliderChangeFunc(article, (event) => {
        if (event.target.checked) {
            container.style.transform = `scale(${greenScale})`;
            text.textContent = co2green.toFixed(2) + "g";
        } else {
            container.style.transform = `scale(1)`;
            text.textContent = co2grid.toFixed(2) + "g";
        }
        svg.classList.toggle("positive", event.target.checked);
    });
}

// adds up all the values in the arrays. calculates the differnece in an absolute value and a percentage value.
function calulateDifferencesFromArrays(arrayBig, arraySmall) {
    const sumBig = arrayBig.reduce((a, b) => a + b, 0);
    const sumSmall = arraySmall.reduce((a, b) => a + b, 0);
    const absolute = Math.round(sumBig - sumSmall);
    const percentage = Math.round((sumSmall / (sumBig + sumSmall)) * 100);

    return { absolute, percentage };
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
        newSector.querySelector(".chart-middle-text [data-field=number]").textContent = areaData[i].percentageData[0];

        let chart = createDonutChart(areaData[i].percentageData, newSector.querySelector("canvas.chart"));

        parent.appendChild(newSector);
    }
}

function setSliderChangeFunc(article, onChange) {
    let sliderCheckbox = article.querySelector(".toggle-container input[type=checkbox]");
    let divider = article.querySelector("hr");
    sliderCheckbox.addEventListener("change", (event) => {
        onChange(event);

        divider.classList.toggle("positive", event.target.checked);
    });
}

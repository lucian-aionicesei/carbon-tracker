import { createCoupledBars, createDonutChart, createPieChart, createStackedBars, updateChartData } from "./chartsBuilder.js";

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
    fillOffscreenResources(80, 20);
    fillOverviewStats(1.79, 90);
    setComparisonText("Finance", 0.8, 10000);
    fillRanking(0.35, 0.7);
}

function fillOverviewStats(gramsPerView, energy) {
    const container = document.querySelector(".overview");
    container.querySelector("[data-field=co-per-view]").textContent = `${gramsPerView} grams of CO2 per page view`;
    container.querySelector("[data-field=energy-per-thousand]").textContent = `${energy}kWh of energy for every 1000 visitors`;
}

function fillRanking(cleanerThan, potential) {
    const rankingElem = document.querySelector(".ranking");
    const cleanerThanElem = rankingElem.querySelector("[data-field=cleaner-than]");
    const potentialElem = rankingElem.querySelector("[data-field=potential]");

    cleanerThanElem.textContent = Math.round(cleanerThan * 100) + "%";
    if (cleanerThan > 0.5) {
        cleanerThanElem.classList.remove("negative");
        cleanerThanElem.classList.add("positive");
    } else {
        cleanerThanElem.classList.remove("positive");
        cleanerThanElem.classList.add("negative");
    }

    potentialElem.textContent = Math.round(potential * 100) + "%";
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

function fillOffscreenResources(fullPageSize, offscreenResourcesSize) {
    const pageSizeVisible = fullPageSize - offscreenResourcesSize;
    const percentage = ((offscreenResourcesSize / fullPageSize) * 100).toFixed();
    let article = document.querySelector("#offscreen-resources");
    let canvas = article.querySelector("canvas.chart");
    article.querySelector("[data-field=size-vals]").textContent = `${offscreenResourcesSize}kb or ${percentage}%`;

    let chart = createStackedBars(canvas, [offscreenResourcesSize], [pageSizeVisible], ["offscreen resources"]);
    setSliderChangeFunc(article, (event) => {
        if (event.target.checked) {
            updateChartData(chart, [[0], [pageSizeVisible]]);
        } else {
            updateChartData(chart, [[offscreenResourcesSize], [pageSizeVisible]]);
        }
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

function setComparisonText(industry, grams, visitors) {
    let container = document.querySelector(".comparison [data-field=comparison-text]");

    container.innerHTML = `With ${visitors} monthly visitors this website emits <strong class="negative" data-value="grams">
        ${Math.round(visitors * grams)} grams of CO2</strong>, ${getComparison(industry, grams, visitors)}, every month.`;
}

function getComparison(industry, grams, visitors) {
    switch (industry) {
        case "Food":
            return calcFood(grams, visitors);
            break;
        case "Finance":
            return calcFinancial(grams, visitors);
            break;
        case "Clothing":
            return calcFashion(grams, visitors);
            break;
        case "Tech":
            return calcTechEntertain(grams, visitors);
            break;
        case "Construction":
            return calcConstruction(grams, visitors);
            break;
        case "Transport":
            return calcTraffic(grams, visitors);
            break;
        case "Entertainment":
            return calcTechEntertain(grams, visitors);
            break;
        case "Hotel":
            return calcHotel(grams, visitors);
            break;
        case "Energy":
            return "I dont know";
            break;
        case "Retail":
            return calcHotel(grams, visitors);
            break;
        default:
            return calcTraffic(grams, visitors);
            break;
    }
}

function calcFood(grams, visitors) {
    const gOfWheat = Math.round((grams * visitors) / 0.59 / 1000);

    return `the same as ${gOfWheat} kilograms of Wheat`;
}

function calcFinancial(grams, visitors) {
    const numOfBankTransfers = Math.round((grams * visitors) / 4);

    return `the same as ${numOfBankTransfers} bank transfers`;
}

function calcFashion(grams, visitors) {
    const numOfShirts = ((grams * visitors) / 2000).toFixed(2);

    return `the same as ${numOfShirts}`;
}

function calcTechEntertain(grams, visitors) {
    const netflixChill = Math.round((grams * visitors) / 56);

    return `the same as ${netflixChill} hours of Netflix`;
}

function calcConstruction(grams, visitors) {
    const concrete = Math.round((grams * visitors) / 0.41);

    return `the same as ${concrete} cm3 of concrete`;
}

function calcTraffic(grams, visitors) {
    const dieselKm = ((grams * visitors) / 2000).toFixed(2);

    return `the same as ${dieselKm} kilometers in a diesel car.`;
}

function calcHotel(grams, visitors) {
    const cheese = Math.round((grams * visitors) / 9);

    return `the same as ${cheese} grams of cheese`;
}

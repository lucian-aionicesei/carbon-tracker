import { createCoupledBars, createDonutChart, createPieChart, createStackedBars, updateChartData, clearAllCharts } from "./chartsBuilder.js";

let isFirstReport = true;

export function initReport(data, industry) {
    if (!isFirstReport) {
        clearAllCharts();
    }

    isFirstReport = false;

    createImprovementAreas(data);
    fillunMinifiedJsArticle(data.uselessCodeData.uselessCodeSize, data.uselessCodeData.fullCodeSize);
    fillBiggestImagesArticle(data.imgFormatsData.theImages.currentSize, data.imgFormatsData.theImages.optimizedSize, ["", "", ""]);
    fillGreenHostArticle(data.hostData.withGreenHost, data.hostData.withoutGreenHost);
    fillOffscreenResources(data.offScreenResourcesData.currentSize, data.offScreenResourcesData.savingsPotential);
    fillOverviewStats(data.cleanerThanData.gramsPerLoad, data.cleanerThanData.energyPerLoad);
    setComparisonText(industry, data.cleanerThanData.gramsPerLoad, 10000);
    setComparisonReductionText(industry, data.cleanerThanData.gramsPerLoad, 10000);
    fillRanking(data.cleanerThanData.cleanerThan, data.cleanerThanData.potential);

    document.querySelector("#main-url").scrollIntoView({
        behavior: "smooth",
    });
}

function fillOverviewStats(gramsPerView, energy) {
    const container = document.querySelector(".overview");
    container.querySelector("[data-field=co-per-view]").textContent = `${gramsPerView.toFixed(2)} grams of CO2 per page view`;
    container.querySelector("[data-field=energy-per-thousand]").textContent = `${energy.toFixed(2)}kWh of energy for every 1000 visitors`;
}

function fillRanking(cleanerThan, potential) {
    const rankingElem = document.querySelector(".ranking");
    const cleanerThanElem = rankingElem.querySelector("[data-field=cleaner-than]");
    const potentialElem = rankingElem.querySelector("[data-field=potential]");

    cleanerThanElem.textContent = Math.round(cleanerThan) + "%";
    if (cleanerThan > 50) {
        cleanerThanElem.classList.remove("negative");
        cleanerThanElem.classList.add("positive");
    } else {
        cleanerThanElem.classList.remove("positive");
        cleanerThanElem.classList.add("negative");
    }

    potentialElem.textContent = Math.round(potential) + "%";
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

    return {
        absolute,
        percentage,
    };
}

// creates the "biggest Areas of Improvement" section,
// area data should contain a "title" and "percentageData" to Display
function createImprovementAreas(areaData) {
    const parent = document.querySelector(".biggest-improvement .sectors");
    parent.replaceChildren(...[]);
    const template = document.querySelector("#mostImportantTemplate");

    // modern image formats
    let imageSector = template.content.cloneNode(true);
    imageSector.querySelector("[data-field=title]").textContent = "Reduce image size";
    imageSector.querySelector("[data-field=number]").textContent = Math.round((areaData.imgFormatsData.imageSavings / areaData.imgFormatsData.totalImageSize) * 100);

    createDonutChart([areaData.imgFormatsData.totalImageSize, areaData.imgFormatsData.imageSavings], imageSector.querySelector("canvas.chart"));

    parent.appendChild(imageSector);

    // minifiesd code
    let mincodeSector = template.content.cloneNode(true);
    mincodeSector.querySelector("[data-field=title]").textContent = "Minify code";
    mincodeSector.querySelector("[data-field=number]").textContent = Math.round((areaData.uselessCodeData.uselessCodeSize / areaData.uselessCodeData.fullCodeSize) * 100);

    createDonutChart([areaData.uselessCodeData.fullCodeSize, areaData.uselessCodeData.uselessCodeSize], mincodeSector.querySelector("canvas.chart"));

    parent.appendChild(mincodeSector);

    // Offscreen images
    let offscreenImages = template.content.cloneNode(true);
    offscreenImages.querySelector("[data-field=title]").textContent = "Reduce image size";
    offscreenImages.querySelector("[data-field=number]").textContent = Math.round(
        (areaData.offScreenResourcesData.savingsPotential / areaData.offScreenResourcesData.currentSize) * 100
    );

    createDonutChart([areaData.offScreenResourcesData.currentSize, areaData.offScreenResourcesData.savingsPotential], offscreenImages.querySelector("canvas.chart"));

    parent.appendChild(offscreenImages);
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

    // container.innerHTML = `With ${visitors} monthly visitors this website emits <strong class="negative" data-value="grams">
    //     ${Math.round(visitors * grams)} grams of CO2</strong>, ${getComparison(industry, grams, visitors)}, every month.`;
    container.querySelector("[data-field=visitors]").textContent = visitors;
    container.querySelector("[data-field=grams]").textContent = Math.round(visitors * grams) + "grams of CO2";
    container.querySelector("[data-field=comparison]").textContent = getComparison(industry, grams, visitors);

    let icon = container.querySelector(".icon-container img");
    icon.src = getIconName(industry);
}

function setComparisonReductionText(industry, grams, visitors) {
    let container = document.querySelector("section#comparison h2");

    // container.innerHTML = `With ${visitors} monthly visitors this website emits <strong class="negative" data-value="grams">
    //     ${Math.round(visitors * grams)} grams of CO2</strong>, ${getComparison(industry, grams, visitors)}, every month.`;
    container.querySelector("[data-field=change]").textContent = getReductionComparison(industry, grams, visitors) + "!";

    let icon = container.querySelector(".icon-container img");
    icon.src = getIconName(industry);
}

function getIconName(industry) {
    switch (industry) {
        case "food":
            return "wheat.svg";
            break;
        case "finance":
            return "money.svg";
            break;
        case "clothing":
            return "clothing.svg";
            break;
        case "tech":
            return "screen.svg";
            break;
        case "construction":
            return "crane.svg";
            break;
        case "transport":
            return "money.svg";
            break;
        case "entertainment":
            return "screen.svg";
            break;
        case "hotel":
            return "money.svg";
            break;
        case "energy":
            return "I dont know";
            break;
        case "retail":
            return "cheese.svvg";
            break;
        default:
            return "car.svg";
            break;
    }
}

function getComparison(industry, grams, visitors) {
    switch (industry) {
        case "food":
            return calcFood(grams, visitors);
            break;
        case "finance":
            return calcFinancial(grams, visitors);
            break;
        case "clothing":
            return calcFashion(grams, visitors);
            break;
        case "tech":
            return calcTechEntertain(grams, visitors);
            break;
        case "construction":
            return calcConstruction(grams, visitors);
            break;
        case "transport":
            return calcTraffic(grams, visitors);
            break;
        case "entertainment":
            return calcTechEntertain(grams, visitors);
            break;
        case "hotel":
            return calcHotel(grams, visitors);
            break;
        case "energy":
            return "I dont know";
            break;
        case "retail":
            return calcHotel(grams, visitors);
            break;
        default:
            return calcTraffic(grams, visitors);
            break;
    }
}

function getReductionComparison(industry, grams, visitors) {
    let reduction = Math.floor(Math.random() * 10) + 5;

    switch (industry) {
        case "food":
            return calcFoodReduction(grams, visitors, reduction);
            break;
        case "finance":
            return calcFinancialReduction(grams, visitors, reduction);
            break;
        case "clothing":
            return calcFashionReduction(grams, visitors, reduction);
            break;
        case "tech":
            return calcTechEntertainReduction(grams, visitors, reduction);
            break;
        case "construction":
            return calcConstructionReduction(grams, visitors, reduction);
            break;
        case "transport":
            return calcTrafficReduction(grams, visitors, reduction);
            break;
        case "entertainment":
            return calcTechEntertainReduction(grams, visitors, reduction);
            break;
        case "hotel":
            return calcHotel(grams, visitors, reduction);
            break;
        case "energy":
            return "I dont know";
            break;
        case "retail":
            return calcHotelReduction(grams, visitors, reduction);
            break;
        default:
            return calcTraffic(grams, visitors, reduction);
            break;
    }
}

function calcFood(grams, visitors) {
    const gOfWheat = Math.round((grams * visitors) / 0.59 / 1000);

    return `the same as ${gOfWheat} kilograms of Wheat`;
}

function calcFoodReduction(grams, visitors, reductionPercentage) {
    const oldGOfWheat = Math.round((grams * visitors) / 0.59 / 1000);
    const reduceGOfWheat = oldGOfWheat - (oldGOfWheat / 100) * reductionPercentage;

    return `${oldGOfWheat} to ${reduceGOfWheat} grams of Wheat`;
}

function calcFinancial(grams, visitors) {
    const numOfBankTransfers = Math.round((grams * visitors) / 4);

    return `the same as ${numOfBankTransfers} bank transfers`;
}

function calcFinancialReduction(grams, visitors, reductionPercentage) {
    const oldNumOfTransfers = Math.round((grams * visitors) / 4);
    const reduceNumOfTransfers = oldNumOfTransfers - (oldNumOfTransfers / 100) * reductionPercentage;

    return `${oldNumOfTransfers} to ${reduceNumOfTransfers} bank transfers`;
}

function calcFashion(grams, visitors) {
    const numOfShirts = ((grams * visitors) / 2000).toFixed(2);

    return `the same as ${numOfShirts}`;
}

function calcFashionReduction(grams, visitors, reductionPercentage) {
    const oldShirts = Math.round((grams * visitors) / 2000);
    const reducedShirts = oldShirts - (oldShirts / 100) * reductionPercentage;

    return `${oldShirts} to ${reducedShirts} number of shirts`;
}

function calcTechEntertain(grams, visitors) {
    const netflixChill = Math.round((grams * visitors) / 56);

    return `the same as ${netflixChill} hours of Netflix`;
}

function calcTechEntertainReduction(grams, visitors, reductionPercentage) {
    const oldNetflixChill = Math.round((grams * visitors) / 56);
    const reduceNetflixChill = oldNetflixChill - (oldNetflixChill / 100) * reductionPercentage;

    return `${oldNetflixChill} to ${reduceNetflixChill} hours of netflix`;
}

function calcConstruction(grams, visitors) {
    const concrete = Math.round((grams * visitors) / 0.41);

    return `the same as ${concrete} cm3 of concrete`;
}

function calcConstructionReduction(grams, visitors, reductionPercentage) {
    const oldConcreteVolume = Math.round((grams * visitors) / 0.41);
    const reduceConcreteVolume = oldConcreteVolume - (oldConcreteVolume / 100) * reductionPercentage;

    return `${oldConcreteVolume} to ${reduceConcreteVolume} cm3 of concrete`;
}

function calcTraffic(grams, visitors) {
    const dieselKm = ((grams * visitors) / 2000).toFixed(2);

    return `the same as ${dieselKm} kilometers in a diesel car`;
}
function calcTrafficReduction(grams, visitors, reductionPercentage) {
    const oldDieselKm = Math.round((grams * visitors) / 2000);
    const reduceDieselKm = oldDieselKm - (oldDieselKm / 100) * reductionPercentage;

    return `${oldDieselKm} to ${reduceDieselKm} kilometers in a diesel car`;
}

function calcHotel(grams, visitors) {
    const cheese = Math.round((grams * visitors) / 9);

    return `the same as ${cheese} grams of cheese`;
}

function calcHotelReduction(grams, visitors, reductionPercentage) {
    const oldCheese = Math.round((grams * visitors) / 9);
    const reduceCheese = oldCheese - (oldCheese / 100) * reductionPercentage;

    return `${oldCheese} to ${reduceCheese} grams of cheese`;
}

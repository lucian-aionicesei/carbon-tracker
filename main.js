import "./sass/style.scss";
import {
    initReport
} from "./scripts/reportHandler.js";
import {
    loadingScreen,
    toHttpsURL
} from "./scripts/functionalities.js";
import {
    generateCarbonResult,
    generateSpeedresult,
    getUselessCodeData
} from "./scripts/dataModel";


window.onload = clearForm();

// initReport();

const inputUrl = document.querySelector("#get-url-form");

inputUrl.addEventListener("submit", (data) => {
    data.preventDefault();
    calculate();
});

// Get url input
async function calculate() {

    loadingScreen(true);

    console.log("calculate");

    let urlInput = inputUrl.elements.url_input.value;
    let selectedIndustry = inputUrl.elements.select_industry.value;

    urlInput = toHttpsURL(urlInput);

    console.log(urlInput, selectedIndustry);

    await generateCarbonResult(urlInput);
    await generateSpeedresult(urlInput);

    
    loadingScreen(false)
    clearForm();
    initReport();
    console.log("Data received");
    // await loadData(urlInput);
    // console.log(getUselessCodeData());
}


function clearForm() {
    console.log("Window has been reloaded");
    document.querySelector("#get-url-form").reset();
}
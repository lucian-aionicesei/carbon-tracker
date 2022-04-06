import "./sass/style.scss";
import {
    initReport
} from "./scripts/reportHandler.js";
import {
    loadingScreen,
    toHttpsURL
} from "./scripts/functionalities.js";
import {
    getUselessCodeData,
    loadData
} from "./scripts/dataModel";


window.onload = ClearForm();

initReport();

const inputUrl = document.querySelector("#get-url-form");

inputUrl.addEventListener("submit", (e) => {
    e.preventDefault();
    calculate();
});

// Get url input
async function calculate() {

    loadingScreen()

    console.log("calculate");

    let urlInput = inputUrl.elements.url_input.value;
    let selectedIndustry = inputUrl.elements.select_industry.value;

    urlInput = toHttpsURL(urlInput);

    console.log(urlInput, selectedIndustry);

    await loadData(urlInput);
    console.log(getUselessCodeData());
}


function ClearForm() {
    console.log("Window has been reloaded");
    document.querySelector("#get-url-form").reset();
}
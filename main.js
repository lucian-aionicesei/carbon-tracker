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

// initReport();

const inputUrlForm = document.querySelector("#get-url-form");

inputUrlForm.addEventListener("submit", (e) => {
    e.preventDefault();
    calculate();
});

// Get url input
async function calculate() {

    loadingScreen()

    console.log("calculate");

    let urlInput = inputUrlForm.elements.url_input.value;
    let selectedIndustry = inputUrlForm.elements.select_industry.value;

    urlInput = toHttpsURL(urlInput);

    console.log(urlInput, selectedIndustry);

    await loadData(urlInput);
    console.log(getUselessCodeData());
}


function ClearForm() {
    console.log("Window has been reloaded");
    document.querySelector("#get-url-form").reset();
}
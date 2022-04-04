import "./sass/style.scss";
import { initReport } from "./scripts/reportHandler.js";
import { loadingScreen } from "./scripts/functionalities.js";
import { getUselessCodeData, loadData } from "./scripts/dataModel";


window.onload = ClearForm();

initReport();

window.calculate = calculate;

// Get url input
function calculate() {
    
  loadingScreen()

  console.log("calculate");

  const urlInput = document.querySelector("#url_input").value;
  const selectedIndustry = document.querySelector("#select_industry").value;

  console.log(urlInput, selectedIndustry);

}

await loadData("https://www.jungwachthorw.ch/");
console.log(getUselessCodeData());

function ClearForm(){
    console.log("Window has been reloaded");
    document.querySelector("#get-url-form").reset();
}
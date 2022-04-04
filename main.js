import "./sass/style.scss";
import { initReport } from "./scripts/reportHandler.js";
import { getUselessCodeData, loadData } from "./scripts/dataModel";

initReport();

await loadData("https://www.jungwachthorw.ch/");
console.log(getUselessCodeData());

function test() {
    console.log("it's working")
}
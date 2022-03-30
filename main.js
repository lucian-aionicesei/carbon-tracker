import "./sass/style.scss";
import { initReport } from "./scripts/reportHandler.js";
import { createTestPie } from "./scripts/chartsBuilder";

const URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://developers.google.com&key=AIzaSyDVaplgnZ31AzZVkSNiFImxl5WGciW31vg";
const websiteCarbonApiUrl = "https://api.websitecarbon.com/site?url=https%3A%2F%2Fwww.wholegraindigital.com%2F";

fetch(URL)
    .then((data) => {
        return data.json();
    })
    .then((data) => console.log(data));

// fetch(websiteCarbonApiUrl, { mode: "cors" })
//     .then((data) => {
//         console.log(data);
//         return data.json();
//     })
//     .then((data) => console.log(data));

initReport();

// Get url imput

const pagespeedUrl = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=URLHOLDER&key=AIzaSyDVaplgnZ31AzZVkSNiFImxl5WGciW31vg";
const websiteCarbonApiUrl = "https://kea-alt-del.dk/websitecarbon/site/?url=";

let pagespeedData;
let WebsiteCarbonData;



export async function generateCarbonResult(inputUrl) {

    console.log("generating webCarbon result");

    await fetch(websiteCarbonApiUrl + inputUrl)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            WebsiteCarbonData = data;
            console.log(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}



export async function generateSpeedresult(inputUrl) {

    await fetch(pagespeedUrl.replace("URLHOLDER", inputUrl))
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            pagespeedData = data;
            console.log(data);
        });
}

function getAllData() {
    const uselessCode = getUselessCodeData();
}

// returns how much code there is overall, and what part is useless
//(whitespace, unused, legacy) in Kilobytes
export function getUselessCodeData() {
    let fullCodeSize = 0;
    let uselessCodeSize = 0;
    let baseNode = pagespeedData.lighthouseResult.audits;
    console.log(baseNode);
    fullCodeSize = getTotalResourceTypeSize("script") + getTotalResourceTypeSize("stylesheet");

    uselessCodeSize += baseNode["unused-javascript"].details.overallSavingsBytes;
    uselessCodeSize += baseNode["unused-css-rules"].details.overallSavingsBytes;
    uselessCodeSize += baseNode["unminified-javascript"].details.overallSavingsBytes;
    uselessCodeSize += baseNode["unminified-css"].details.overallSavingsBytes;

    return {
        fullCodeSize: Math.round(fullCodeSize / 1024),
        uselessCodeSize: Math.round(uselessCodeSize / 1024)
    };
}

export function getNewimgFormatsData() {
    const allImages = {
        totalImageSize,
        imageSavings,
        theImages: [

        ]
    }
}

function getTotalResourceTypeSize(resourceType) {
    let totalSize = 0;
    let resources = pagespeedData.lighthouseResult.audits["resource-summary"].details.items.filter((resource) => {
        return resource.resourceType.toLowerCase() === resourceType.toLowerCase();
    });

    resources.forEach((resource) => {
        totalSize += resource.transferSize;
    });

    return totalSize;
}
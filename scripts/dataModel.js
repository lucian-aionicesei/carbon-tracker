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

// returns how much code there is overall, and what part is useless
//(whitespace, unused, legacy) in Kilobytes
export function getUselessCodeData() {
    let fullCodeSize = 0;
    let uselessCodeSize = 0;
    let baseNode = pagespeedData.lighthouseResult.audits;
    // console.log(baseNode);
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

export function getImgFormatsData() {
    let allImages = {
        totalImageSize: 0,
        imageSavings: 0,
        theImages: {
            currentSize: [],
            optimizedSize: []
        }
    }

    allImages.totalImageSize = toKilloBytes(getTotalResourceTypeSize('image'));
    let imagePath = pagespeedData.lighthouseResult.audits['modern-image-formats'].details;
    allImages.imageSavings = toKilloBytes(imagePath.overallSavingsBytes);
    allImages.theImages.currentSize[0] = toKilloBytes(imagePath.items[0].totalBytes);
    allImages.theImages.currentSize[2] = toKilloBytes(imagePath.items[2].totalBytes);
    allImages.theImages.currentSize[1] = toKilloBytes(imagePath.items[1].totalBytes);
    allImages.theImages.optimizedSize[0] = toKilloBytes(imagePath.items[0].totalBytes) - toKilloBytes(imagePath.items[0].wastedWebpBytes);
    allImages.theImages.optimizedSize[1] = toKilloBytes(imagePath.items[1].totalBytes) - toKilloBytes(imagePath.items[1].wastedWebpBytes);
    allImages.theImages.optimizedSize[2] = toKilloBytes(imagePath.items[2].totalBytes) - toKilloBytes(imagePath.items[2].wastedWebpBytes);

    return allImages;

}

function getHostInfo() {

    let greenHostData = {
        hasGreenHost: false,
        withGreenHost: 0,
        withoutGreenHost: 0,
    }

    greenHostData.hasGreenHost = WebsiteCarbonData.green;
    greenHostData.withGreenHost = WebsiteCarbonData.statistics.co2.renewable.grams;
    greenHostData.withoutGreenHost = WebsiteCarbonData.statistics.co2.grid.grams;

    return greenHostData;
}

function cleanerThan(imgFormatsData, uselessCodeData, hostData, offScreenResources) {
    let carbonData = {
        cleanerThan: 0,
        gramsPerLoad: 0,
        energyPerLoad: 0,
        totalBytes: 0,
        totalSavings: 0,
        potential: 0
    }

    carbonData.cleanerThan = WebsiteCarbonData.cleanerThan * 100;
    if (WebsiteCarbonData.green) {
        carbonData.gramsPerLaod = WebsiteCarbonData.statistics.co2.renewable.grams;
    } else {
        carbonData.gramsPerLaod = WebsiteCarbonData.statistics.co2.grid.grams;
    }

    carbonData.energyPerLoad = WebsiteCarbonData.statistics.energy * 1000;
    carbonData.totalBytes = imgFormatsData.totalImageSize + uselessCodeData.fullCodeSize;
    carbonData.totalSavings = imgFormatsData.imageSavings + uselessCodeData.uselessCodeSize + offScreenResources.savingsPotential;
    // carbonData.potential = ((carbonData.totalSavings / carbonData.totalBytes) * 100) + ((hostData.withGreenHost / hostData.withoutGreenHost) * 100);
    carbonData.potential = ((carbonData.totalSavings / carbonData.totalBytes) * 100) + 100 - ((hostData.withGreenHost / hostData.withoutGreenHost) * 100)

    return (carbonData);
}

function offscreenResources() {
    const offscreenImages = {
        currentSize: 0,
        savingsPotential: 0
    }
    offscreenImages.currentSize = toKilloBytes(getTotalResourceTypeSize('image'));
    offscreenImages.savingsPotential = toKilloBytes(pagespeedData.lighthouseResult.audits['offscreen-images'].details.overallSavingsBytes);

    return offscreenImages;
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

function toKilloBytes(number) {
    return Math.round(number / 1024);
}

export function collectData() {
    let imgFormatsData = getImgFormatsData();
    let uselessCodeData = getUselessCodeData();
    let hostData = getHostInfo();
    let offScreenResourcesData = offscreenResources();
    let cleanerThanData = cleanerThan(imgFormatsData, uselessCodeData, hostData, offScreenResourcesData);

    return {
        imgFormatsData,
        uselessCodeData,
        hostData,
        offScreenResourcesData,
        cleanerThanData
    }
}
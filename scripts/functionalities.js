"use strict";

window.addEventListener("load", setup);

const burger = document.querySelector(".burger");
const links = document.querySelector(".nav_links");

function setup() {
    document.querySelector("#big").addEventListener("animationend", cloudsAnimation);
    document.querySelector("#small").addEventListener("animationend", cloudsAnimation);

    // Burger menu
    burger.addEventListener("click", toggle);
    burger.addEventListener("mouseover", over);

    burger.addEventListener("mouseout", done);
    const logo = document.querySelector(".logo");

    // document.querySelector("#url-input-form").addEventListener("oninput", calculate);
}

function getIndustry(industryOption) {
    // Get option value
}

function cloudsAnimation() {
    document.querySelector("#big").classList.remove("move");
    document.querySelector("#small").classList.remove("move_small");

    document.querySelector("#big").classList.add("move1");
    document.querySelector("#small").classList.add("move_small1");
}

function toggle() {
    if (burger.classList.contains("toggle")) {
        burger.addEventListener("mouseover", over);
        document.body.style.overflowY = "visible";
    } else {
        burger.removeEventListener("mouseover", over);
        document.body.style.overflow = "hidden";
    }
    links.classList.toggle("nav_toggle");
    burger.classList.toggle("toggle");
}

function over() {
    burger.classList.add("hover");
}

function done() {
    burger.classList.remove("hover");
}

let factsLoop;

export function loadingScreen(status) {
    clearInterval(factsLoop);

    if (status === true) {
        // Hide/show input section
        document.querySelector("#input_section").style.display = "none";

        // Show loading animation
        document.querySelector(".center").style.display = "flex";
    } else {
        // Hide/show input section
        document.querySelector("#input_section").style.display = "block";

        // Show loading animation
        document.querySelector(".center").style.display = "none";
    }

    const firstFact = Math.floor(Math.random() * 9);

    const factText = document.querySelector(".center p");

    // Facts:

    const fact1 = " Twenty emails a day per user over one year, create the same CO2 emissions as a car travelling 1000 km.";

    const fact2 = "Research estimates that by 2025, the IT industry could use 20% of all electricity produced and emit up to 5.5% of the world???s carbon emissions.";

    const fact3 = "If every adult in the UK sent one less ???thank you??? email, it would be equivalent to taking 3,334 diesel cars off the road.";

    const fact4 = " Watching online videos accounts for roughly 1% of global emissions.";

    const fact5 = "Pornography accounts for a third of video streaming traffic, generating as much carbon dioxide as Belgium in a year.";

    const fact6 = "One hour of Netflix consumes 6.1 kilowatt hours (kWh) of electricity. This is enough to drive a Tesla Model S more than 30km.";

    const fact7 = "Online videos alone account for almost 60 percent of global data transfer.";

    const fact8 = "There are over 4 billion internet users as of January 2021, an increase of over 7 percent compared to the previous year.";

    const fact9 = "Computing is expected to account for up to 8% of global power demand by 2030.";

    const facts = [fact1, fact2, fact3, fact4, fact5, fact6, fact7, fact8, fact9];

    factText.textContent = facts[firstFact];

    if (status === true) {
        factsLoop = setInterval(changeFact, 6500);
    } else {
        clearInterval(factsLoop);
    }

    function changeFact() {
        const randomFact = Math.floor(Math.random() * 8 + 1);

        factText.textContent = facts[randomFact];
    }
}

function share() {
    // Ramdon URL example:
    // https://www.carbon-tracker.app/report=id_487474743

    // Generate random id nr.
    let idNumber = Math.floor(Math.random() * 200000 + 1);

    document.querySelector(".generated_url").value = "https://www.carbon-tracker.app/report=id_" + idNumber;

    document.querySelector(".url_section img").addEventListener("click", copyClipboard);
}

function copyClipboard() {
    document.querySelector(".generated_url").select();

    document.execCommand("Copy");
}

share();
// add "https://" extention to URL if needed

export function toHttpsURL(urlInput) {
    if (!urlInput.includes("https://") && !urlInput.includes("www.")) {
        return `https://www.${urlInput}/`;
    } else if (!urlInput.includes("https://")) {
        return `https://${urlInput}/`;
    } else {
        return urlInput;
    }
}

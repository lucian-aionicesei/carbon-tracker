"use strict";
// shuffle array package

window.addEventListener("load", setup);

const burger = document.querySelector(".burger");
const links = document.querySelector(".nav_links");

function setup() {
  document.querySelector(".dropbtn_industry").addEventListener("click", showContent);

  // Burger menu
  burger.addEventListener("click", toggle);
  burger.addEventListener("mouseover", over);

  burger.addEventListener("mouseout", done);
  const logo = document.querySelector(".logo");

  // Close dropdown content if user clicks outside of it
  document.addEventListener("mouseup", function (e) {
    const container_content = document.querySelector(".dropdown-content");
    if (!container_content.contains(e.target)) {
      container_content.classList.remove("flex");
      document.querySelector(".dropbtn_industry").classList.remove("changeArrow");
    }
  });

  // Eventlistener on dropdown options
  let allIndustryOptions = document.querySelectorAll(".filter_industry");
  allIndustryOptions.forEach((industryOption) => {
    industryOption.addEventListener("click", getIndustry);
  });

  document.querySelector(".calculate_btn").addEventListener("click", calculate);
}

function getIndustry(industryOption) {
  // Get option value
  const industryChoice = industryOption.target.getAttribute("data-filter");
  console.log(industryChoice);
  document.querySelector(".dropbtn_industry").textContent = industryChoice;
  document.querySelector(".dropdown-content").classList.remove("flex");
  document.querySelector(".dropbtn_industry").classList.remove("changeArrow");
}

function showContent() {
  document.querySelector(".dropdown-content").classList.toggle("flex");
  document.querySelector(".dropbtn_industry").classList.toggle("changeArrow");
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

function calculate() {
  // Hide input section
  document.querySelector("#input_section").style.display = "none";

  // Show loading animation
  document.querySelector(".center").style.display = "flex";

  const firstFact = Math.floor(Math.random() * 9 + 1);

  const factText = document.querySelector(".center p");

  // Facts:

  const fact1 = " Twenty emails a day per user over one year, create the same CO2 emissions as a car travelling 1000 km.";

  const fact2 = "When browsing the web, an average internet user yearly needs about 365 kWh electricity and 2,900 litres of water, which corresponds to the CO2 that is emitted when you travel a good 1,400 km by car.";

  const fact3 = "If every adult in the UK sent one less “thank you” email, it could save 16,433 tonnes of carbon a year – the equivalent to taking 3,334 diesel cars off the road.";

  const fact4 = " Watching online videos accounts for the biggest chunk of the world's internet traffic – 60% – and generates 300m tonnes of carbon dioxide a year, which is roughly 1% of global emissions.";

  const fact5 = "Pornography accounts for a third of video streaming traffic, generating as much carbon dioxide as Belgium in a year.";

  const fact6 = "One hour of Netflix consumes 6.1 kilowatt hours (kWh) of electricity. This is enough to drive a Tesla Model S more than 30km.";

  const fact7 = "Online videos alone account for almost 60 percent of global data transfer.";

  const fact8 = "There are over 4 billion internet users as of January 2021, an increase of over 7 percent compared to the previous year.";

  const fact9 = "Computing is expected to account for up to 8% of global power demand by 2030.";

  const facts = [fact1, fact2, fact3, fact4, fact5, fact6, fact7, fact8, fact9];

  console.log(facts);

  factText.textContent = facts[firstFact];

  setInterval(changeFact, 6500);

  function changeFact() {
    console.log("changeFact");
    const randomFact = Math.floor(Math.random() * 9 + 1);

    factText.textContent = facts[randomFact];
    console.log(randomFact);

    console.log();
  }
}

function share() {
  console.log("share");
  // Ramdon URL example:
  // https://www.carbon-tracker.app/report=id_487474743

  // Generate random id nr.
  let idNumber = Math.floor(Math.random() * 200000 + 1);

  document.querySelector(".generated_url").value = "https://www.carbon-tracker.app/report=id_" + idNumber;

  document.querySelector(".url_section img").addEventListener("click", copyClipboard);
}

function copyClipboard() {
  console.log("copyClipboard");

  document.querySelector(".generated_url").select();

  document.execCommand("Copy");
}

share();

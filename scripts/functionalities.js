"use strict";
// shuffle array package

window.addEventListener("load", setup);

const burger = document.querySelector(".burger");
const links = document.querySelector(".nav_links");

function setup() {

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

window.calculate = calculate;

function calculate() {
  console.log("calculate");
  // Hide input section
  document.querySelector("#input_section").style.display = "none";

  // Show loading animation
  document.querySelector(".center").style.display = "flex";

  const firstFact = Math.floor(Math.random() * 5 + 1);

  const factText = document.querySelector(".center p");

  // Facts:

  const fact1 = " Twenty emails a day per user over one year, create the same CO2 emissions as a car travelling 1000 km.";

  const fact2 = "When browsing the web, an average internet user yearly needs about 365 kWh electricity and 2,900 litres of water, which corresponds to the CO2 that is emitted when you travel a good 1,400 km by car.";

  const fact3 = "If every adult in the UK sent one less “thank you” email, it could save 16,433 tonnes of carbon a year – the equivalent to taking 3,334 diesel cars off the road.";

  const fact4 = " Watching online videos accounts for the biggest chunk of the world's internet traffic – 60% – and generates 300m tonnes of carbon dioxide a year, which is roughly 1% of global emissions.";

  const fact5 = "Pornography accounts for a third of video streaming traffic, generating as much carbon dioxide as Belgium in a year.";

  const facts = [fact1, fact2, fact3, fact4, fact5];

  // console.log(facts);

  factText.textContent = facts[firstFact];

  setInterval(changeFact, 5000);

  function changeFact() {
    console.log("changeFact");
    const randomFact = Math.floor(Math.random() * 5);

    factText.textContent = facts[randomFact];
    console.log(randomFact);

    console.log();
  }
}

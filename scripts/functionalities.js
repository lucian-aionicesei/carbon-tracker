"use strict";
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
}

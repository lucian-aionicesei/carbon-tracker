"use strict";
window.addEventListener("load", setup);

function setup() {
  document.querySelector(".dropbtn_industry").addEventListener("click", showContent);

  document.addEventListener("mouseup", function (e) {
    const container_content = document.querySelector(".dropdown-content");
    if (!container_content.contains(e.target)) {
      container_content.classList.remove("flex");
      document.querySelector(".dropbtn_industry").classList.remove("changeArrow");
    }
  });

  let allIndustryOptions = document.querySelectorAll(".filter_industry");
  allIndustryOptions.forEach((industryOption) => {
    industryOption.addEventListener("click", getIndustry);
  });
}

function getIndustry(industryOption) {
  const industryChoice = industryOption.target.getAttribute("data-filter");
  console.log(industryChoice);
  document.querySelector(".dropbtn_industry").textContent = industryChoice;
  document.querySelector(".dropdown-content").classList.remove("flex");
  document.querySelector(".dropbtn_industry").classList.remove("changeArrow");
}

function showContent() {
  //   document.querySelector(".dropbtn_industry").addEventListener("click", () => {
  //     document.querySelector(".dropdown-content").classList.remove("flex");
  //   });
  document.querySelector(".dropdown-content").classList.toggle("flex");
  document.querySelector(".dropbtn_industry").classList.toggle("changeArrow");
}

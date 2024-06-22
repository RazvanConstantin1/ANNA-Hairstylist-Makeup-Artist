"use strict";

// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },

  // In the viewport
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

// MOBILE NAVIGATION
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const navLinks = document.querySelectorAll(".main-nav-link");

if (headerEl.classList.contains("nav-open")) {
  headerEl.classList.toggle("nav-open");
}
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
  hiddenIcons();
});

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
    cartIndexZ();
  });
});

// Hide cart when Cattegory shown //
// TODO: Solve the icons visibility bug

const followUsEl = document.querySelector(".follow-us");
const hiddenIcons = () => {
  if (headerEl.hasAttributes("nav-open")) {
    followUsEl.classList.add("hide");
  } else if (!headerEl.hasAttributes("nav-open")) {
    followUsEl.classList.remove("hide");
  }
};

const cartIndexZ = () => {
  followUsEl.classList.remove("hide");
};

// Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  entry.target.style.overflow = "hidden";
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.03,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
  document.body.style.overflow = "hidden";
});

// Loading imgs
const imgTargets = document.querySelectorAll(".async-img");
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

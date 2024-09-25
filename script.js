import { preloadSounds, playSong } from "./modules/sound.mjs";
import {
  makeButtons,
  addAnimationButtons,
  makeDialog,
} from "./modules/elements.mjs";

//here you can change or add animations and colors
let animations = [
  {
    colorAll: "rgba(231, 127, 95, 0.2)",
    layer: "layer5",
  },
  {
    line: "path885", //the id from the svg
    animation: "spin", //animations are defined in the css
    layer: "layer1", //the layer the path is in
  },
  {
    line: "path899",
    color: "lightgreen",
    layer: "layer1",
  },
  {
    colorAll: "rgba(60, 100, 200, 0.3)",
    layer: "layer1",
  },
  {
    line: "path1744",
    animation: "wave",
    layer: "layer3",
  },
  {
    line: "path1827",
    color: "pink",
    layer: "layer3",
  },
  {
    colorAll: "rgba(60, 179, 113, 0.3)",
    layer: "layer3",
  },
];

//volume between 0-1
let volume = 0.5;
//all the layers
const layers = document.querySelectorAll("g");
//all the lines
const allLines = document.querySelectorAll("g>*");
//the section where the image is
const section = document.querySelector(".buttonContainer");
//the animal saved in the url-parameters
let animalString = new URLSearchParams(window.location.search);
//all the sound files
let allSounds = preloadSounds(volume, layers);
//the button that plays a creatures song
const songButton = document.getElementById("songButton");
//the volume control
const volumeControl = document.getElementById("volumeControl");
//the volume label
const volumeLabel = document.getElementById("volumeLabel");
//the button for saving a creature
const saveButton = document.getElementById("saveButton");
const imageContainer = document.getElementById("imageContainer");

//run some functions on page load
//add all buttons
makeButtons(section, layers);
//add the extra animation/color buttons
addAnimationButtons(animations);
//class is added initially to prevent svg from showing up before each line is hidden
imageContainer.classList.remove("invisible");
//set the label for the volume
volumeLabel.innerText = "Volume: " + volume * 10;

//eventlisteners
volumeControl.addEventListener("input", () => {
  volume = volumeControl.value / 10;
  allSounds = preloadSounds(volume, layers);
  volumeLabel.innerText = "Volume: " + volume * 10;
});

songButton.addEventListener("click", () => {
  playSong(allLines, allSounds);
});

saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  generateLink();
});

//detects clicks on buttons and shows or hides lines
section.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON" && !e.target.classList.contains("fas")) {
    if (e.target.className && e.target.className != "undefined") {
      songButton.classList.remove("hidden");
    }
    e.preventDefault();
    for (let i = 0; i < allLines.length; i++) {
      if (allLines[i].classList.contains(e.target.classList[0])) {
        allLines[i].classList.toggle("hidden");
        if (!allLines[i].classList.contains("hidden")) {
          let buttonClass = e.target.classList.value;
          let numbersArray = [];
          if (buttonClass) {
            numbersArray = buttonClass.split("|");
          }
          let i = numbersArray[0];
          let j = numbersArray[1];
          let soundFile = allSounds[i][j];
          soundFile.play();
        }
      }
    }
    const isPressed = e.target.getAttribute("aria-pressed");
    isPressed === "true"
      ? e.target.setAttribute("aria-pressed", "false")
      : e.target.setAttribute("aria-pressed", "true");
  }
});

//makes the link for the saved animal
function generateLink() {
  let showingLines = [];
  let savedAnimations = [];
  const animalName = document.getElementById("animalName").value;
  let link = "";
  for (const line in allLines) {
    if (
      allLines[line].classList &&
      !allLines[line].classList.contains("hidden")
    ) {
      showingLines.push(allLines[line].classList[0]);
    }
  }
  showingLines = showingLines.join(); //make string from array
  for (const i in animations) {
    if (
      animations[i].color &&
      hasColor(document.getElementById(animations[i].line))
    ) {
      savedAnimations.push(i);
    }
    if (
      animations[i].animation &&
      isAnimated(
        document.getElementById(animations[i].line),
        animations[i].animation
      )
    ) {
      savedAnimations.push(i);
    }
  }
  if (showingLines) {
    if (animalName) {
      if (window.location.pathname) {
        link = `<div id = "dialogDescription">Link to your creation (opens in new tab): <a href = "${
          window.location.origin + window.location.pathname
        }?a=${showingLines}&n=${animalName}&m=${savedAnimations}" target ="_blank">${
          window.location.origin + window.location.pathname
        }?a=${showingLines}&n=${animalName}&m=${savedAnimations}</a></div>`;
      } else {
        link = `<div id = "dialogDescription">Link to your creation (opens in new tab):<br> <a href = "${window.location.origin}?a=${showingLines}&n=${animalName}&m=${savedAnimations}" target ="_blank">${window.location.origin}?a=${showingLines}&n=${animalName}&m=${savedAnimations}</a></div>`;
      }
    } else {
      link = `<div id = "dialogDescription">Please name your creation.</div>`;
    }
  } else {
    link = `<div id = "dialogDescription">There is nothing to save yet.</div>`;
  }
  makeDialog(link);
}

//gets the parameters for the saved lines
let savedAnimal = (function () {
  let animalArray = animalString.getAll("a"); //tar bort frågetecken och gör array med ett värde
  if (animalArray.length > 0) {
    let savedAnimal = animalArray.toString().split(","); //gör först till sträng sedan array med separata värden
    return savedAnimal;
  }
})();

//adds animations when printing an animal
function addEffects() {
  let savedParams = animalString.getAll("m");
  if (savedParams[0]) {
    savedParams = savedParams.toString().split(",");
    for (let i in savedParams) {
      let animationIndex = savedParams[i];
      if (animations[animationIndex].color) {
        document.getElementById(animations[animationIndex].line).style.fill =
          animations[animationIndex].color;
      }
      if (animations[animationIndex].animation) {
        document
          .getElementById(animations[animationIndex].line)
          .classList.toggle(animations[animationIndex].animation);
      }
      let button = document.querySelector(
        "." + animations[animationIndex].line
      );
      button.setAttribute("aria-pressed", "true");
    }
  }
}

//prints out saved animal from the url
function printAnimal() {
  if (savedAnimal) {
    songButton.classList.remove("hidden");
    for (const savedLine in savedAnimal) {
      for (const line in allLines) {
        if (
          allLines[line].classList &&
          allLines[line].classList.contains(savedAnimal[savedLine])
        ) {
          allLines[line].classList.remove("hidden");
          const pressedButton = document.getElementsByClassName(
            savedAnimal[savedLine]
          )[1];
          pressedButton.setAttribute("aria-pressed", "true");
          break;
        }
      }
    }
    addEffects();
    const headline = `<h2>Someone drew you a ${animalString.get(
      "n"
    )}</h2><span><a href="javascript:void(0)" id="run">run away ${animalString.get(
      "n"
    )}</a>, you are free now</span>`;
    document.querySelector("main").insertAdjacentHTML("afterbegin", headline);
    document.querySelector("title").textContent = animalString.get("n");
    document.getElementById("run").addEventListener("click", (e) => {
      e.preventDefault;
      run();
    });
  }
}

function run() {
  document.querySelector("svg").classList.add("run");
  setTimeout(function () {
    window.location = window.location.pathname;
  }, 4000);
}

//checks if the element has a fill
function hasColor(element) {
  let color = window.getComputedStyle(element, null).getPropertyValue("fill");
  if (color == "none") {
    return false;
  } else {
    return true;
  }
}

//checks if element has animation-class
function isAnimated(element, animation) {
  if (element.classList.contains(animation)) return true;
}

//runs function that shows animal
printAnimal();

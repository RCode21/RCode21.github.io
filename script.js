//here you can change or add animations and colors
let animations = [
  {
    line: "path885", //the id from the svg
    animation: "spin", //animations are defined in the css
    layer: "layer1", //the layer the path is in
  },
  {
    line: "path1744",
    animation: "wave",
    layer: "layer3",
  },
  {
    line: "path899",
    color: "lightgreen",
    layer: "layer1",
  },
  {
    line: "path1827",
    color: "pink",
    layer: "layer3",
  },
  {
    line: "path899",
    animation: "wave",
    layer: "layer1",
  },
  {
    colorAll: "rgba(231, 127, 95, 0.2)",
    layer: "layer5",
  },
  {
    colorAll: "rgba(60, 179, 113, 0.3)",
    layer: "layer3",
  },
];

let sound = true;
const soundButton = document.querySelector("#soundButton");
soundButton.innerText = "sound is on";

soundButton.addEventListener("click", () => {
  if (sound) {
    sound = false;
    soundButton.innerText = "sound is off";
  } else {
    sound = true;
    soundButton.innerText = "sound is on";
  }
});

//all the layers
const layers = document.querySelectorAll("g");
//all the lines
const allLines = document.querySelectorAll("g>*");

//html-elements
const section = document.querySelector("section");
const aside = document.querySelector("aside");
const linkContainer = document.querySelector("#linkContainer");

//the animal saved in the url-parameters
let animalString = new URLSearchParams(window.location.search);

//adds classes and makes buttons
for (let i = 0; i < layers.length; i++) {
  //for every layer, repeat the following instructions:
  let buttonContainer = document.createElement("span"); //make a span element
  buttonContainer.classList.add(layers[i].id); //add class to span (id of the layer it shows)
  const lines = layers[i].children; //find all lines in the layer
  for (let j = 0; j < lines.length; j++) {
    //then for every line, repeat the following instructions:
    lines[j].classList.add("hidden", i + "|" + j); //give it two classes (one that hides it)
    let button = document.createElement("button"); //make a button
    button.innerText = j + 1; //write a number on the button
    button.classList.add(i + "|" + j); //give it a class (same as the line)
    buttonContainer.appendChild(button); //put the button in the span-element
  }
  section.appendChild(buttonContainer); //put the span-element inside the section-element
}

//connects the save-function to the save-button
const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  generateLink();
});

//runs function that adds the extra animation/color buttons
addAnimationButtons();

//detects clicks on buttons and shows or hides lines
section.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    e.preventDefault();
    for (let i = 0; i < allLines.length; i++) {
      if (allLines[i].classList.contains(e.target.classList[0])) {
        allLines[i].classList.toggle("hidden");
        if (sound && !allLines[i].classList.contains("hidden"))
        {let audio = new Audio("./sounds/" + [i] + ".mp3");
        audio.play();}
      }
    }
    e.target.classList.toggle("on"); //changes button look
  }
});

//adds buttons that adds animations when clicked
function addAnimationButtons() {
  for (i in animations) {
    let button = document.createElement("button");
    button.classList.add(animations[i].line);
    button.innerText = "¤";
    let container = document.querySelector("." + animations[i].layer);
    let line = document.getElementById(animations[i].line);
    let animation = animations[i].animation;
    let color = animations[i].color;
    let colorAll = animations[i].colorAll;
    const animal = document.querySelectorAll("#" + animations[i].layer + ">*");
    if (animation) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        line.classList.toggle(animation);
      });
    }
    if (color) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        let currentColor = line.style.fill;
        if (currentColor != color) {
          line.style.fill = color;
        } else {
          line.style.fill = "none";
        }
      });
    }
    if (colorAll) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        for (let i = 0; i < animal.length; i++) {
          if (animal[i].style.fill != colorAll) {
            animal[i].style.fill = colorAll;
          } else {
            animal[i].style.fill = "none";
          }
        }
      });
    }
    container.appendChild(button);
  }
}

//makes the link for the saved animal
function generateLink() {
  let showingLines = [];
  let savedAnimations = [];
  const animalName = document.getElementById("animalName").value;
  let link = "";
  for (line in allLines) {
    if (
      allLines[line].classList &&
      !allLines[line].classList.contains("hidden")
    ) {
      showingLines.push(allLines[line].classList[0]);
    }
  }
  showingLines = showingLines.join(); //make string from array
  for (i in animations) {
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
    if (window.location.pathname) {
      link = `link to your creature: <a href = "${
        window.location.origin + window.location.pathname
      }?a=${showingLines}&n=${animalName}&m=${savedAnimations}" target ="_blank">${
        window.location.origin + window.location.pathname
      }?a=${showingLines}&n=${animalName}&m=${savedAnimations}</a>`;
    } else {
      link = `link to your creature: <a href = "${window.location.origin}?a=${showingLines}&n=${animalName}&m=${savedAnimations}" target ="_blank">${window.location.origin}?a=${showingLines}&n=${animalName}&m=${savedAnimations}</a>`;
    }
  } else {
    link = "you can't save an invisible animal";
  }
  linkContainer.innerHTML = "";
  linkContainer.insertAdjacentHTML("beforeend", link);
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
  console.log(savedParams);
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
      button.classList.toggle("on");
    }
  }
}

//prints out saved animal from the url
function printAnimal() {
  if (savedAnimal) {
    for (savedLine in savedAnimal) {
      for (line in allLines) {
        if (
          allLines[line].classList &&
          allLines[line].classList.contains(savedAnimal[savedLine])
        ) {
          allLines[line].classList.remove("hidden");
          document
            .getElementsByClassName(savedAnimal[savedLine])[1]
            .classList.toggle("on");
          break;
        }
      }
    }
    addEffects();
    const headline = `<h2>Someone drew you a creature called ${animalString.get(
      "n"
    )}</h2><p><a href="javascript:void(0)" id="run">run away ${animalString.get(
      "n"
    )}, you are free now</a></p>`;
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

//this module contains everything that has to do with creating html-elements

export { makeButtons, addAnimationButtons, makeDialog };

//makes buttons, adds classes
function makeButtons(section, layers) {
  for (let i = 0; i < layers.length; i++) {
    //for every layer, repeat the following instructions:
    let container = document.createElement("section");
    container.classList.add("buttonSection"); 
    let menuButton = document.createElement("button");
    menuButton.id = "accordion" + i;
    menuButton.setAttribute("aria-controls", "section" + i);
    if (i == 0) {
      menuButton.classList.add("fas", "fa-minus");
      menuButton.setAttribute("aria-expanded", "true");
    } //add css-class - same as id of the layer/animal
    else {
      menuButton.classList.add("fas", "fa-plus");
      menuButton.setAttribute("aria-expanded", "false");
    }
    menuButton.addEventListener("click", (e) => {
      toggleMenu(e);
    });
    let buttonContainer = document.createElement("span"); //make a span element
    buttonContainer.id = "section" + i;
    buttonContainer.setAttribute("aria-labelledby", "accordion" + i);
    buttonContainer.classList.add(layers[i].id); //add css-class to span (same as id of the layer/animal)
    const lines = layers[i].children; //find all lines in the layer
    for (let j = 0; j < lines.length; j++) {
      //then for every line, repeat the following instructions:
      lines[j].classList.add("hidden", i + "|" + j); //give it two classes (one that hides it)
      let button = document.createElement("button"); //make a button
      button.innerText = j + 1; //write a number on the button
      button.classList.add(i + "|" + j); //give it a class (same as the line);
      button.setAttribute("aria-pressed", "false");
      buttonContainer.appendChild(button); //put the button in the span-element
    }
    container.append(menuButton, buttonContainer);
    section.appendChild(container); //put the span-element inside the section-element
  }
}

//hides and shows sections of buttons
function toggleMenu(e) {
  const isExpanded = e.target.getAttribute("aria-expanded");
  isExpanded === "true" ? e.target.setAttribute("aria-expanded", "false") : e.target.setAttribute("aria-expanded", "true");
  e.target.classList.toggle("fa-plus");
  e.target.classList.toggle("fa-minus");
}

//creates an array containing the alphabeth
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

//adds buttons that adds animations when clicked
function addAnimationButtons(animations) {
  for (let i in animations) {
    let button = document.createElement("button");
    button.setAttribute("aria-pressed", "false");
    button.classList.add(animations[i].line);
    button.innerText = alphabet[i];
    let container = document.querySelector("span." + animations[i].layer);
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

function makeDialog(link) {
  const dialog = document.createElement("dialog");
  dialog.setAttribute("open", "");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-describedby", "dialogDescription");
  dialog.setAttribute("aria-modal", "true");
  const dialogMessage = document.createElement("p");
  const closeButton = document.createElement("button");
  closeButton.setAttribute("aria-label", "close dialog");
  closeButton.classList.add("fas", "fa-times");
  closeButton.addEventListener("click", closeDialog);
  dialogMessage.appendChild(closeButton);
  dialogMessage.setAttribute("tabindex", "0");
  dialog.appendChild(dialogMessage);
  dialogMessage.insertAdjacentHTML("beforeend", link);
  document.body.appendChild(dialog);
  document.querySelector("main").setAttribute("aria-hidden", "true");
  document.querySelector(".controls").setAttribute("aria-hidden", "true");
}

function closeDialog() {
  let dialog = document.querySelector("dialog");
  document.body.removeChild(dialog);
  document.querySelector("main").removeAttribute("aria-hidden");
  document.querySelector(".controls").removeAttribute("aria-hidden");
}

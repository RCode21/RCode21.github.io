//here you can change colors
const color1 = "lightgreen";
const color2 = "pink";

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
for (let i = 0; i < layers.length; i++) { //for every layer, repeat the following instructions:
    let buttonContainer = document.createElement("span"); //make a span element
    buttonContainer.classList.add(layers[i].id); //add class to span (id of the layer it shows)
    const lines = layers[i].children; //find all lines in the layer
    for (let j = 0; j < lines.length; j++) { //then for every line, repeat the following instructions:
        lines[j].classList.add("hidden", i + "|" + j) //give it two classes (one that hides it) 
        let button = document.createElement("button"); //make a button
        button.innerText = j + 1; //write a number on the button
        button.classList.add(i + "|" + j); //give it a class (same as the line)
        buttonContainer.appendChild(button); //put the button in the span-element   
    }
    section.appendChild(buttonContainer); //put the span-element inside the section-element 
}


const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    generateLink();
});

//adds the extra animation buttons for selected animals
const snailButtonContainer = document.querySelector(".layer1");
const slothButtonContainer = document.querySelector(".layer3");
addColorButton(snailButtonContainer, "path899", color1);
addAnimationButton(snailButtonContainer, "path885", "spin");
addColorButton(slothButtonContainer, "path1827", color2);
addAnimationButton(slothButtonContainer, "path1744", "wave");

//detects clicks on buttons and shows or hides lines
section.addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
        for (let i = 0; i < allLines.length; i++) {
            if (allLines[i].classList.contains(e.target.classList[0])) {
                allLines[i].classList.toggle("hidden");
            }
        }
        e.target.classList.toggle("on"); //changes button look
    }
    else {console.log(e.target.tagName)}
});

//adds a button that adds an animation when clicked
function addAnimationButton(container, line, animation) {
    let animationButton = document.createElement("button");
    animationButton.innerText = "¤"
    animationButton.addEventListener("click", () => {
        document.getElementById(line).classList.toggle(animation);
    })
    container.appendChild(animationButton);
}

//adds a buttons that changes color of a part when clicked
function addColorButton(container, line, color) {
    let colorButton = document.createElement("button");
    colorButton.classList.add(line);
    colorButton.innerText = "¤"; //here you can change the button text
    colorButton.addEventListener("click", () => {
        let partToColor = document.getElementById(line);
        if (window.getComputedStyle(partToColor).fill != "none") {
            partToColor.style.fill = "none"
        } else {
            partToColor.style.fill = color
        }
    });
    container.appendChild(colorButton);
}

function generateLink() {
    let showingLines = [];
    let animations = [];
    let colors = [];
    for (line in allLines) {
        if (allLines[line].classList && !allLines[line].classList.contains("hidden")) {
            showingLines.push(allLines[line].classList[0])
        }
    }
    showingLines = showingLines.join(); //gör array till string
    if (hasColor(document.getElementById("path899"))) {
        colors.push(1)
    };
    if (hasColor(document.getElementById("path1827"))) {
        colors.push(2)
    };
    if (isAnimated(document.getElementById("path885"), "spin")) {
        animations.push("a");
    }
    if (isAnimated(document.getElementById("path1744"), "wave")) {
        animations.push("b");
    }
    const animalName = document.getElementById("animalName").value;
    let link;
    if (showingLines) {
        if (window.location.pathname) {
            link = `link to your creature: <a href = "${window.location.origin + window.location.pathname}?a=${showingLines}&n=${animalName}&m=${animations}&c=${colors}" target ="_blank">${window.location.origin}?a=${showingLines}&n=${animalName}&m=${animations}&c=${colors}</a>`;
        } else {
            link = `link to your creature: <a href = "${window.location.origin}?a=${showingLines}&n=${animalName}&m=${animations}&c=${colors}" target ="_blank">${window.location.origin}?a=${showingLines}&n=${animalName}&m=${animations}&c=${colors}</a>`;
        }
    } else {
        link = "you can't save an invisible animal"
    }
    linkContainer.innerHTML ="";
    linkContainer.insertAdjacentHTML("beforeend", link)
    return link;
}

let savedAnimal = function () {
    let animalArray = animalString.getAll('a'); //tar bort frågetecken och gör array med ett värde
    if (animalArray.length > 0) {
        let savedAnimal = animalArray.toString().split(","); //gör först till sträng sedan array med separata värden 
        return savedAnimal;
    };
}()

function addEffects(params) {
    let savedParams = animalString.getAll(params);
    if (savedParams.length > 0) {
        savedParams = savedParams.toString().split(","); //gör först till sträng sedan array med separata värden
        for (let i in savedParams) {
            if (savedParams[i] == "1") {
                document.getElementById("path899").style.fill = color1;
                document.querySelector(".path899").classList.toggle("on");
            }
            if (savedParams[i] == "2") {
                document.getElementById("path1827").style.fill = color2;
                document.querySelector(".path1827").classList.toggle("on");
            }
            if (savedParams[i] == "a") {
                document.getElementById("path885").classList.toggle("spin");
                document.querySelector(".path1827").classList.toggle("on");
            }
            if (savedParams[i] == "b") {
                document.getElementById("path1744").classList.toggle("wave");
                document.querySelector(".path1827").classList.toggle("on");
            }
        }
    }
}

function printAnimal() {
    if (savedAnimal) {
        for (savedLine in savedAnimal) {
            for (line in allLines) {
                if (allLines[line].classList && allLines[line].classList.contains(savedAnimal[savedLine])) {
                    allLines[line].classList.remove("hidden");
                    document.getElementsByClassName(savedAnimal[savedLine])[1].classList.toggle("on");
                    break
                }
            }
        }
        addEffects("m");
        addEffects("c");
        const headline = `<p>Feel free to draw your own creature. This one is called <h1>${animalString.get('n')}</h1>`
        document.querySelector("main").insertAdjacentHTML("afterbegin", headline)
    }
}

function hasColor(element) {
    let color = window.getComputedStyle(element, null).getPropertyValue("fill");
    if (color == "none") {
        return false
    } else {
        return true
    }
}

function isAnimated(element, animation) {
    if (element.classList.contains(animation))
        return true
}

printAnimal();
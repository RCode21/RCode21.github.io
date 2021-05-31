//here you can change colors
const color1 = "lightgreen";

//all the layers
const layers = document.querySelectorAll("g");
//all the lines
const allLines = document.querySelectorAll("g>*");

//the section that the buttons are put in
const section = document.querySelector("section");

//adds classes and makes buttons
for (let i = 0; i < layers.length; i++) { //for every layer, repeat the following instructions:
    let buttonContainer = document.createElement("span"); //make a span element
    buttonContainer.classList.add("animal" + i); //add class to span (just for styling)
    const lines = layers[i].children; //find all lines in the layer
    for (let j = 0; j < lines.length; j++) { //then for every line, repeat the following instructions:
        lines[j].classList.add("hidden", "animal" + i + "line" + j) //give it two classes (one that hides it) 
        let button = document.createElement("button"); //make a button
        button.innerText = j + 1; //write a number on the button
        button.classList.add("animal" + i + "line" + j); //give it a class (same as the line)
        buttonContainer.appendChild(button); //put the button in the span-element   
    }
    if (i == 0) //i is 0 on the snail-layer
    {
        addSpecialButtons(buttonContainer, "part8", "part6", color1, "spin");//add the animation-buttons
    } 
    section.appendChild(buttonContainer); //put the span-element inside the section-element
}

//detects clicks on buttons and runs the function showPart
section.addEventListener("click", (e) => {
    showPart(e.target.classList)
});

//makes the lines show up or hide
function showPart(clicked) {
    for (let i = 0; i < allLines.length; i++) {
        if (allLines[i].classList.contains(clicked)) {
            allLines[i].classList.toggle("hidden");
        }
    }
}

function addSpecialButtons(container, line1, line2, color, animation) { 
    //adds a buttons that changes color of a part when clicked
    let colorButton = document.createElement("button");
    colorButton.innerText = "a"; //here you can change the button text
    colorButton.addEventListener("click", () => {
        let partToColor = document.getElementById(line1);
        if (window.getComputedStyle(partToColor).fill != "none") {
            partToColor.style.fill = "none"
        } else {
            partToColor.style.fill = color
        }
    });
    //adds a button that adds an animation when clicked
    let animationButton = document.createElement("button");
    animationButton.innerText = "c"
    animationButton.addEventListener("click", () => {
        document.getElementById(line2).classList.toggle(animation)
    })
    container.append(animationButton, colorButton);
}
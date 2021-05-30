//here you can change colors
const color1 = "lightgreen";

//all the parts of the image 
// const imageParts = document.getElementById("layer1").children;
// const imageParts2 = document.getElementById("layer3").children;

//all the layers
const layers = document.querySelectorAll("g");
//all the lines
const allLines = document.querySelectorAll("g>*");

//the section that the buttons are put in
const section = document.querySelector("section");

//hides all parts
// for (let index = 0; index < imageParts.length; index++) {
//     imageParts[index].classList.add("hidden")
// };

//adds some classes and makes buttons
for (let i = 0; i < layers.length; i++) { // for every layer, repeat the following instructions:
    const lines = layers[i].children;
    let div = document.createElement("div");
    div.classList.add("animal" + i);
     //find all lines in the layer
    for (let j = 0; j < lines.length; j++) { // then for every line, repeat the following instructions:
        lines[j].classList.add("hidden", "animal" + i + "line" + j) //give it two classes (one that hides it) 
        let button = document.createElement("button"); //make a button
        button.innerText = j + 1; //write a number on the button
        button.classList.add("animal" + i + "line" + j); //give it a class (same as the line)
        // button.classList.add("animal" + i); //this one is just for styling
        div.appendChild(button); //put the button in the div-element   
    }
    if (i==0)
    addSpecialButtons(div);
    section.appendChild(div);
}

//makes a button for each part of the image
// for (let index = 0; index < imageParts.length; index++) {
//     let button = document.createElement("button");
//     button.innerText = index + 1;
//     button.id = "btn" + index;
//     section.appendChild(button);
// }

//detects clicks on buttons and runs the function showPart
section.addEventListener("click", (e) => {
    showPart(e.target.classList)
});

//makes the lines show up or hide
function showPart(clicked) {
    if (clicked) {
        for (let i = 0; i < allLines.length; i++)
            if (allLines[i].classList.contains(clicked)) {
                allLines[i].classList.toggle("hidden");
            }
    }
}

function addSpecialButtons(element)
{//adds a button that changes color of a part when clicked
let colorButton = document.createElement("button");
colorButton.innerText = "a"; //here you can change the button text
colorButton.addEventListener("click", () => {
    let lettuce = document.getElementById("part8");
    if (window.getComputedStyle(lettuce).fill != "none") {
        lettuce.style.fill = "none"
    } else {
        lettuce.style.fill = color1
    }
});
element.appendChild(colorButton);
//adds a button that adds an animation when clicked
let spinButton = document.createElement("button");
spinButton.innerText = "c"
spinButton.addEventListener("click", () => {
    document.querySelector("#part6").classList.toggle("spin")
})
element.appendChild(spinButton);}
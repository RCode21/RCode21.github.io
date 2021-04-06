//here you can change colors
const color1 = "lightgreen";

//all the parts of the image 
const imageParts = document.getElementById("layer1").children;

//the section that the buttons are put in
const section = document.querySelector("section");

//hides all parts
for (let index = 0; index < imageParts.length; index++) {
    imageParts[index].classList.add("hidden")
};

//makes a button for each part of the image
for (let index = 0; index < imageParts.length; index++) {
    let button = document.createElement("button");
    button.innerText = index + 1;
    button.id = "btn" + index;
    section.appendChild(button);
}

//detects clicks on buttons and runs the function showPart
section.addEventListener("click", (e) => {
    showPart(e.target.id)
});

//makes the parts of the image show up
function showPart(clickedBtn) {
    if (clickedBtn) {
        let partId = clickedBtn.replace("btn", "part")
        let part = document.getElementById(partId);
        part.classList.toggle("hidden")
    }
}

//adds a button that changes color of a part when clicked
let colorButton = document.createElement("button");
colorButton.innerText = "a"; //here you can change the button text
colorButton.addEventListener("click", () => {
    let lettuce = document.getElementById("part8");
    if (window.getComputedStyle(lettuce).fill != "none")
    {lettuce.style.fill = "none"}
    else {lettuce.style.fill = color1}
});
section.appendChild(colorButton);


//adds a button that adds an animation when clicked
let spinButton = document.createElement("button");
spinButton.innerText = "c"
spinButton.addEventListener("click", () => {
    document.querySelector("#part6").classList.toggle("spin")
})
section.appendChild(spinButton);
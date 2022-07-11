var diffEls = document.querySelectorAll(".diff__btn"); // Reference to the two spans
var diffEl = document.querySelector(".diff__btn.active").innerHTML; // Reference to the active span
var n = diffEl; // Active span
var colorsEl = document.querySelector(".colors"); // Reference to the main div containing all blocks
var colorsBlocks;
var rgbEl = document.querySelector(".rgb"); // Reference to the paragraph containing rgb colors in words
var statusEl = document.querySelector(".status"); // Reference to the paragraph containing feedback to the user.
var colors = []; // Initializes empty array that will contain colors based on the choice of the number of tiles the user picks
var position;
var pickedColor;

//createBlocks(n);
resetGame();

function checkColors(e) {
    //console.log(e.target.style.backgroundColor); //debug line
    //console.log(colors[pickedColor]); // debug line
    if (e.target.style.backgroundColor == colors[pickedColor]) {
      statusEl.innerHTML = "<h2>YOU WON</h2>";
      let corrects = document.querySelectorAll(".colors__block");
      for (let i = 0; i < corrects.length; i++) {
        corrects[i].style.backgroundColor = colors[pickedColor];
      }
      document.getElementsByTagName("h1")[0].classList.add("won");
    } else {
      statusEl.innerHTML = "<h2>TRY AGAIN</h2>";
      e.target.style.backgroundColor = "white";
    }
} 

function resetGame(n) {
  try {
    throw n;
  } catch (error) {
    if (typeof n == 'undefined') {
      console.error("Undefined");
      n = 6;
    }
  }
  document.getElementsByTagName("h1")[0].classList.remove("won");
  createBlocks(n);
  document.body.style.color = "black";
  //colors = [];
  pickColors(); // Adds the colors to the array based on the number of blocks chosen by the user.
  pickedColor = random(n); // Chooses random color's index.
  rgbEl.innerHTML = colors[pickedColor]; // Displays the random color chooses to the paragraph containing rgb colors in words & numbers.
  setColors(); 
  statusEl.innerHTML = 
    "Try to guess the right color based on the RGB value by clicking on the blocks.";
}

function setColors() {
  for (var i = 0; i < colorsBlocks.length; i++) {
    colorsBlocks[i].style.backgroundColor = colors[i];
  }
}

function pickColors() {
  for (var i = 0; i < n; i++) {
    colors.push(randomColor()); // Adds the random colors to the array. (Initially empty)
  }
}

function randomColor() {
  return "rgb(" + random(255) + ", " + random(255) + ", " + random(255) + ")";
}

function random(r) {
  return Math.floor(Math.random() * r);
}

function setNumberOfTiles(e) {
  // your code here
  let val = e.target.innerHTML;
  
  console.log(val);
  console.log(e.target.classList)
  
  if (val == 9) {
    e.target.classList.add("active");
    document.querySelector("#a").classList.remove("active");
  }
  if (val == 6) {
    e.target.classList.add("active");
    document.querySelector("#b").classList.remove("active");
  }
  resetGame(val);
}

function createBlocks(num) {
  colorsEl.innerHTML = "";

  // here is an example of a loop that is used to create the blocks of color depending on you choice ie 6 or 9, however you need to add event listeners
  
  for (var i = 0; i < num; i++) {
    //console.log(i); // debug line
    //console.log(colorsEl.outerHTML); // debug line
    var block = document.createElement("div"); // Returns an object reference to a node / Returns the element that has just been created in the DOM. ... Initially this is a DocumentFragment
    //console.log(colorsEl.outerHTML); // debug line
    block.classList.add("colors__block"); // classList is a read-only property that returns a live DOMTokenList collection of the class attributes of the element.
    //console.log(colorsEl.outerHTML);
    colorsEl.appendChild(block); // appendChild adds a node to the end of the list of children of the parent node (which in this case is the main div of class .colors)
    //console.log(colorsEl.outerHTML);
    //console.log(count); // debug line
  }
  colorsBlocks = document.querySelectorAll(".colors__block"); // Returns a non-live NodeList containing the created div elements
  //console.log(colorsBlocks); //debug line
  for (var i = 0; i < colorsBlocks.length; i++) {
    colorsBlocks[i].addEventListener("click", checkColors);
    }
}

for (let j = 0; j < diffEls.length; j++) {
  diffEls[j].addEventListener("click", setNumberOfTiles)
}


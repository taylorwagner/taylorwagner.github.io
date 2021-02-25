const gameContainer = document.getElementById("game");
let notAllowed = false; //will prevent the user from clicking on more than 2 cards at a time

//2 different cards that need to be compared
let possible1 = null;
let possible2 = null;

let cardsDisplayed = 0;

const COLORS = [
  "palegoldenrod",
  "plum",
  "lightgreen",
  "lightsalmon",
  "lightslategrey",
  "lightseagreen",
  "palegoldenrod",
  "plum",
  "lightgreen",
  "lightsalmon",
  "lightslategrey",
  "lightseagreen"
];

//animation practice with the heading
let heading = document.querySelectorAll('.heading');

function randomRGB(){
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r},${g},${b})`;
}

setInterval(function(){
for(let letter of heading){
  letter.style.color = randomRGB();
}
}, 1000);

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(notAllowed) return;
  if(event.target.classList.contains("displayCard")) return; //prevent the user from clicking on the same card twice

  let pick = event.target; //what the user clicked on
  pick.style.backgroundColor = pick.classList[0]; //setting backgroundColor to the color class established in createDivsForColors()


  //in this operation, we are assigning empty or "available" vaiables a value based on if the user clicks. possible1 gets priority, once possible1 has a value then possible2 can get a value
  if(!possible1 || !possible2) { //checking to see if either of these are falsey (no click has been assigned, avaiable to be assigned a value)
    pick.classList.add("displayCard"); //additional class added due to user clicking on div
    possible1 = possible1 || pick; //if storing a value, keep storing that value (of nothing, null!!) -- if not, be the value of what the user clicked on

    //CONDITION ? RETURN VALUE IF CONDITION IS TRUE : RETURN VALUE IF CONDITION IS FALSE
    possible2 = pick === possible1 ? null : pick;
    //if the clicked on card (pick) is set to possible1, possible2 is null -- if the clicked on card (pick) is not possible1, the clicked on card is possible2
  }


//if both variables have a value, based on the user clicking on two separate divs, then activate the variable that prevents the user from clicking on a 3rd div (109 & 110)
    if (possible1 && possible2) {
      notAllowed = true;

      let box1 = possible1.className;
      let box2 = possible2.className;
      //store the classes into two new variables so that way they can be compared
  
      //if these two new variables are the same...
      if (box1 === box2) {
        cardsDisplayed += 2; //two cards are now being shown, not 0
        possible1.removeEventListener("click", handleCardClick);
        possible2.removeEventListener("click", handleCardClick);
        possible1 = null;
        possible2 = null;
        notAllowed = false;
      } else { //box1 !== box2
        setTimeout(function() { //after 1 second, do the following code:
          possible1.style.backgroundColor = ""; //set back to default value = black
          possible2.style.backgroundColor = "";
          possible1.classList.remove("displayCard"); //take away this class and stop showing the user this card
          possible2.classList.remove("displayCard");
          possible1 = null; //make the variable null again
          possible2 = null;
          notAllowed = false; //allow the user to click on something else
        }, 1000);
      }
  }
  if (cardsDisplayed === COLORS.length) alert("Congrats! You won!!"); //if the number of cards that are displayed is the same as the number of items in the colors array, then the game is over
}

// when the DOM loads
createDivsForColors(shuffledColors); //calls the function

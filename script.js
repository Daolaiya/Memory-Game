const gameContainer = document.getElementById("game");
let openCards = 0;
let cardOne = null;
let cardTwo = null;
let flippedCards = 0;
let clickable = true;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

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

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.isDead = false;
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function flipCard(card){
  if (card.style.backgroundColor === "") {
    card.style.backgroundColor = card.classList[0];
  } else {
    card.style.backgroundColor = "";
  }
}

function handleCardClick(event) {
  if (!clickable){return;}
  if (event.target.isDead){return;}

  if (openCards === 0){
    openCards = 1;
    cardOne = event.target;
    flipCard(cardOne);
    return;
  }

  if(openCards === 1){
    cardTwo = event.target;
    flipCard(cardTwo);

    if(cardOne.classList[0] === cardTwo.classList[0]){
      cardOne.isDead = true;
      cardTwo.isDead = true;
      openCards = 0;
      cardOne = null;
      cardTwo = null;
      flippedCards += 2;
      
      if (flippedCards === COLORS.length){
        alert("Game is over!!!");
      }
      
    } else {
      clickable = false;
      setTimeout(function(){
        openCards = 0;
        flipCard(cardOne);
        flipCard(cardTwo);
        cardOne = null;
        cardTwo = null;
        clickable = true;
      },1000);
    }
  }
}

createDivsForColors(shuffledColors);
/*
 * Create a list that holds all of your cards
 */

let pickCard = []
let movesMade = 0;
const moveCounter = document.querySelector('.moves');
let matchMade = 0;
const starsList = document.querySelector('ul.stars');
const cardDeck = [...document.querySelectorAll('ul.deck li')];
const deck = document.querySelector('ul.deck');
const timer = document.querySelector("span.timer");
let timeCount = 0;
let timeStart = true;
let matchTimer;
const newGameButton = document.querySelector('div.restart');
const endTime = document.querySelector('span.endTime');
const endRating = document.querySelector('span.endRating');
const replayButton = document.querySelector('#replay');
const closeWindow = document.querySelector('#closeWindow');
const gameModal = document.querySelector('.gameModal');
const gameModalOverlay = document.querySelector('.gameModalOverlay');
const stars = '<i class="fa fa-star"></i> ';
const movesTotal = document.querySelector('.movesTotal');
newDeck();
//   Display the cards on the page
deck.addEventListener('click', function (evt) {
    let clickCard = evt.target;
    if (clickCard.tagName === 'LI' && pickCard.length < 2) {
         if (!clickCard.classList.contains('open', 'match')) {
            clickCard.classList.toggle('open');
            pickCard.push(clickCard);
         }
    }
    if (pickCard.length === 2) {
        setTimeout(function() {matchCard(pickCard);}, 600);
    }
});

//     - card matching logic
function matchCard(array) {
    if (array[0].firstElementChild.className === array[1].firstElementChild.className) {
        array.forEach(function(card) {
            card.classList.add('match');
        });
        matchMade++;
    } else {
        array.forEach(function(card) {
            card.classList.toggle('open');
        });
    }
    array.length = 0;
    movesMade++;
    moveCounterUI();
    starTracker();
    setTimeout(function() {endGame();}, 800);
}

//     - shuffle the list of cards using the provided "shuffle" method below
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//     - loop through each card and create its HTML
function newDeck() {
    shuffle(cardDeck);
    cardDeck.forEach(function (card) {
        for (let i = 0; i < cardDeck.length; i++) {
//     - add each card's HTML to the page
            deck.appendChild(cardDeck[i]);
            card.classList.remove('match', 'open');
        }
    });
}
//     - restart button
function newGame() {
    newDeck();
    movesMade = 0;
    moveCounterUI();
    pickCard = [];
    starTracker();
    timeCount = 0;
    timeStart = true;
    timeStop();
    matchMade = 0;
    timer.textContent = '00:00';
}
newGameButton.addEventListener('click', newGame);
 
//     - Move Counter
function moveCounterUI() {
    moveCounter.textContent = movesMade;
}
//     - Star Tracker
function starTracker() {
    if (movesMade > 15) {
        starsList.lastElementChild.style.display = "none";
    } else if (movesMade > 10) {
        starsList.firstElementChild.style.display = "none";
    } else {
        starsList.firstElementChild.style.display = "inline";
        starsList.lastElementChild.style.display = "inline";
    }
}
//     - Timer

deck.addEventListener('click', function () {
    if (timeStart === true) {
        matchTimer = setInterval(function() {
            timeCount++;
            let timeSeconds = ('0' + (timeCount % 60)).slice(-2);
            let timeMinutes = ('0' + Math.floor(timeCount / 60)).slice(-2);
            timer.innerHTML = timeMinutes + ':' + timeSeconds;
            }, 1000);
           } 
    timeStart = false; 
});

function timeStop() {
    clearInterval(matchTimer);
}

//     - Game End
function endGame() {
    if (matchMade === 8) {
        timeStop();
        movesTotal.textContent = movesMade;
        endRating.innerHTML = starRating();
        endTime.innerHTML = timer.textContent;
        gameModal.classList.toggle('closeModal');
        gameModalOverlay.classList.toggle('closeModal');
    }
}
//     - Results Screen

function starRating() {
    if (movesMade > 15) {
        return stars;
    } else if (movesMade > 10) {
        return stars.repeat(2);
    } else {
        return stars.repeat(3);
    }
}
closeWindow.addEventListener('click', function() {
    gameModal.classList.toggle('closeModal');
    gameModalOverlay.classList.toggle('closeModal');
});

replayButton.addEventListener('click', function() {
    gameModal.classList.toggle('closeModal');
    gameModalOverlay.classList.toggle('closeModal');
    newGame();
});



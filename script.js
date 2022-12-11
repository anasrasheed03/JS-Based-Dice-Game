'use strict';

//defining elements
const player0Name = prompt('What is the name of player 1');
const player1Name = prompt('What is the name of player 2');
const player0El = document.getElementById('name--0');
const player1El = document.getElementById('name--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');
let totalPlayerScores;
let currentScore;
let activePlayer;
let playing;
//initial condiitons
player0El.textContent = player0Name;
player1El.textContent = player1Name;
diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;


const init = () => {
    currentScore = 0;
    playing = true;
    player0Section.classList.remove('player--winner')
    player1Section.classList.remove('player--winner')
    player1Section.classList.remove('player--active')
    player0Section.classList.add('player--active')
    diceEl.classList.add('hidden');
    totalPlayerScores = [0, 0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    activePlayer = 0;

}

init();


//role dice conditions
const rollDice = () => {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.src = `dice-${dice}.png`;
        diceEl.classList.remove('hidden');
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            currentScore = 0;
            activePlayer = activePlayer == 0 ? 1 : 0;
            player0Section.classList.toggle('player--active');
            player1Section.classList.toggle('player--active');
        }
    }
}

//hold current score conditions
const holdDice = function () {
    if (playing) {
        totalPlayerScores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = totalPlayerScores[activePlayer]

        if (totalPlayerScores[activePlayer] >= 100) {
            console.log(`Player ${activePlayer} wins the game`)
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            diceEl.classList.add('hidden');
            playing = false;
        } else {
            player0Section.classList.toggle('player--active')
            player1Section.classList.toggle('player--active')
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            currentScore = 0;
            activePlayer = activePlayer == 0 ? 1 : 0;
        }
    }
}

//new game conditions
function newGame() {
    init();
}
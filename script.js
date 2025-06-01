'use strict';

//Selcting Elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const gameOver = document.querySelector('.game-over');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = !activePlayer ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//Rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a number dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    // 3. checked for rolled=1: if true switch to other player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if players score >=49
    if (scores[activePlayer] >= 10) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEL.classList.add('hidden');
      gameOver.classList.remove('no-opacity');

      gameOver.innerHTML = `Game Over! Player ${
        activePlayer + 1
      } Wins!  <br> press new game to play again <i class="ri-arrow-up-line"></i>`;
      gameOver.classList.add('opactiy');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  diceEL.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  activePlayer = 0;
  player0EL.classList.add('player--active');
  if (player1EL.classList.contains('player--active')) {
    player1EL.classList.remove('player--active');
  }

  if (player0EL.classList.contains('player--winner')) {
    player0EL.classList.remove('player--winner');
  }
  if (player1EL.classList.contains('player--winner')) {
    player1EL.classList.remove('player--winner');
  }

  gameOver.classList.add('no-opacity');

  playing = true;
});

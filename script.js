'use strict';
// Selecting elements
const player0Elmt = document.querySelector('.player--0');
const player1Elmt = document.querySelector('.player--1');
const score0Elmt = document.querySelector('#score--0');
const score1Elmt = document.querySelector('#score--1');
const diceElmt = document.querySelector('.dice');
const current0Elmt = document.querySelector('#current--0');
const current1Elmt = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions

let scores, currentScore, activePlayer, playing;

// inicia la app
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0Elmt.textContent = 0;
  score1Elmt.textContent = 0;
  current0Elmt.textContent = 0;
  current1Elmt.textContent = 0;
  diceElmt.classList.add('hidden');
  player0Elmt.classList.remove('player--winner');
  player1Elmt.classList.remove('player--winner');
  player0Elmt.classList.add('player--active');
  player1Elmt.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Elmt.classList.toggle('player--active');
  player1Elmt.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    // display the dice(img)
    diceElmt.classList.remove('hidden');
    diceElmt.src = `dice-${dice}.png`;

    // check for rolled 1
    if (dice !== 1) {
      // add to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if the player's score are >= 100
    // if true finish
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElmt.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

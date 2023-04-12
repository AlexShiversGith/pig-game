'use strict';

let diceRollValue;
let active;
let currentScore;
let game;

const searchElem = classname => {
  return document.querySelector(`.${classname}`);
};

const initStep = () => {
  const init = Math.floor(Math.random() * 2) + 1;
  if (init > 1) {
    searchElem('player--0').classList.add('player--active');
  } else {
    searchElem('player--1').classList.add('player--active');
  }
};

const changePlayer = () => {
  document.querySelectorAll('.player').forEach(player => {
    if (player.classList.contains('player--active')) {
      player.classList.remove('player--active');
    } else {
      player.classList.add('player--active');
    }
  });
};

const modal = winner => {
  searchElem('hidden').classList.remove('hidden');
  searchElem('modal').querySelector(
    '#winner'
  ).textContent = `Удача на стороне ${winner}`;
};

const closeModal = searchElem('close-modal-window').addEventListener(
  'click',
  () => {
    searchElem('modal').classList.add('hidden');
  }
);

const dice = searchElem('dice');

const btnRoll = searchElem('btn--roll').addEventListener('click', () => {
  if (game === true) {
    active = searchElem('player--active').querySelector('.current-score');
    diceRollValue = Math.floor(Math.random() * 6) + 1;
    dice.src = `dice${diceRollValue}.png`;
    active.textContent = Number(active.textContent) + diceRollValue;
    if (diceRollValue === 1) {
      active.textContent = 0;
      changePlayer();
    }
  } else {
    alert('Начните новую игру');
  }
});

const btnHold = searchElem('btn--hold').addEventListener('click', () => {
  if (game === true) {
    currentScore = searchElem('player--active').querySelector('.score');
    currentScore.textContent =
      Number(currentScore.textContent) + Number(active.textContent);
    active.textContent = 0;
    if (currentScore.textContent >= 100) {
      const winner =
        searchElem('player--active').querySelector('.name').textContent;
      modal(winner);
      game = false;
    } else {
      changePlayer();
    }
  } else {
    alert('Начните новую игру');
  }
});

const btnNew = searchElem('btn--new').addEventListener('click', () => {
  const player1 = prompt('Введите имя первого игрока');
  const player2 = prompt('Введите имя второго игрока');
  searchElem('player--0').querySelector('.name').textContent = player1;
  searchElem('player--1').querySelector('.name').textContent = player2;
  initStep();
  game = true;
});

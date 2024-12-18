const wrapper = document.querySelector('#cardWrapper');
const startButton = document.querySelector('#startButton');
const timerDisplay = document.querySelector('#timer');
const roundDisplay = document.querySelector('#round');

const total = 16;
const emojis = ['😄', '🐶', '🌸', '⭐', '🍎', '🎵', '🚗', '🎲'];
let shuffled = [];
let clicked = [];
let completed = [];
let clickable;
let timer;
let elapsedSeconds = 0;
let round = 1;
let isStart = true;

function updateRoundDisplay() {
  roundDisplay.textContent = `Round: ${round}`;
}

function shuffle() {
  const emojiCopy = emojis.concat(emojis);
  for (let i = emojiCopy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [emojiCopy[i], emojiCopy[randomIndex]] = [
      emojiCopy[randomIndex],
      emojiCopy[i],
    ];
  }
  shuffled = emojiCopy;
}

function createCard(i) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
   <div class="card-inner">
       <div class="card-front"></div>
       <div class="card-back">
           <p class="emoji">${shuffled[i]}</p>
       </div>
  </div>
  `;
  return card;
}

function onClickCard(event) {
  if (!clickable) return;

  const card = event.target.closest('.card');

  if (!card || card.classList.contains('flipped')) return;

  flipCard(card);

  if (clicked.length === 2) {
    checkMatch();
  }
}

function flipCard(card) {
  card.classList.add('flipped');
  clicked.push(card);
}

function checkMatch() {
  clickable = false;
  const [first, second] = clicked;
  const firstEmoji = first.querySelector('.card-back p').textContent;
  const secondEmoji = second.querySelector('.card-back p').textContent;

  if (firstEmoji === secondEmoji) {
    completeMatch();
  } else {
    unflipCards();
  }
}

function completeMatch() {
  completed.push(...clicked);
  clicked = [];
  clickable = true;

  if (completed.length === total) {
    clearInterval(timer);
    timer = null;
  }
}

function unflipCards() {
  setTimeout(() => {
    clicked.forEach((card) => card.classList.remove('flipped'));
    clicked = [];
    clickable = true;
  }, 1000);
}

function resetGame() {
  round += 1;
  updateRoundDisplay();
  resetTimer();
  clicked = [];
  completed = [];
  wrapper.innerHTML = '';
  cardSetting();
  startGame();
}

function cardSetting() {
  clickable = false;
  shuffle();
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    card.addEventListener('click', (event) => {
      onClickCard(event);
    });
    wrapper.appendChild(card);
  }
}

async function startGame() {
  clickable = false;
  await new Promise((resolve) => {
    document.querySelectorAll('.card').forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('flipped');
        if (index === document.querySelectorAll('.card').length - 1) {
          resolve();
        }
      }, 1000 + 100 * index);
    });
  });

  setTimeout(() => {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped');
    });
    updateRoundDisplay();

    clickable = true;
    startButton.disabled = false;
    startButton.textContent = '다시하기';

    startTimer();
  }, 3000);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  elapsedSeconds = 0;
  timerDisplay.textContent = '00:00';
}

function startTimer() {
  resetTimer();

  timer = setInterval(() => {
    elapsedSeconds += 1;
    const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
    const seconds = String(elapsedSeconds % 60).padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
  }, 1000);
}

cardSetting();
updateRoundDisplay();

startButton.addEventListener('click', () => {
  if (isStart) {
    isStart = false;
    startButton.textContent = '게임 준비 중..';
    startButton.disabled = true;
    startGame();
  } else {
    startButton.textContent = '게임 준비 중..';
    startButton.disabled = true;
    resetGame();
  }
});

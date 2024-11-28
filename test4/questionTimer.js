const correctBtn = document.getElementById('correct');
const wrongBtn = document.getElementById('wrong');
const startBtn = document.getElementById('start');

let timerInterval;
let isRunning = false;
let currentLimit = 10;
correctBtn.disabled = true;
wrongBtn.disabled = true;

function startQuestionTimer(callback, limit) {
  clearInterval(timerInterval);
  const endTime = Date.now() + limit * 1000;

  function updateTimer() {
    const now = Date.now();
    const timeLeft = Math.max(0, endTime - now);
    const minutes = Math.floor(timeLeft / 1000 / 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    document.getElementById(
      'timer'
    ).textContent = `${formattedMinutes}:${formattedSeconds}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      callback('timeover');
      isRunning = false;
      startBtn.textContent = 'start';
    }
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 300);
  isRunning = true;
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    currentLimit = 10;
  } else {
    currentLimit = 5;
  }

  correctBtn.disabled = false;
  wrongBtn.disabled = false;

  startQuestionTimer((status) => {
    if (status === 'timeover') {
      correctBtn.disabled = true;
      wrongBtn.disabled = true;
      alert('타임오버!');
    }
  }, currentLimit);

  startBtn.textContent = 'restart';
});

correctBtn.addEventListener('click', () => {
  correctBtn.disabled = true;
  wrongBtn.disabled = true;
  clearInterval(timerInterval);
  alert('정답 입니다.');
  isRunning = false;
  startBtn.textContent = 'start';
});

wrongBtn.addEventListener('click', () => {
  correctBtn.disabled = true;
  wrongBtn.disabled = true;
  clearInterval(timerInterval);
  alert('틀렸습니다.');
  isRunning = false;
  startBtn.textContent = 'start';
});

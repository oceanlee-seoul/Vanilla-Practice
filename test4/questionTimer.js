// startQuestionTimer라는 두 개의 매개변수를 사용하는 스크립트
// 첫번째 매개변수는 콜백 함수이고, 두번째 매개변수는 시간 제한을 나타내는 숫자입니다.
// 사용자가 제한된 시간 내에 정답 버튼을 누를 경우, "정답 입니다."라는 로그가 출력되어야 하며, 오답 버튼을 누를 경우 "틀렸습니다."라는 로그를 출력해야 합니다.
// 또한 정답 or 오답 이벤트 없이 시간 경과되면 "타입오버!"라는 로그를 출력하면 됩니다.
// 해당 문제의 퀴즈 시간은 10초이며, "restart"로 변경되며 다시 시작할 때 퀴즈시간은 5초로 변경됩니다.
// 화면에는 타이머 시간이 표시되어야 합니다.

// 함수는 제한 시간에 도달할 때 까지 0.3초 마다 함수를 반복적으로 호출해야 합니다.
// 제한 시간에 도달하면 해당 함수를 중지 시켜야 합니다.
// 타이머 시간의 형식은 "00:00"으로 표시되어야 합니다.

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

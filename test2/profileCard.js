const mockData = [
  {
    title: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo non erat egestas tincidunt.',
    userName: 'johnDoe',
  },
  {
    title: 'Jane Smith',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor nisl eu velit suscipit, id interdum dui interdum.',
    userName: 'janeSmith',
  },
  {
    title: 'Alice Johnson',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus placerat nulla sed volutpat volutpat.',
  },
  {
    title: 'Bob Lee',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo non erat egestas tincidunt.',
    userName: 'bobLee',
  },
];

const cardContainer = document.getElementById('cardContainer');

mockData.forEach((data) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');

  const imgWrapper = document.createElement('div');
  imgWrapper.classList.add('imgWrapper');

  const img = document.createElement('img');
  img.src = './assets/empty.png';
  img.alt = '프로필 이미지';
  imgWrapper.appendChild(img);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  imgWrapper.appendChild(checkbox);

  const textWrapper = document.createElement('div');
  textWrapper.classList.add('textWrapper');

  const title = document.createElement('h2');
  title.textContent = data.title;
  textWrapper.appendChild(title);

  const text = document.createElement('p');
  text.textContent = data.text;
  textWrapper.appendChild(text);

  cardElement.appendChild(imgWrapper);
  cardElement.appendChild(textWrapper);

  cardContainer.appendChild(cardElement);

  // 이미지 로드 후 프로필 이미지로 교체
  const profileImage = new Image();
  const profileImageUrl = data.userName
    ? `https://avatar.iran.liara.run/public/boy?username=${data.userName}` // userName이 있으면 프로필 이미지 URL 설정
    : './assets/empty.png';
  profileImage.src = profileImageUrl;
  profileImage.alt = `${data.userName}의 프로필 이미지`;

  profileImage.onload = () => {
    img.src = profileImage.src; // 이미지 로딩 완료되면 프로필 이미지로 교체
  };
});

// 클릭 시 이미지 확대/축소 기능
const images = document.querySelectorAll('.imgWrapper img');
images.forEach((image) => {
  image.addEventListener('click', () => {
    image.classList.toggle('clicked');
  });
});

// 체크박스 변경 시 이미지 상태 변경
const checkboxes = document.querySelectorAll(
  '.imgWrapper input[type="checkbox"]'
);
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (event) => {
    const img = event.target.closest('.imgWrapper').querySelector('img');
    if (event.target.checked) {
      img.classList.add('checked');
    } else {
      img.classList.remove('checked');
    }
  });
});

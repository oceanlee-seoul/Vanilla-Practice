const mockData = [
  {
    title: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo non erat egestas tincidunt.',
    userName: 'johnDoe',
  },
  {
    title: 'Jane Smith long Name long Name',
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
  cardElement.classList.add('profile-card');

  const imgWrapper = document.createElement('div');
  imgWrapper.classList.add('img-wrapper');

  const img = document.createElement('img');
  img.src = './assets/empty.png';
  img.alt = '프로필 이미지';
  imgWrapper.appendChild(img);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  imgWrapper.appendChild(checkbox);

  const textWrapper = document.createElement('div');
  textWrapper.classList.add('text-wrapper');

  const title = document.createElement('h2');
  title.textContent = data.title;
  textWrapper.appendChild(title);

  const text = document.createElement('p');
  text.textContent = data.text;
  textWrapper.appendChild(text);

  cardElement.appendChild(imgWrapper);
  cardElement.appendChild(textWrapper);

  cardContainer.appendChild(cardElement);

  const profileImage = new Image();
  const profileImageUrl = data.userName
    ? `https://avatar.iran.liara.run/public/boy?username=${data.userName}`
    : './assets/empty.png';
  profileImage.src = profileImageUrl;
  profileImage.alt = `${data.userName}의 프로필 이미지`;

  profileImage.onload = () => {
    img.src = profileImage.src;
  };
});

const images = document.querySelectorAll('.imgWrapper img');
images.forEach((image) => {
  image.addEventListener('click', () => {
    image.classList.toggle('clicked');
  });
});

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

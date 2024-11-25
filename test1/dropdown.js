const dropdowns = document.querySelectorAll('.dropdown');

// 드랍다운 외부 클릭시 드랍다운 wrapper close
document.addEventListener('click', () => {
  dropdowns.forEach((dropdown) => {
    const wrapper = dropdown.querySelector('.wrapper');
    const button = dropdown.querySelector('.dropdown-btn');
    closeDropdown(wrapper, button);
  });
});

// 각 드랍다운 토글에 독립적으로 click event 등록
dropdowns.forEach((dropdown) => {
  const toggleBtn = dropdown.querySelector('.dropdown-btn');
  const wrapper = dropdown.querySelector('.wrapper');
  const items = dropdown.querySelectorAll('.item');

  // 드랍다운 토글(열고 닫기) 버튼
  toggleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = wrapper.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // 현재 클릭한 드랍다운만 open
    dropdowns.forEach((otherDropdown) => {
      if (otherDropdown !== dropdown) {
        const otherWrapper = otherDropdown.querySelector('.wrapper');
        const otherButton = otherDropdown.querySelector('.dropdown-btn');
        closeDropdown(otherWrapper, otherButton);
      }
    });
  });

  // 아이템 선택 시 드랍다운 닫기 및 버튼 텍스트 업데이트
  items.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleBtn.textContent = item.textContent;
      closeDropdown(wrapper, toggleBtn);
    });

    // Enter 키로 아이템 선택
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        toggleBtn.textContent = item.textContent;
        closeDropdown(wrapper, toggleBtn);
        toggleBtn.focus();
      }
    });
  });
});

function closeDropdown(dropdownWrapper, dropdownToggle) {
  dropdownWrapper.classList.remove('open');
  dropdownToggle.setAttribute('aria-expanded', 'false');
}

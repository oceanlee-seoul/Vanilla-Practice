const dropdowns = document.querySelectorAll('.dropdown');

document.addEventListener('click', () => {
  dropdowns.forEach((dropdown) => {
    const wrapper = dropdown.querySelector('.dropdown-wrapper');
    const button = dropdown.querySelector('.dropdown-btn');
    closeDropdown(wrapper, button);
  });
});

dropdowns.forEach((dropdown) => {
  const toggleBtn = dropdown.querySelector('.dropdown-btn');
  const wrapper = dropdown.querySelector('.dropdown-wrapper');
  const items = dropdown.querySelectorAll('.dropdown-item');

  toggleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = wrapper.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    dropdowns.forEach((otherDropdown) => {
      if (otherDropdown !== dropdown) {
        const otherWrapper = otherDropdown.querySelector('.dropdown-wrapper');
        const otherButton = otherDropdown.querySelector('.dropdown-btn');
        closeDropdown(otherWrapper, otherButton);
      }
    });
  });

  items.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleBtn.textContent = item.textContent;
      closeDropdown(wrapper, toggleBtn);
    });

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

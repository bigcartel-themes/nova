const categoryNavHeadings = document.querySelectorAll('.category-nav-heading');
const dropdowns = document.querySelectorAll('.category-dropdown');

categoryNavHeadings.forEach(function(categoryNavHeading) {
  categoryNavHeading.addEventListener('click', function(e) {
    e.stopPropagation();

    let thisButton = e.currentTarget;
    const dropdown = document.getElementById(thisButton.getAttribute('aria-controls'));
    const isExpanded = thisButton.getAttribute('aria-expanded') === 'true';

    categoryNavHeading.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    dropdown.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');

    document.addEventListener('keydown', function toggleDropdownOnEscape(e) {
      if (e.key === 'Escape' && dropdown.getAttribute('aria-hidden') === 'false') {
        categoryNavHeading.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('aria-hidden', 'true');
        document.removeEventListener('keydown', toggleDropdownOnEscape);
      }
    });
  });
});

document.addEventListener('click', function(e) {
  const target = e.target;
  const isDropdown = target.classList.contains('category-dropdown') || target.closest('.category-dropdown');

  if (!isDropdown) {
    dropdowns.forEach(function(dropdown) {
      const dropdownButton = document.querySelector(`[aria-controls="${dropdown.id}"]`);

      if (dropdown.getAttribute('aria-hidden') === 'false') {
        dropdownButton.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('aria-hidden', 'true');
      }
    });
  }
});

const adjustDropdownHeights = () => {
  dropdowns.forEach((dropdown) => {
    const dropdownRect = dropdown.getBoundingClientRect();
    const availableSpace = window.innerHeight - dropdownRect.top - 20;
    dropdown.style.maxHeight = `${availableSpace}px`;
  });
};

adjustDropdownHeights();

window.addEventListener('resize', adjustDropdownHeights);


function setHeaderBottomPosition() {
  const headerBottomPosition = document.querySelector('header').getBoundingClientRect().bottom;
  document.documentElement.style.setProperty('--header-bottom-position', `${headerBottomPosition}px`);
}

const toggleMenuButton = document.querySelector('.open-mobile-navigation');
const sidebarNavigation = document.getElementById('mobile-navigation');

function toggleSidebarNavigation() {
  setHeaderBottomPosition();
  document.body.classList.toggle('overlay-open');
  const isButtonExpanded = toggleMenuButton.getAttribute('aria-expanded') === 'true';
  const isMenuHidden = sidebarNavigation.getAttribute('aria-hidden') === 'true';
  toggleMenuButton.setAttribute('aria-expanded', isButtonExpanded ? 'false' : 'true');
  sidebarNavigation.setAttribute('aria-hidden', isMenuHidden ? 'false' : 'true');
}

toggleMenuButton.addEventListener('click', toggleSidebarNavigation);
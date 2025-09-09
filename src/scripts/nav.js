export function setupNav() {
  const navButton = document.querySelector('.navbar-icon-button');
  const navMenu = document.querySelector('.w-nav-menu');
  const themeSwitcher = document.getElementById('theme-switcher');
  const body = document.body;

  if (navButton && navMenu) {
    const toggleNav = () => {
      const isOpen = navMenu.classList.contains('is-open');

      navMenu.classList.toggle('is-visible', !isOpen);
      setTimeout(
        () => {
          navMenu.classList.toggle('is-open', !isOpen);
        },
        isOpen ? 300 : 10
      );
    };

    navButton.addEventListener('click', toggleNav);
  }


  // Check for saved theme preference
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
      body.classList.add(currentTheme);
      if (currentTheme === 'dark-mode') {
          themeSwitcher.textContent = '☀️';
      }
  }

  themeSwitcher.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      let theme = 'light-mode';
      if (body.classList.contains('dark-mode')) {
          theme = 'dark-mode';
          themeSwitcher.textContent = '☀️';
      } else {
          themeSwitcher.textContent = '🌙';
      }
      localStorage.setItem('theme', theme);
  });

  return () => {
    if (navButton) {
      navButton.removeEventListener('click', toggleNav);
    }
  }
}

// Change navbar background style on scroll
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  
  // Triggers background change when scrolled down more than 50px
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

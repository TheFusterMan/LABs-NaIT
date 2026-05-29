const cards = document.querySelectorAll('.card');

function alignBackgrounds() {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    card.style.backgroundPosition = `${-rect.left}px ${-rect.top}px`;
  });
}

let isTicking = false;
function handleScroll() {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      alignBackgrounds();
      isTicking = false;
    });
    isTicking = true;
  }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', alignBackgrounds);

alignBackgrounds();
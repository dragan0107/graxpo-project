let initialSlide = 1;
setSlide(initialSlide);

function setSlide(n) {
  let testimonialItems = document.getElementsByClassName(
    'testimonials-carousel-item'
  );
  let dots = document.getElementsByClassName('testimonials-carousel-dot');

  for (let i = 0; i < testimonialItems.length; i++) {
    testimonialItems[i].style.display = 'none';
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' dot-active', '');
  }
  testimonialItems[n - 1].style.display = 'flex';
  dots[n - 1].className += ' dot-active';
}

let autoSlide = 1;
let myInterval;

startInterval(); // Initial interval trigger.

function startInterval() {
  myInterval = setInterval(() => {
    if (autoSlide > 3) autoSlide = 1;
    setSlide(autoSlide);
    autoSlide++;
  }, 3000);
}
function selectSlide(n) {
  setSlide(n);

  clearInterval(myInterval); // We reset the interval after manually selecting the slide, and then restart the interval by calling startInterval.

  startInterval();
}

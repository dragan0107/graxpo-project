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

function jumpToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// The observer is checking whether the 'views' section is intersecting, if yes, start the animation.
const views = document.getElementById('views');
const options = {};

const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry);
      const counters = document.querySelectorAll('.views-counter');
      const divider = 400; // Value we divide the full number with, the higher it is, the slower the counting up gets.

      counters.forEach((counter) => {
        const countUp = () => {
          const target = counter.getAttribute('data-target') * 1; // Grabbing target value
          const count = counter.innerText * 1;

          const incrementer = target / divider; // Declaring the incrementer we keep adding to the counter until we reach the target.

          if (count < target) {
            counter.innerText = Math.ceil(count + incrementer);
            setTimeout(countUp, 5);
          } else {
            counter.innerText = target;
          }
        };
        countUp();
      });
    }
  });
}, options);

observer.observe(views);

// Grid manipulation

function changeGrid(className) {
  const gridItems = document.querySelector('.portfolio-grid');

  if (className !== 'all') {
    for (let i = 0; i < gridItems.children.length; i++) {
      const child = gridItems.children[i];
      child.style.opacity = 'flex';
      if (!child.classList.contains(className)) {
        child.style.opacity = 'none';
        // console.log(true);
      }
    }
  } else {
    for (let i = 0; i < gridItems.children.length; i++) {
      const child = gridItems.children[i];
      child.style.display = 'flex';
    }
  }
}

function sortCateg(className, elem1, elem2, elem3) {
  if (className === 'all') return changeGrid(className);

  document.getElementsByClassName(elem1)[0].style.gridColumn = '1 / span 4';
  document.getElementsByClassName(elem1)[0].style.gridRow = '1 / span 4';
  document.getElementsByClassName(elem2)[0].style.gridColumn = '5 / span 4';
  document.getElementsByClassName(elem2)[0].style.gridRow = '1 / span 4';
  document.getElementsByClassName(elem3)[0].style.gridColumn = '9 / span 4';
  document.getElementsByClassName(elem3)[0].style.gridRow = '1 / span 4';
}

window.onload = () => {
  const grid = document.querySelector('.grid');

  const masonry = new Masonry(grid, {
    itemSelector: '.grid-item',
    gutter: 0,
    // originTop: false,
  });
};

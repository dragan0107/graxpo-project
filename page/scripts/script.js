// Carousel functionality

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

// Function for smooth scrolling to different sections.
function jumpToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// The observer is checking whether the 'views' section is intersecting, if yes, start the animation.
const views = document.getElementById('views');

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
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
});

observer.observe(views);

// MasonryJS grid functionality.

let msnry;
let msnryOptions = {
  itemSelector: '',
  gutter: 0,
};

let grid = document.querySelector('.grid');
window.onload = () => {
  msnry = new Masonry(grid);
};

function sortCateg(category) {
  grid = document.querySelector('.grid');
  let children = Array.from(grid.children);
  resetGrid(children);

  for (let i = 0; i < children.length; i++) {
    if (!children[i].classList.contains(category)) {
      children[i].style.display = 'none';
    }
  }
  msnryOptions.itemSelector = category;
  msnry.layout();
}

// Grid reset function
function resetGrid(children) {
  for (let i = 0; i < children.length; i++) {
    children[i].style.display = 'block';
  }
}

// Hamburger menu controller

const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Add active class to current portfolio category

let listItems = document.querySelectorAll('.categ-name');
for (let i = 0; i < listItems.length; i++) {
  listItems[i].addEventListener('click', (e) => {
    let current = document.getElementsByClassName('active-categ');
    current[0].classList.remove('active-categ');
    e.target.classList.add('active-categ');
  });
}

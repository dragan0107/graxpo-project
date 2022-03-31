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

// function changeGrid(className) {
//   const gridItems = document.querySelector('.portfolio-grid');

//   if (className !== 'all') {
//     for (let i = 0; i < gridItems.children.length; i++) {
//       const child = gridItems.children[i];
//       child.style.opacity = 'flex';
//       if (!child.classList.contains(className)) {
//         child.style.opacity = 'none';
//         // console.log(true);
//       }
//     }
//   } else {
//     for (let i = 0; i < gridItems.children.length; i++) {
//       const child = gridItems.children[i];
//       child.style.display = 'flex';
//     }
//   }
// }
let msnry;

window.onload = () => {
  const grid = document.querySelector('.grid');

  msnry = new Masonry(grid, {
    itemSelector: '.grid-item',
    gutter: 0,
  });
};

let gridElems = document.querySelector('.grid');

let children = Array.from(gridElems.children);

let childrenCopy = [];
for (let i = 0; i < children.length; i++) {
  let clone = children[i].cloneNode(true);
  childrenCopy.push(clone);
}

function sortCateg() {
  let elems = [...arguments];

  for (let i = 0; i < children.length; i++) {
    elems.forEach((elem) => {
      if (children[i].classList.contains(elem)) {
        children.splice(i, 1);
      }
    });
  }
  msnry.remove(children);
  msnry.layout();
}

const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

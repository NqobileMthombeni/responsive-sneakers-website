/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== SWIPER SNEAKERS ===============*/
let swiperImages = new Swiper('.home__swiper', {
    loop: false, // Enable looping
    spaceBetween: 64,
    grabCursor: true,
    centeredSlides: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    on: {
        slideChangeTransitionStart: function () {
            // Hide the circles during transition to prevent glitching
            document.getElementById('circle1').style.visibility = 'hidden';
            document.getElementById('circle2').style.visibility = 'hidden';
        },
        slideChangeTransitionEnd: function () {
            // Show circles again after transition
            document.getElementById('circle1').style.visibility = 'visible';
            document.getElementById('circle2').style.visibility = 'visible';
            
            const realIndex = this.realIndex; // Get the real index
            const slideWidth = this.slides[0].clientWidth; // Get width of the slide
            
            // Adjust the position of circles based on real index
            const translateValue = realIndex * slideWidth; // Calculate position
            
            document.getElementById('circle1').style.transform = `translateX(${translateValue}px)`;
            document.getElementById('circle2').style.transform = `translateX(${translateValue}px)`;
        }
    }
});


let swiperTitles = new Swiper('.home__titles', {
    loop: true,  // Keep loop enabled for infinite scroll
    spaceBetween: 64,
    grabCursor: true,
    centeredSlides: true,
    loopAdditionalSlides: 1  // Minimize the number of additional slides
});

// Set up controller relationship
swiperImages.controller.control = swiperTitles;
swiperTitles.controller.control = swiperImages;

/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = () => {
    const header = document.getElementById('header');
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('bg-header') 
                      : header.classList.remove('bg-header');
}
window.addEventListener('scroll', bgHeader);

/*=============== CIRCLE LOGIC ===============*/
// Ensuring the circle is not affected by cloned slides
const circle = document.querySelector('.circle');

swiperImages.on('slideChangeTransitionStart', function () {
    const realIndex = swiperImages.realIndex;
    // Your logic to adjust the circle for real slides
    circle.style.transform = `translateX(${realIndex * 50}px)`; // Example logic
});

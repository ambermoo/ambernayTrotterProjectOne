// Jquery allows the scroll listener to run only once
// https://stackoverflow.com/questions/32134451/call-function-on-scroll-only-once#:~:text=Try%20using%20.-,one,-()%3A

/* #region - points popup */
const pointsPopup = document.querySelector('.pointsPopup');
const html = document.querySelector('html');
const body = document.querySelector('body');

// pop-up on scroll
$(window).one('scroll', function () {
    // window.ScrollY prevents popup glitch when returning from contact page
    if (window.scrollY < 15) {
        pointsPopup.style.display = 'flex';
        // lock screen
        html.classList.add("stop-scrolling");
        body.classList.add("stop-scrolling");
    }
    
});

// close event
const xDiv = document.querySelector('.x-div-container');

const close = () => {
    pointsPopup.style.display = 'none';
    // enable scroll
    html.classList.remove("stop-scrolling");
    body.classList.remove("stop-scrolling");
}

// listens only if element exists (conact)
if (xDiv) xDiv.addEventListener('click', close);

/* #endregion - points popup */

/* #region - hamburger focus */
const hamburger = document.querySelector('.hamburger-menu-icon');
const nav = document.querySelector('.nav-container');
const navLinks = document.querySelector('nav>ul');

// adds attribute to hamburger menu on load
hamburger.addEventListener('load', hamburger.setAttribute('is_active', 'false'));

const toggleMenu = () => {
    
    const hamburgerState = hamburger.getAttribute('is_active');
    
    if (hamburgerState === 'false') {
        hamburger.setAttribute('is_active', 'true');
        // found in _media-queries
        nav.classList.add('increase-height');
        navLinks.classList.add('makeVisible');
    }else {
        hamburger.setAttribute('is_active', 'false');
        // found in _media-queries
        nav.classList.remove('increase-height');
        navLinks.classList.remove('makeVisible');
    }
}

hamburger.addEventListener('click', toggleMenu)

/* #endregion - hamburger focus */


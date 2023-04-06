// Jquery $(window) allows the scroll listener to run only once
// https://stackoverflow.com/questions/32134451/call-function-on-scroll-only-once#:~:text=Try%20using%20.-,one,-()%3A

// #region - points popup //
    const pointsPopup = document.querySelector('.points-popup');
    const html = document.querySelector('html');
    const body = document.querySelector('body');

// pop-up on scroll
    $(window).one('scroll', function () {
        // window.ScrollY prevents popup glitch when returning from contact page
        if (window.scrollY < 25) {
            pointsPopup.classList.toggle('make-visible');
            // lock screen (main styles.scss)
            html.classList.toggle("stop-scrolling");
            body.classList.toggle("stop-scrolling");
        }   
    });

    // close event
    const xDiv = document.querySelector('.x-div-container');

    const close = () => {
        pointsPopup.classList.toggle('make-visible');
        pointsPopup.classList.toggle('make-invisible');
        // enable scroll (main styles.scss)
        html.classList.toggle("stop-scrolling");
        body.classList.toggle("stop-scrolling");
    }

    // listens only if element exists (contact)
    if (xDiv) xDiv.addEventListener('click', close);

// #endregion - points popup //

// #region - hamburger focus //
    const hamburger = document.querySelector('.hamburger-menu-icon');
    const nav = document.querySelector('.nav-container');
    const navLinks = document.querySelector('nav>ul');

    const toggleHamburger = () => {
        const burgerLines = document.querySelectorAll('.hamburger-menu-icon .lines');

        /* #region - add burger-line styles */
        burgerLines[0].classList.toggle('a');
        burgerLines[1].classList.toggle('b');
        burgerLines[2].classList.toggle('make-invisible');
        /* #endregion - add burger-line styles */

        nav.classList.toggle('increase-height');
        navLinks.classList.toggle('make-visible');
    }

    hamburger.addEventListener('click', toggleHamburger);

// #endregion - hamburger focus //


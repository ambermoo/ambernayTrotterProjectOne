// Jquery allows the scroll listener to run only once
// https://stackoverflow.com/questions/32134451/call-function-on-scroll-only-once#:~:text=Try%20using%20.-,one,-()%3A
$(window).one('scroll', function () {
    alert("Join our points program");
});

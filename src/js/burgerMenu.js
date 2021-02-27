export default burgerMenu;

const burgerMenu = function () {
    const burger = document.querySelector(".header__burger");
    const nav = document.querySelector(".nav");
    const page = document.querySelector(".page");
    burger.addEventListener("click", function () {
        burger.classList.toggle("is-active");
        nav.classList.toggle("is-active");
        page.classList.toggle("lock");
    });
};

burgerMenu();

export default header;

const header = document.querySelector(".header__list");
window.onscroll = function () {
    let top = window.scrollY;
    if (top >= 250) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
};

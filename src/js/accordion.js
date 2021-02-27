export default createAccordion;

const createAccordion = function () {
    const accordion = document.querySelectorAll(".questions__item");
    for (let i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener("click", function () {
            this.classList.toggle("is-active");
        });
    }
};
createAccordion();

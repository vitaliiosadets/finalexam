export default tab;

const tab = function () {
    let tabNavigation = document.querySelectorAll(".about__text");
    let tabContent = document.querySelectorAll(".tab");
    let tabName;

    tabNavigation.forEach((item) => {
        item.addEventListener("click", chooseTabNav);
    });

    function chooseTabNav(event) {
        event.preventDefault();
        tabNavigation.forEach((item) => {
            item.classList.remove("is-active");
        });

        this.classList.add("is-active");
        tabName = this.getAttribute("data-tab");
        selectContent(tabName);
    }

    function selectContent(tabName) {
        tabContent.forEach((item) => {
            item.classList.contains(tabName)
                ? item.classList.add("is-active")
                : item.classList.remove("is-active");
        });
    }
};
tab();

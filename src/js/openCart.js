export default openCart;

const openCart = function () {
    const openCart = document.querySelector(".checkout__cart");
    const cart = document.querySelector(".cart");
    openCart.addEventListener("click", function () {
        cart.classList.toggle("is-active");
    });
};

openCart();

export default addToCart;

const addToCart = function () {
    const productsBtn = document.querySelectorAll(".products__checkout");
    const cart = document.querySelector(".cart");
    const productsList = document.querySelector(".cart__wrapper");
    const productsQty = document.querySelector(".checkout__value");
    const productsPrice = document.querySelector(".products__price");
    const totalPrice = document.querySelector(".cart__price_total");
    let price = 0;

    const randomId = () => {
        return (
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15)
        );
    };

    const plusFullPrice = (currentPrice) => {
        return (price += currentPrice);
    };

    const minusFullPrice = (currentPrice) => {
        return (price -= currentPrice);
    };

    const calcFullPrice = () => {
        totalPrice.textContent = `$ ${price.toFixed(2)}`;
    };

    const cartQty = () => {
        let qty = productsList.children.length;
        productsQty.textContent = qty;
    };

    const renderHTML = (img, title, price, id) => {
        return `
		<div class="cart__about data-id="${id}"">
		<div class="cart__image">
			<img class="cart__img" src="${img}" alt="" />
		</div>
		<div class="cart__item">
			<p class="cart__product">
				${title}
			</p>
			<p class="cart__multiply">$ ${price}</p>
		</div>
		<div class="cart__amount">
			<button
				class="cart__button_plus cart_btn"
				type="button"
			></button>
			<span class="cart__button_amount cart_btn">1</span>
			<button
				class="cart__button_minus cart_btn"
				type="button"
			></button>
		</div>
	</div>
		`;
    };
    productsBtn.forEach((event) => {
        event.closest(".products__item").setAttribute("data-id", randomId());
        event.addEventListener("click", (e) => {
            let self = e.currentTarget;
            let parent = self.closest(".products__item");
            let id = parent.dataset.id;
            let img = parent
                .querySelector(".products__image")
                .getAttribute("src");
            let title = parent.querySelector(".products__name").textContent;
            let priceInCart = parent.querySelector(".products__price")
                .textContent;
            let priceNumber = parseFloat(
                parent.querySelector(".products__price").textContent
            );
            plusFullPrice(priceNumber);

            calcFullPrice();
            productsList.insertAdjacentHTML(
                "afterbegin",
                renderHTML(img, title, priceInCart, id)
            );
            cartQty();
        });
    });
};

addToCart();

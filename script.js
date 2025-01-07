const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartDeliveryFee = document.getElementById("delivery-fee");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;

const products = [
    {
        id: 1,
        name: "Strawberry Cupcakes(4Pack)",
        price: 1499,
        category: "Cupcake",
    },
    {
        id: 2,
        name: "Macaronni",
        price: 399,
        category: "Macaron",
    },
    {
        id: 3,
        name: "Normal Cupcake",
        price: 399,
        category: "Cupcake",
    },
    {
        id: 4,
        name: "Chocolate Cupcake",
        price: 699,
        category: "Cupcake",
    },
    {
        id: 5,
        name: "Chocolate Pretzels (4 Pack)",
        price: 820.99,
        category: "Pretzel",
    },
    {
        id: 6,
        name: "Vanilla Ice Cream",
        price: 120.99,
        category: "Ice Cream",
    },
    {
        id: 7,
        name: "Chocolate Macarons (4 Pack)",
        price: 720.99,
        category: "Macaron",
    },
    {
        id: 8,
        name: "Strawberry Pretzel",
        price: 320.99,
        category: "Pretzel",
    },
    {
        id: 9,
        name: "Butter Ice Cream",
        price: 240.99,
        category: "Ice Cream",
    },
    {
        id: 10,
        name: "Malai Ice Cream",
        price: 240.99,
        category: "Ice Cream",
    },
    {
        id: 11,
        name: "Vanilla (5 Pack)",
        price: 959.99,
        category: "Macaron",
    },
    {
        id: 12,
        name: "Indian Cupcakes (12 Pack)",
        price: 999.99,
        category: "Cupcake",
    },
];

products.forEach(
    ({ name, id, price, category }) => {
        dessertCards.innerHTML += `
    <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">₹${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button id="${id}" class="btn add-to-cart-btn">Add to cart</button>
    </div>
    `;
    }
);

class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.taxRate = 8.25;
    }

    addItem(id, products) {
        const product = products.find((item) => item.id === id);
        const { name, price } = product;
        this.items.push(product);

        const totalCountPerProduct = {};
        this.items.forEach((dessert) => {
            totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
        })

        const currentProductCount = totalCountPerProduct[product.id];
        const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

        currentProductCount > 1 ? currentProductCountSpan.textContent = `${currentProductCount}x` : productsContainer.innerHTML += `
        <div id="dessert${id}" class="product">
        <p>
        <span class="product-count" id="product-count-for-id${id}"></span>${name}
        </p>
        <p>${price}</p>
        </div>
        `;
    }

    getCounts() {
        return this.items.length;
    }

    clearCart() {
        if (!this.items.length) {
            alert("Cart is empty");
            return;
        }

        const isCartCleared = confirm(
            "Want to clear all items from your shopping cart?"
        );

        if (isCartCleared) {
            this.items = [];
            this.total = 0;
            productsContainer.innerHTML = "";
            totalNumberOfItems.textContent = 0;
            cartSubTotal.textContent = 0;
            cartTaxes.textContent = 0;
            cartTotal.textContent = 0;
        }
    }

    calculateTaxes(amount) {
        this.taxRate = 18;
        return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
    }

    calculateTotal() {
        const subTotal = this.items.reduce((total, item) => total + item.price, 0);
        const tax = this.calculateTaxes(subTotal);
        const deliveryFee = 60;
        this.total = subTotal + tax + deliveryFee;
        cartSubTotal.textContent = `₹${subTotal.toFixed(2)}`;
        cartTaxes.textContent = `₹${tax.toFixed(2)}`;
        cartTotal.textContent = `₹${this.total.toFixed(2)}`;
        if (cartDeliveryFee) {
            cartDeliveryFee.textContent = `₹${deliveryFee.toFixed(2)}`;
        }
        return this.total;
    }
};

const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

[...addToCartBtns].forEach(
    (btn) => {
        btn.addEventListener("click", (event) => {
            cart.addItem(Number(event.target.id), products);
            totalNumberOfItems.textContent = cart.getCounts();
            cart.calculateTotal();
        })
    }
);

cartBtn.addEventListener("click", () => {
    isCartShowing = !isCartShowing;
    showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
    cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartBtn.addEventListener("click", cart.clearCart.bind(cart))

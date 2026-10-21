
const products = [
    // Chai and tea
    {id:1,name:"Adrak (Ginger) Chai",category:"Chai (Tea)",price:20,emoji:"🫖",description:"Classic cutting chai with ginger."},
    {id:2,name:"Elaichi (Cardamom) Chai",category:"Chai (Tea)",price:20,emoji:"☕",description:"Aromatic cardamom chai."},
    {id:3,name:"Kesar (Saffron) Chai",category:"Chai (Tea)",price:40,emoji:"🍵",description:"Fragrant saffron chai."},
    {id:4,name:"Lemon Tea",category:"Healthy Tea",price:30,emoji:"🍋",description:"Refreshing lemon tea."},
    {id:5,name:"Lemon Honey Tea",category:"Healthy Tea",price:50,emoji:"🍯",description:"Lemon tea with honey."},

    // Hot coffee
    {id:6,name:"Regular Hot Coffee",category:"Hot Coffee",price:50,emoji:"☕",description:"A warm café classic."},
    {id:7,name:"Chocolate Hot Coffee",category:"Hot Coffee",price:70,emoji:"🍫",description:"Coffee with chocolate."},
    {id:8,name:"Black Coffee",category:"Hot Coffee",price:40,emoji:"☕",description:"Bold black coffee."},
    {id:9,name:"Hazelnut Hot Coffee",category:"Hot Coffee",price:70,emoji:"🤎",description:"Smooth hazelnut coffee."},

    // Buns
    {id:10,name:"Butter Bun",category:"Buns",price:40,emoji:"🥯",description:"Soft bun with butter."},
    {id:11,name:"Jam Bun",category:"Buns",price:60,emoji:"🥯",description:"Sweet bun with jam."},
    {id:12,name:"Choco Bun",category:"Buns",price:60,emoji:"🍫",description:"Chocolate bun."},
    {id:13,name:"Nutella Bun",category:"Buns",price:80,emoji:"🥯",description:"Chocolate-hazelnut bun."},

    // Shakes
    {id:14,name:"Vanilla Shake",category:"Shakes",price:110,emoji:"🥤",description:"Creamy vanilla shake."},
    {id:15,name:"Chocolate Shake",category:"Shakes",price:120,emoji:"🍫",description:"Rich chocolate shake."},
    {id:16,name:"Strawberry Shake",category:"Shakes",price:130,emoji:"🍓",description:"Sweet strawberry shake."},
    {id:17,name:"Butterscotch Shake",category:"Shakes",price:130,emoji:"🥤",description:"Creamy butterscotch shake."},
    {id:18,name:"Black Current Shake",category:"Shakes",price:130,emoji:"🫐",description:"Fruity black currant shake."},
    {id:19,name:"Blueberry Shake",category:"Shakes",price:150,emoji:"🫐",description:"Chilled blueberry shake."},

    // Chillers
    {id:20,name:"Fresh Lime Lemonade",category:"Chillers",price:70,emoji:"🍋",description:"Fresh lime cooler."},
    {id:21,name:"Lemon Ice Tea",category:"Chillers",price:70,emoji:"🧋",description:"Chilled lemon iced tea."},
    {id:22,name:"Fresh Lime",category:"Chillers",price:90,emoji:"🍈",description:"Fresh lime refreshment."},
    {id:23,name:"Masala Ice Tea",category:"Chillers",price:90,emoji:"🧋",description:"Spiced iced tea."},
    {id:24,name:"Blue Lagoon",category:"Chillers",price:100,emoji:"🩵",description:"Refreshing blue cooler."},
    {id:25,name:"Watermelon Mint",category:"Chillers",price:100,emoji:"🍉",description:"Watermelon and mint."},

    // Cold coffee
    {id:26,name:"Classic Cold Coffee",category:"Cold Coffee",price:80,emoji:"🧋",description:"Creamy cold coffee."},
    {id:27,name:"Choco Frappe",category:"Cold Coffee",price:110,emoji:"🍫",description:"Chocolate coffee frappe."},
    {id:28,name:"Mocha Hazelnut Frappe",category:"Cold Coffee",price:110,emoji:"🥤",description:"Mocha with hazelnut."},
    {id:29,name:"Caramel Frappe",category:"Cold Coffee",price:110,emoji:"🥤",description:"Cold coffee with caramel."},
    {id:30,name:"Oreo",category:"Cold Coffee",price:110,emoji:"🍪",description:"Cookies-and-cream drink."},

    // Maggi
    {id:31,name:"Plain Maggi",category:"Maggi",price:40,emoji:"🍜",description:"Classic noodle comfort."},
    {id:32,name:"Vegetable Maggi",category:"Maggi",price:60,emoji:"🍜",description:"Noodles with vegetables."},
    {id:33,name:"Cheese Maggi",category:"Maggi",price:80,emoji:"🧀",description:"Cheesy Maggi noodles."},
    {id:34,name:"Mix Veg Maggi",category:"Maggi",price:120,emoji:"🍜",description:"Maggi with mixed vegetables."},

    // Fries and nuggets
    {id:35,name:"Classic Fries",category:"Fries & Nuggets",price:90,emoji:"🍟",description:"Golden crispy fries."},
    {id:36,name:"Peri-Peri Fries",category:"Fries & Nuggets",price:100,emoji:"🍟",description:"Spicy peri-peri fries."},
    {id:37,name:"Masala Fries",category:"Fries & Nuggets",price:110,emoji:"🍟",description:"Fries with masala."},
    {id:38,name:"Mexican Fries",category:"Fries & Nuggets",price:140,emoji:"🍟",description:"Mexican-style fries."},
    {id:39,name:"Cheese Nuggets",category:"Fries & Nuggets",price:140,emoji:"🧀",description:"Crunchy cheese bites."},
    {id:40,name:"Extra Extra Dip",category:"Fries & Nuggets",price:20,emoji:"🥣",description:"Extra dipping sauce."},

    // Wraps
    {id:41,name:"Veggie Aloo Tikki Wrap",category:"Wraps",price:100,emoji:"🌯",description:"Aloo tikki in a wrap."},
    {id:42,name:"Spicy Paneer Wrap",category:"Wraps",price:150,emoji:"🌯",description:"Spicy paneer wrap."},
    {id:43,name:"Italian Wrap",category:"Wraps",price:140,emoji:"🌯",description:"Italian-style wrap."},
    {id:44,name:"Masala Wrap",category:"Wraps",price:120,emoji:"🌯",description:"Flavourful masala wrap."},

    // Momos
    {id:45,name:"Veg Momos",category:"Momos",price:60,emoji:"🥟",description:"Steamed vegetable momos."},
    {id:46,name:"Paneer Momos",category:"Momos",price:80,emoji:"🥟",description:"Paneer-filled momos."},
    {id:47,name:"Cheese Momos",category:"Momos",price:100,emoji:"🥟",description:"Cheesy momos."},
    {id:48,name:"Peri Peri Cheese Kurkure Momos",category:"Momos",price:150,emoji:"🥟",description:"Crunchy spicy cheese momos."},

    // Garlic bread
    {id:49,name:"Cheesy Garlic Bread",category:"Garlic Bread",price:90,emoji:"🥖",description:"Garlic bread with cheese."},
    {id:50,name:"Exotic Garlic Bread",category:"Garlic Bread",price:110,emoji:"🥖",description:"Garlic bread with toppings."},
    {id:51,name:"Peri-Peri Garlic Bread",category:"Garlic Bread",price:110,emoji:"🥖",description:"Spicy garlic bread."},

    // Burgers
    {id:52,name:"Aloo Tikki Burger",category:"Burgers",price:60,emoji:"🍔",description:"Crispy aloo tikki burger."},
    {id:53,name:"Crispy Masala Burger",category:"Burgers",price:80,emoji:"🍔",description:"Crispy masala burger."},
    {id:54,name:"Paneer Delight Burger",category:"Burgers",price:110,emoji:"🍔",description:"Paneer-filled burger."},

    // Sandwiches
    {id:55,name:"Garlic Cheese Sandwich",category:"Sandwiches",price:60,emoji:"🥪",description:"Garlic and cheese sandwich."},
    {id:56,name:"Tandoori Cheese Corn Sandwich",category:"Sandwiches",price:80,emoji:"🥪",description:"Tandoori corn and cheese."},
    {id:57,name:"Veggie Blast Sandwich",category:"Sandwiches",price:100,emoji:"🥪",description:"Loaded vegetable sandwich."},
    {id:58,name:"Tandoori Paneer Sandwich",category:"Sandwiches",price:150,emoji:"🥪",description:"Tandoori paneer sandwich."},
    {id:59,name:"Paneer Punch Sandwich",category:"Sandwiches",price:150,emoji:"🥪",description:"Paneer-loaded sandwich."},

    // Pizza
    {id:60,name:"Margherita Pizza",category:"Pizza",price:150,emoji:"🍕",description:"Classic tomato and cheese."},
    {id:61,name:"Veggie Affair Pizza",category:"Pizza",price:160,emoji:"🍕",description:"Vegetable-topped pizza."},
    {id:62,name:"Veggie Delight Pizza",category:"Pizza",price:180,emoji:"🍕",description:"A colourful veggie pizza."},
    {id:63,name:"Farmhouse Pizza",category:"Pizza",price:200,emoji:"🍕",description:"Farmhouse vegetable pizza."},
    {id:64,name:"Veggie Paradise Pizza",category:"Pizza",price:210,emoji:"🍕",description:"Loaded vegetable pizza."},
    {id:65,name:"Mexican Green Wave Pizza",category:"Pizza",price:220,emoji:"🍕",description:"Mexican-style pizza."},
    {id:66,name:"Paneer Spicy Supreme Pizza",category:"Pizza",price:210,emoji:"🍕",description:"Spicy paneer pizza."},
    {id:67,name:"Tandoori Paneer Pizza",category:"Pizza",price:240,emoji:"🍕",description:"Tandoori paneer and cheese."},
    {id:68,name:"Tandoori Topping Pizza",category:"Pizza",price:240,emoji:"🍕",description:"Tandoori-style toppings."},
    {id:69,name:"Tandoori Corn Pizza",category:"Pizza",price:170,emoji:"🍕",description:"Tandoori corn pizza."},
    {id:70,name:"Onion Pizza",category:"Pizza",price:190,emoji:"🍕",description:"Onion and cheese pizza."},
    {id:71,name:"Mr. Kulhad Special Pizza",category:"Pizza",price:280,emoji:"🍕",description:"Our signature loaded pizza."}
];

const cart = {};
let selectedCategory = "All";

const $ = (id) => document.getElementById(id);
const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);

const categories = ["All", ...new Set(products.map(p => p.category))];

function renderCategories() {
    $("categories").innerHTML = categories.map(category => `
        <button class="category-btn ${category === selectedCategory ? "active" : ""}"
            data-category="${category}">
            ${category}
        </button>
    `).join("");
}

function getFilteredProducts() {
    const search = $("searchInput").value.trim().toLowerCase();

    return products.filter(product => {
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;
    });
}

function renderProducts() {
    const filtered = getFilteredProducts();

    $("productGrid").innerHTML = filtered.map(product => `
        <article class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-bottom">
                    <span class="product-price">${money(product.price)}</span>
                    <button class="add-btn" data-add="${product.id}"
                        aria-label="Add ${product.name} to cart">+</button>
                </div>
            </div>
        </article>
    `).join("");

    $("resultCount").textContent = `Showing ${filtered.length} items`;
    $("emptyMessage").classList.toggle("hidden", filtered.length > 0);
    $("productGrid").classList.toggle("hidden", filtered.length === 0);
}

function cartEntries() {
    return Object.entries(cart).map(([id, quantity]) => {
        const product = products.find(p => p.id === Number(id));
        return product ? {...product, quantity} : null;
    }).filter(Boolean);
}

function cartTotal() {
    return cartEntries().reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );
}

function renderCart() {
    const items = cartEntries();
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = cartTotal();

    $("cartCount").textContent = count;
    $("cartItems").innerHTML = items.map(item => `
        <div class="cart-line">
            <div class="cart-emoji">${item.emoji}</div>
            <div>
                <h3>${item.name}</h3>
                <p>${money(item.price)}</p>
                <div class="quantity-control">
                    <button data-qty="${item.id}" data-change="-1"
                        aria-label="Remove one">−</button>
                    <span>${item.quantity}</span>
                    <button data-qty="${item.id}" data-change="1"
                        aria-label="Add one">+</button>
                </div>
            </div>
            <span class="line-total">${money(item.price * item.quantity)}</span>
        </div>
    `).join("");

    $("emptyCart").classList.toggle("hidden", items.length > 0);
    $("cartSummary").classList.toggle("hidden", items.length === 0);
    $("subtotal").textContent = money(total);
    $("total").textContent = money(total);
    $("checkoutTotal").textContent = money(total);
}

function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    renderCart();
}

function changeQuantity(id, amount) {
    cart[id] = (cart[id] || 0) + amount;

    if (cart[id] <= 0) {
        delete cart[id];
    }

    renderCart();
}

function openCart() {
    $("overlay").classList.remove("hidden");
    $("cartDrawer").classList.add("open");
}

function closeCart() {
    $("overlay").classList.add("hidden");
    $("cartDrawer").classList.remove("open");
}

function openCheckout() {
    if (cartEntries().length === 0) {
        alert("Please add an item to your cart first.");
        return;
    }

    closeCart();
    $("checkoutModal").classList.remove("hidden");
    $("checkoutTotal").textContent = money(cartTotal());
    $("checkoutMessage").textContent = "";
}

function closeCheckout() {
    $("checkoutModal").classList.add("hidden");
}

$("categories").addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    selectedCategory = button.dataset.category;
    renderCategories();
    renderProducts();
});

$("productGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-add]");
    if (button) addToCart(Number(button.dataset.add));
});

$("cartItems").addEventListener("click", event => {
    const button = event.target.closest("[data-qty]");
    if (!button) return;

    changeQuantity(
        Number(button.dataset.qty),
        Number(button.dataset.change)
    );
});

$("searchInput").addEventListener("input", renderProducts);

$("openCart").addEventListener("click", openCart);
$("closeCart").addEventListener("click", closeCart);
$("overlay").addEventListener("click", closeCart);
$("checkoutBtn").addEventListener("click", openCheckout);
$("closeCheckout").addEventListener("click", closeCheckout);

$("checkoutModal").addEventListener("click", event => {
    if (event.target === $("checkoutModal")) closeCheckout();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCart();
        closeCheckout();
    }
});

$("checkoutForm").addEventListener("submit", event => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) return;

    const orderPreview = {
        customer: {
            name: $("customerName").value.trim(),
            phone: $("phone").value.trim(),
            address: $("address").value.trim()
        },
        paymentMethod: $("payment").value,
        items: cartEntries().map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        total: cartTotal()
    };

    console.log("Checkout preview — not saved to MySQL yet:", orderPreview);

    $("checkoutMessage").textContent =
        `Details validated. Your total is ${money(orderPreview.total)}. ` +
        "MySQL order saving will be enabled when the backend is connected.";
});

$("year").textContent = new Date().getFullYear();

renderCategories();
renderProducts();
renderCart();

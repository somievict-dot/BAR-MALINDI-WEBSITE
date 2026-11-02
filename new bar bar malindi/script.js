const menu = [
  {
    id: 1,
    name: "Classic Beef Burger",
    category: "Burgers",
    price: 450,
    tag: "POPULAR",
    description: "Juicy beef, fresh lettuce and our signature sauce.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burgers",
    price: 550,
    tag: "FAVOURITE",
    description: "Grilled beef with melted cheese and fresh toppings.",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 3,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 850,
    tag: "MUST TRY",
    description: "Golden crust, rich tomato sauce and savoury toppings.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 4,
    name: "Classic Margherita",
    category: "Pizza",
    price: 700,
    tag: "CLASSIC",
    description: "A timeless combination of cheese, tomato and herbs.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 5,
    name: "Crispy Fried Chicken",
    category: "Chicken",
    price: 500,
    tag: "CRISPY",
    description: "Crunchy golden chicken packed with flavour.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 6,
    name: "Grilled Chicken",
    category: "Chicken",
    price: 650,
    tag: "GRILLED",
    description: "Tender grilled chicken with a delicious finish.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 7,
    name: "Golden French Fries",
    category: "Sides",
    price: 180,
    tag: "SIDE PICK",
    description: "Crispy fries, perfect for sharing or keeping.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 8,
    name: "Loaded Fries",
    category: "Sides",
    price: 350,
    tag: "LOADED",
    description: "A satisfying serving of fries with tasty toppings.",
    image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 9,
    name: "Fresh Lemon Drink",
    category: "Drinks",
    price: 150,
    tag: "REFRESHING",
    description: "A refreshing citrus drink to go with your meal.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 10,
    name: "Iced Coffee",
    category: "Drinks",
    price: 250,
    tag: "CHILLED",
    description: "Smooth coffee served over ice.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 11,
    name: "Chicken Burger",
    category: "Burgers",
    price: 400,
    tag: "CRUNCHY",
    description: "Crispy chicken, fresh lettuce and creamy sauce.",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=650&q=80"
  },
  {
    id: 12,
    name: "Chicken Pizza",
    category: "Pizza",
    price: 900,
    tag: "HOUSE PICK",
    description: "A cheesy pizza topped with savoury chicken.",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=650&q=80"
  }
];

const menuGrid = document.getElementById("menuGrid");
const categoryList = document.getElementById("categoryList");
const searchInput = document.getElementById("searchInput");
const mobileSearchInput = document.getElementById("mobileSearchInput");
const resultsText = document.getElementById("resultsText");
const emptyState = document.getElementById("emptyState");

const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const drawerCount = document.getElementById("drawerCount");
const subtotal = document.getElementById("subtotal");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutDialog = document.getElementById("checkoutDialog");
const toast = document.getElementById("toast");

let activeCategory = "All";
let searchTerm = "";
let cart = new Map();
let toastTimer;

const money = amount =>
  `KSh ${amount.toLocaleString("en-KE")}`;

function safeText(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function renderMenu() {
  const filtered = menu.filter(item => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    const searchContent =
      `${item.name} ${item.category} ${item.description}`.toLowerCase();

    return matchesCategory && searchContent.includes(searchTerm.toLowerCase());
  });

  menuGrid.innerHTML = filtered.map(item => `
    <article class="food-card">
      <div class="food-image">
        <img src="${item.image}" alt="${safeText(item.name)}" loading="lazy">
        <span class="food-tag">${safeText(item.tag)}</span>
      </div>
      <div class="food-details">
        <div class="food-title-row">
          <h3 class="food-title">${safeText(item.name)}</h3>
        </div>
        <p class="food-description">${safeText(item.description)}</p>
        <div class="food-bottom">
          <span class="food-price">${money(item.price)}</span>
          <button class="add-button" data-add="${item.id}" aria-label="Add ${safeText(item.name)} to cart">
            <span>+</span> Add
          </button>
        </div>
      </div>
    </article>
  `).join("");

  resultsText.textContent = searchTerm
    ? `${filtered.length} result${filtered.length === 1 ? "" : "s"} found`
    : activeCategory === "All"
      ? "Our popular picks"
      : `${activeCategory} menu`;

  emptyState.hidden = filtered.length !== 0;
  menuGrid.hidden = filtered.length === 0;
}

function setSearch(value) {
  searchTerm = value.trim();
  searchInput.value = value;
  mobileSearchInput.value = value;
  renderMenu();
}

document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  setSearch(searchInput.value);
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", () => setSearch(searchInput.value));
mobileSearchInput.addEventListener("input", () => setSearch(mobileSearchInput.value));

categoryList.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;

  categoryList.querySelectorAll(".category").forEach(category => {
    const selected = category === button;
    category.classList.toggle("active", selected);
    category.setAttribute("aria-pressed", String(selected));
  });

  renderMenu();
});

document.getElementById("resetMenu").addEventListener("click", () => {
  activeCategory = "All";
  setSearch("");

  categoryList.querySelectorAll(".category").forEach(button => {
    const selected = button.dataset.category === "All";
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function addToCart(id) {
  const item = menu.find(product => product.id === Number(id));
  if (!item) return;

  const current = cart.get(item.id);
  cart.set(item.id, {
    ...item,
    quantity: current ? current.quantity + 1 : 1
  });

  renderCart();
  showToast(`${item.name} added to your order`);
}

menuGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});

function changeQuantity(id, change) {
  const item = cart.get(Number(id));
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart.delete(item.id);
  } else {
    cart.set(item.id, item);
  }

  renderCart();
}

function getCartCount() {
  return [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
}

function getSubtotal() {
  return [...cart.values()].reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

function renderCart() {
  const items = [...cart.values()];
  const count = getCartCount();
  const total = getSubtotal();

  cartCount.textContent = count;
  drawerCount.textContent = `(${count})`;
  subtotal.textContent = money(total);
  checkoutTotal.textContent = money(total);

  if (items.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <span>🛍️</span>
        <h3>Your cart is empty</h3>
        <p>Find something delicious on our menu.</p>
      </div>`;
    return;
  }

  cartItems.innerHTML = items.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${safeText(item.name)}">
      <div>
        <h4>${safeText(item.name)}</h4>
        <span class="item-price">${money(item.price * item.quantity)}</span>
        <div class="quantity-control">
          <button type="button" data-quantity="${item.id}" data-change="-1" aria-label="Decrease ${safeText(item.name)} quantity">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-quantity="${item.id}" data-change="1" aria-label="Increase ${safeText(item.name)} quantity">+</button>
        </div>
      </div>
      <button type="button" class="remove-item" data-remove="${item.id}" aria-label="Remove ${safeText(item.name)}">✕</button>
    </div>
  `).join("");
}

cartItems.addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");

  if (quantityButton) {
    changeQuantity(
      quantityButton.dataset.quantity,
      Number(quantityButton.dataset.change)
    );
  }

  if (removeButton) {
    cart.delete(Number(removeButton.dataset.remove));
    renderCart();
    showToast("Item removed from your order");
  }
});

function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("visible");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  document.getElementById("closeCart").focus();
}

function closeCart() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("visible");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.getElementById("clearCart").addEventListener("click", () => {
  if (cart.size === 0) {
    showToast("Your cart is already empty");
    return;
  }

  cart.clear();
  renderCart();
  showToast("Cart cleared");
});

document.getElementById("checkoutButton").addEventListener("click", () => {
  if (cart.size === 0) {
    showToast("Add something to your cart first");
    return;
  }

  closeCart();
  checkoutDialog.showModal();
});

document.getElementById("closeCheckout").addEventListener("click", () => {
  checkoutDialog.close();
});

checkoutDialog.addEventListener("click", event => {
  if (event.target === checkoutDialog) checkoutDialog.close();
});

document.getElementById("checkoutForm").addEventListener("submit", event => {
  event.preventDefault();

  if (cart.size === 0) {
    checkoutDialog.close();
    showToast("Your cart is empty");
    return;
  }

  const form = new FormData(event.currentTarget);
  const name = String(form.get("customerName")).trim();
  const phone = String(form.get("customerPhone")).trim();
  const orderType = String(form.get("orderType"));
  const notes = String(form.get("orderNotes")).trim();

  if (!name || !phone) {
    showToast("Please enter your name and phone number");
    return;
  }

  const orderLines = [...cart.values()].map(item =>
    `• ${item.name} x${item.quantity} — ${money(item.price * item.quantity)}`
  );

  const message = [
    "Hello Bar Bar Malindi! I'd like to place an order.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Order type: ${orderType}`,
    "",
    "MY ORDER",
    ...orderLines,
    "",
    `Subtotal: ${money(getSubtotal())}`,
    notes ? `Notes: ${notes}` : "",
    "",
    "Please confirm availability and any delivery charges."
  ].filter(Boolean).join("\n");

  // Replace this number with the restaurant's official WhatsApp number.
  // Use the country code, without +, spaces or leading zero.
  const restaurantWhatsApp = "";

  if (!/^\d{10,15}$/.test(restaurantWhatsApp)) {
    showToast("Add the restaurant's WhatsApp number in script.js first");
    return;
  }

  const whatsappURL =
    `https://wa.me/${restaurantWhatsApp}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

document.getElementById("year").textContent = new Date().getFullYear();

renderMenu();
renderCart();
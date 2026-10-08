const productsUrl = "http://localhost:4001/products";
const cartUrl = "http://localhost:4003/cart/1";

async function loadProducts() {
  const res = await fetch(productsUrl);
  const products = await res.json();

  document.getElementById("products").innerHTML = products.map(p => `
    <div class="card">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <strong>₹${p.price}</strong><br><br>
      <button onclick="addToCart(${p.id})">Add to cart</button>
    </div>
  `).join("");
}

async function addToCart(productId) {
  await fetch(cartUrl, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ productId, quantity: 1 })
  });
  loadCart();
}

async function loadCart() {
  const res = await fetch(cartUrl);
  const items = await res.json();
  document.getElementById("cart").innerHTML =
    items.length ? items.map(i => `<p>Product ${i.productId} × ${i.quantity}</p>`).join("") : "<p>Cart is empty</p>";
}

loadProducts();
loadCart();

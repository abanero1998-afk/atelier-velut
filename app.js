const cursor = document.getElementById("cursor");
const KEY = "velut-cart";
let cart = JSON.parse(localStorage.getItem(KEY) || "[]");
document.addEventListener("mousemove", (e) => {
  if (!cursor) return;
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => cursor && cursor.classList.add("big"));
  el.addEventListener("mouseleave", () => cursor && cursor.classList.remove("big"));
});
const menu = document.getElementById("menu");
const cartEl = document.getElementById("cart");
const openMenu = document.querySelector("[data-open='menu']");
if (openMenu) openMenu.onclick = () => menu.classList.add("open");
const closeMenu = document.querySelector("[data-close]");
if (closeMenu) closeMenu.onclick = () => menu.classList.remove("open");
const cartBtn = document.getElementById("cartBtn");
if (cartBtn) cartBtn.onclick = () => cartEl.classList.add("open");
const closeCart = document.querySelector("[data-close-cart]");
if (closeCart) closeCart.onclick = () => cartEl.classList.remove("open");
document.querySelectorAll("#menu a").forEach((a) => a.addEventListener("click", () => menu.classList.remove("open")));
function save() { localStorage.setItem(KEY, JSON.stringify(cart)); }
function renderCart() {
  const box = document.getElementById("cartItems");
  const count = document.getElementById("cartCount");
  const total = document.getElementById("cartTotal");
  if (!box) return;
  count.textContent = cart.length;
  if (!cart.length) { box.innerHTML = "<p class='note'>La borsa è vuota.</p>"; total.textContent = "€ 0"; return; }
  box.innerHTML = cart.map((i, idx) => `<div class="cart-line"><span>${i.name}${i.size ? " · " + i.size : ""}</span><span>€ ${i.price} <button data-rm="${idx}" style="background:none;border:0;color:#c4a574;cursor:pointer">rimuovi</button></span></div>`).join("");
  total.textContent = "€ " + cart.reduce((s, i) => s + i.price, 0);
  box.querySelectorAll("[data-rm]").forEach((b) => { b.onclick = () => { cart.splice(Number(b.dataset.rm), 1); save(); renderCart(); }; });
}
document.querySelectorAll(".add").forEach((btn) => {
  btn.onclick = () => {
    const size = document.querySelector(".size.on")?.dataset.size || "";
    cart.push({ id: btn.dataset.id, name: btn.dataset.name, price: Number(btn.dataset.price), size });
    save(); renderCart(); cartEl.classList.add("open");
  };
});
const checkout = document.getElementById("checkout");
if (checkout) checkout.onclick = () => { checkout.textContent = cart.length ? "Richiesta inviata — ti scriviamo" : "Aggiungi un capo prima"; };
const form = document.getElementById("form");
if (form) form.addEventListener("submit", (e) => { e.preventDefault(); document.getElementById("formOk").hidden = false; e.target.reset(); });
document.querySelectorAll(".size").forEach((s) => { s.onclick = () => { document.querySelectorAll(".size").forEach((x) => x.classList.remove("on")); s.classList.add("on"); }; });
renderCart();
function kickVideos() {
  document.querySelectorAll("video").forEach((v) => {
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.removeAttribute("controls");
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  });
}
kickVideos();
document.addEventListener("visibilitychange", () => { if (!document.hidden) kickVideos(); });
window.addEventListener("touchstart", kickVideos, { once: true });

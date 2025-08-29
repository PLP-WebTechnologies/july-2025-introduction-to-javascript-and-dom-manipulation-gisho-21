/* =========================================================
   Part 0 — Small helpers used throughout
   ========================================================= */
const $ = (sel) => document.querySelector(sel);
const out = (sel, text) => ($(sel).textContent = text);

/* =========================================================
   Part 1 — Variables, Data Types, Operators, Conditionals
   Goal: show basic logic & flow using user input.
   ========================================================= */
const userForm = $("#userForm");
userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Variable declarations (strings & numbers)
  const name = $("#nameInput").value.trim();      // string
  const age = Number($("#ageInput").value);       // number
  const fav = Number($("#favInput").value);       // number

  // Operators + conditionals
  const isAdult = age >= 18;                      // boolean via comparison
  const parity = fav % 2 === 0 ? "even" : "odd";  // modulo + ternary operator

  // If/else chain
  let lifeStage = "";
  if (age < 13) lifeStage = "a child";
  else if (age < 20) lifeStage = "a teenager";
  else if (age < 65) lifeStage = "an adult";
  else lifeStage = "a senior";

  // Output to the page (DOM interaction #1)
  out(
    "#basicOutput",
    `Hi ${name}! You are ${age} (${lifeStage}). Your favorite number ${fav} is ${parity}. ${
      isAdult ? "You can vote." : "You cannot vote yet."
    }`
  );
});

/* =========================================================
   Part 2 — Functions (Reusability)
   At least 2 custom functions used by UI.
   ========================================================= */

/**
 * calculateTotal(prices:number[], taxRate:number)
 * Returns a number: sum of prices plus tax.
 */
function calculateTotal(prices, taxRate = 0.08) {
  // Loop example #1 (Array.prototype.reduce under the hood is a loop, but we’ll
  // also do an explicit loop in Part 3)
  let subtotal = 0;
  for (let i = 0; i < prices.length; i++) subtotal += prices[i];
  const total = subtotal * (1 + taxRate);
  return Number(total.toFixed(2));
}

/**
 * toTitleCase(str:string)
 * Returns a string with each word Capitalized.
 */
function toTitleCase(str) {
  return str
    .trim()
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/* UI wiring for Part 2 */
const demoCart = [5.99, 2.5, 12.0, 3.25]; // sample data
out("#cartList", JSON.stringify(demoCart));

$("#totalBtn").addEventListener("click", () => {
  const ratePct = Number($("#taxInput").value || 0);
  const total = calculateTotal(demoCart, ratePct / 100);
  out("#totalOutput", `Total with ${ratePct}% tax: $${total}`);
});

$("#titleBtn").addEventListener("click", () => {
  const raw = $("#titleInput").value;
  out("#titleOutput", toTitleCase(raw));
});

/* =========================================================
   Part 3 — Loops (Repetition & Iteration)
   At least 2 loop examples.
   ========================================================= */

/* Loop example #2 — For loop countdown */
$("#countBtn").addEventListener("click", () => {
  const start = Math.max(0, Number($("#countInput").value || 5));
  let text = "";
  for (let i = start; i >= 0; i--) {
    text += i === 0 ? "🚀 Blast off!" : i + "… ";
  }
  out("#countOutput", text);
});

/* Loop example #3 — forEach to generate boxes dynamically */
$("#boxBtn").addEventListener("click", () => {
  const count = Math.min(30, Math.max(1, Number($("#boxInput").value || 6)));
  const wrap = $("#boxWrap");
  wrap.innerHTML = ""; // clear previous content

  // Create an array of length `count` then iterate with forEach
  Array.from({ length: count }).forEach((_, idx) => {
    const div = document.createElement("div");
    div.className = "box";
    // Random color for fun (DOM style update)
    div.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)} 80% 80%)`;
    div.title = `Box #${idx + 1}`;
    wrap.appendChild(div);
  });
});

/* =========================================================
   Part 4 — DOM Mastery (3+ interactions)
   1) Updating text content on submit (done in Part 1)
   2) Toggling classes for dark mode
   3) Creating elements dynamically (boxes above)
   4) Toggling visibility of a section
   ========================================================= */

/* Dark Mode toggle (DOM interaction #2) */
$("#themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/* Toggle visibility of Part 2 section (DOM interaction #3) */
$("#togglePart2Btn").addEventListener("click", () => {
  $("#part2").classList.toggle("hidden");
});

/* Optional: small CSS hook for .hidden */
const style = document.createElement("style");
style.textContent = `.hidden{display:none !important}`;
document.head.appendChild(style);

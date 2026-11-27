// Main: the deal finder's behaviour. One job: state, search, filters, sorting and
// hash routing. Data lives in data.js, numbers in verdict.js, markup in views.js.

import { deals, CATEGORIES, STORES } from "./data.js";
import { sortDeals, discountPct } from "./verdict.js";
import { dealCard, dealDetail, emptyState } from "./views.js";

const state = {
  query: "",
  category: "All",
  store: "All",
  minPct: 0,
  sort: "pct",
};

const $ = (sel) => document.querySelector(sel);

function applyFilters() {
  const q = state.query.trim().toLowerCase();
  return deals.filter((d) => {
    if (q && !(d.title.toLowerCase().includes(q) || d.store.toLowerCase().includes(q))) return false;
    if (state.category !== "All" && d.category !== state.category) return false;
    if (state.store !== "All" && d.store !== state.store) return false;
    if (discountPct(d) < state.minPct) return false;
    return true;
  });
}

function renderList() {
  const list = sortDeals(applyFilters(), state.sort);
  $("#count").textContent = `${list.length} of ${deals.length} deals`;
  $("#results").innerHTML = list.length ? list.map(dealCard).join("") : emptyState();
}

function renderDetail(id) {
  const deal = deals.find((d) => d.id === id);
  const main = $("#main");
  if (!deal) {
    main.innerHTML = `<p class="empty">That deal is not on the board. <a href="#/">Back to all deals</a></p>`;
    return;
  }
  const sameProduct = deals.filter((d) => d.title === deal.title);
  main.innerHTML = dealDetail(deal, sameProduct);
  window.scrollTo(0, 0);
}

function route() {
  const hash = location.hash || "#/";
  const m = hash.match(/^#\/deal\/([\w-]+)$/);
  if (m) {
    $("#controls").hidden = true;
    renderDetail(m[1]);
  } else {
    $("#controls").hidden = false;
    const main = $("#main");
    if (!main.querySelector("#results")) {
      main.innerHTML = `<p id="count" class="count"></p><div id="results" class="grid"></div>`;
    }
    renderList();
  }
}

function option(value, label) {
  const o = document.createElement("option");
  o.value = value;
  o.textContent = label;
  return o;
}

function buildControls() {
  const cat = $("#filter-category");
  cat.append(option("All", "All categories"));
  CATEGORIES.forEach((c) => cat.append(option(c, c)));
  const store = $("#filter-store");
  store.append(option("All", "All stores"));
  STORES.forEach((s) => store.append(option(s, s)));
  const pct = $("#filter-discount");
  pct.append(option("0", "Any discount"));
  [20, 30, 40, 50].forEach((p) => pct.append(option(String(p), `${p}% off or more`)));
  const sort = $("#sort");
  [
    ["pct", "Biggest % off"],
    ["saving", "Biggest $ saving"],
    ["price-asc", "Price: low to high"],
    ["price-desc", "Price: high to low"],
  ].forEach(([v, l]) => sort.append(option(v, l)));

  $("#search").addEventListener("input", (e) => {
    state.query = e.target.value;
    renderList();
  });
  cat.addEventListener("change", (e) => {
    state.category = e.target.value;
    renderList();
  });
  store.addEventListener("change", (e) => {
    state.store = e.target.value;
    renderList();
  });
  pct.addEventListener("change", (e) => {
    state.minPct = Number(e.target.value);
    renderList();
  });
  sort.addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderList();
  });
}

buildControls();
window.addEventListener("hashchange", route);
route();

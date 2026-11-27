// Views: the HTML for a deal card and for a deal's own page. One job: turn deal
// data into markup. No data lives here, and no filtering or routing lives here.

import { discountPct, saving, money, moneyFull, verdictLabel, checkedLabel } from "./verdict.js";

export function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function dealCard(deal) {
  const pct = discountPct(deal);
  return `
  <article class="card" data-id="${esc(deal.id)}">
    <div class="card-top">
      <span class="store">${esc(deal.store)}</span>
      <span class="verdict verdict-${esc(deal.verdict)}">${esc(verdictLabel(deal))}</span>
    </div>
    <h3 class="card-title"><a href="#/deal/${esc(deal.id)}">${esc(deal.title)}</a></h3>
    <p class="card-cat">${esc(deal.category)}</p>
    <p class="card-price"><span class="now">${money(deal.price)}</span> <span class="was">${moneyFull(deal.was)}</span> <span class="pct">-${pct}%</span></p>
    <p class="card-save">You save ${money(saving(deal))}</p>
    <p class="card-why">${esc(deal.verdictWhy)}</p>
    <p class="card-checked">Checked ${esc(checkedLabel(deal.checked))}</p>
    <div class="card-actions">
      <a class="btn" href="${esc(deal.url)}" target="_blank" rel="noopener">View at ${esc(deal.store)}</a>
      <a class="details" href="#/deal/${esc(deal.id)}">Details</a>
    </div>
  </article>`;
}

export function dealDetail(deal, sameProduct) {
  const pct = discountPct(deal);
  const others = sameProduct.filter((d) => d.id !== deal.id);
  const compare = others.length
    ? `<section class="compare">
        <h2>Same product, other stores</h2>
        <table>
          <thead><tr><th>Store</th><th>Price</th><th>Usual</th><th>Discount</th><th></th></tr></thead>
          <tbody>
            ${others
              .map(
                (o) => `<tr><td>${esc(o.store)}</td><td>${money(o.price)}</td><td>${moneyFull(o.was)}</td><td>-${discountPct(o)}%</td><td><a href="${esc(o.url)}" target="_blank" rel="noopener">View</a></td></tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </section>`
    : "";
  return `
  <article class="detail">
    <p class="back"><a href="#/">&larr; All deals</a></p>
    <div class="detail-head">
      <span class="store">${esc(deal.store)}</span>
      <span class="verdict verdict-${esc(deal.verdict)}">${esc(verdictLabel(deal))}</span>
    </div>
    <h2 class="detail-title">${esc(deal.title)}</h2>
    <p class="detail-cat">${esc(deal.category)}</p>
    <p class="detail-price"><span class="now">${money(deal.price)}</span> <span class="was">${moneyFull(deal.was)}</span> <span class="pct">-${pct}%</span></p>
    <p class="detail-save">You save ${money(saving(deal))} off the usual price of ${moneyFull(deal.was)}.</p>
    <h3>Is it really a deal?</h3>
    <p class="detail-why"><strong>${esc(verdictLabel(deal))}.</strong> ${esc(deal.verdictWhy)}.</p>
    <h3>Where this price was read</h3>
    <p class="detail-source">Checked ${esc(checkedLabel(deal.checked))} — ${esc(deal.source)}. Prices can change; the store's page is the final word.</p>
    <p class="detail-actions"><a class="btn" href="${esc(deal.url)}" target="_blank" rel="noopener">View at ${esc(deal.store)}</a></p>
    ${compare}
  </article>`;
}

export function emptyState() {
  return `<p class="empty">No deals match that search. Try clearing a filter.</p>`;
}

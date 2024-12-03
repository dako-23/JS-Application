import { html } from "../../lib/lit-html.js";
import { get } from "../data/api.js";

const template = (onSearch, results, query = "") => html`
<section id="search">
  <div class="form">
    <h2>Search</h2>
    <form class="search-form" @submit=${onSearch}>
      <input type="text" name="search" id="search-input" value="${query}"
      />
      <button class="button-list">Search</button>
    </form>
  </div>
  <h4>Results:</h4>
  <div class="search-result">
    ${results.length === 0
        ? html`<p class="no-result">There is no TV show with this title</p>`
        : results.map(
            (show) => html`
              <div class="show">
                <img src="${show.imageUrl}" alt="${show.title}" />
                <div class="show">
                  <h3 class="title">${show.title}</h3>
                  <p class="genre">Genre: ${show.genre}</p>
                  <p class="country-of-origin">
                    Country of Origin: ${show.country}
                  </p>
                  <a class="details-btn" href="/dashboard/${show._id}/details">Details</a>
                </div>
              </div>`)}
  </div>
</section>
`;

export async function searchView(ctx) {
  const query = ctx.querystring.split("=")[1] || ""; // Извличане на търсената дума от URL

  let results = [];
  if (query) {
    try {
      results = await get(`/data/shows?where=title%20LIKE%20%22${query}%22`);
    } catch (err) {
      console.error("Error fetching shows:", err);
    }
  }

  ctx.render(template(onSearch, results, query));

  function onSearch(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("search").trim();

    if (!search) {
      return alert("Please enter a search term.");
    }

    ctx.page.redirect(`/search?search=${encodeURIComponent(search)}`);
  }
}

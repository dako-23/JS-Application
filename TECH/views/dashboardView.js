import { html } from '../lib/lit-html.js'
import { get } from '../data/api.js'

const template = (data, isLoading) => html`
<h2>Solutions</h2>
    <section id="solutions">
        ${isLoading ? html`<p>Loading...</p>` :
        data.length == 0
            ? html`<h2 id="no-solution">No Solutions Added.</h2>`
            : data.map(res => html` 
        <div class="solution">
            <img src="${res['image-url']}" alt="example1" />
            <div class="solution-info">
                <h3 class="type">${res.type}</h3>
                <p class="description">
                    ${res.description}
                </p>
                <a class="details-btn" href="/details/${res._id}">Learn More</a>
            </div>
        </div>`)}
`

export async function dashboardView(ctx) {
    let isLoading = true
    updateView([], isLoading);

    function updateView(data, isLoading) {
        ctx.render(template(data, isLoading));
    }

    try {
        const data = await get('/data/solutions?sortBy=_createdOn%20desc');
        isLoading = false
        updateView(data, isLoading)

    } catch (err) {
        isLoading = false
        // updateView([], isLoading)
    }

}
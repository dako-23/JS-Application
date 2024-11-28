import { html, nothing } from 'https://unpkg.com/lit-html';
import { get } from '../data/api.js';


const template = (data, isLoading) => html`
<h2>Solutions</h2>
    <section id="solutions">
        ${isLoading ? html`<p>Loading...</p>` :
        data.length > 0 ? data.map(res => html` 
        <div class="solution">
            <img src="${res.image}" alt="example1" />
            <div class="solution-info">
                <h3 class="type">${res.type}</h3>
                <p class="description">
                    ${res.description}
                </p>
                <a class="details-btn" href="dashboard/details/${res._id}">Learn More</a>
            </div>
        </div>`)
            : html`<h2 id="no-solution">No Solutions Added.</h2>`}
`

export default async function dashboardView(ctx) {
    let isLoading = true
    updateView([], isLoading);

    function updateView(data, isLoading) {
        ctx.render(template(data, isLoading));
    }

    const productClickHandler = (productId) => {
        page.redirect(`/catalog/${productId}`);
    };

    try {
        const data = await get('/data/solutions?sortBy=_createdOn%20desc');
        isLoading = false
        updateView(data, isLoading, productClickHandler)

    } catch (err) {
        
        isLoading = false
        updateView([], isLoading)
        err.handled = true;
        // console.log(err);
        
    }

}
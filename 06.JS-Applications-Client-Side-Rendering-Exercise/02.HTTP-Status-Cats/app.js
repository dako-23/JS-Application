import { html, render } from "https://unpkg.com/lit-html";
import { cats } from "./catSeeder.js";

const sectionEl = document.querySelector('#allCats')

const template = () => html`    
<ul>
    ${cats.map(cat =>
    html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button @click=${(e) => toggle(e, cat.id)} class="showBtn">Show status code</button>
                <div class="status" style="display: none" id="${cat.id}">
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>
            </div>
    </li>
    `
)}
</ul>
`
const toggle = (e, id) => {

    const detailsEl = document.getElementById(id);
    const isHidden = detailsEl.style.display === 'none'

    detailsEl.style.display = isHidden ? 'block' : 'none';
    e.target.textContent = isHidden ? 'Hide status code' : 'Show status code';

}

render(template(), sectionEl)
import { html, render } from 'https://unpkg.com/lit-html';
import furnitures from "../api/furnitures.js";

const rootEl = document.querySelector('#root');

const template = (furnitures = []) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    ${furnitures.map(furniture => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${furniture.img}" />
                <p>${furniture.description}</p>
                <footer>
                    <p>Price: <span>${furniture.price} $</span></p>
                </footer>
                <div>
                    <a href="/catalog/${furniture._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>`)}
</div>
`;

export default function homePage() {
    render(template([]), rootEl);

    furnitures.getAll()
        .then(furnitures => {
            render(template(furnitures), rootEl);
        });
}

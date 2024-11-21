import { html, render } from 'https://unpkg.com/lit-html';
import furnitures from "../api/furnitures.js";
import catalogPage from './catalog.js';
const url = 'http://localhost:3030/data/catalog'

const rootEl = document.querySelector('#root');

const template = ({ product, isOwner }) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${product.img}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${product.make}</span></p>
        <p>Model: <span>${product.model}</span></p>
        <p>Year: <span>${product.year}</span></p>
        <p>Description: <span>${product.description}</span></p>
        <p>Price: <span>${product.price} $</span></p>
        <p>Material: <span>${product.material}</span></p>
        <div>
            ${isOwner
        ? html`
                <a href="/catalog/${product._id}/edit" class="btn btn-info">Edit</a>
                <a href="/catalog/${product._id}/delete" class="btn btn-red">Delete</a>
                `
        : ''}
        </div>
    </div>
</div>
`;

export default async function detailsPage(ctx) {
    const { furnitureId } = ctx.params;

    const product = await furnitures.getOne(furnitureId);

    const userId = localStorage.getItem('_id');
    const isOwner = product._ownerId === userId;

    render(template({ product, isOwner }), rootEl);
}


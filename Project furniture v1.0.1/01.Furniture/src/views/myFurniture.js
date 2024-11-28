import { html, render } from 'https://unpkg.com/lit-html';
import furnitures from "../api/furnitures.js";

const rootEl = document.querySelector('#root');


const template = (furnitures = []) => html`
            <div class="col-md-12">
                <h1>My Furniture</h1>
                ${furnitures.length == 0 ?
        html`<p>This list is empty.</p>`
        :
        html`<p>This is a list of your publications.</p>`}
            </div>
        </div>
        <div class="row space-top">
           ${furnitures.map(furniture => html` <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src=${furniture.img}/>
                            <p>${furniture.description}</p>
                            <footer>
                                <p>${furniture.price} $<span></span></p>
                            </footer>
                            <div>
                                <a href="/my-furniture/${furniture._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>`)}
            </div>
`

export default function myFurnitureView() {
    render(template([]), rootEl);

    const id = localStorage.getItem('_id');

    furnitures.myFurniture(id)
        .then(furnitures => {
            render(template(furnitures), rootEl);
        });
}










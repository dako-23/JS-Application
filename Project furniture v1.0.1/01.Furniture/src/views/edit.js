import { html, render } from 'https://unpkg.com/lit-html';
import page from "//unpkg.com/page/page.mjs";

import furnitures from "../api/furnitures.js";

const rootEl = document.querySelector('#root');

const template = (onSubmit, furniture = {}) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" value="${furniture.make}">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control" id="new-model" type="text" name="model" value="${furniture.model}">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control" id="new-year" type="number" name="year" value="${furniture.year}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" value="${furniture.description}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" value="${furniture.price}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" value="${furniture.img}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value="${furniture.material}">
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>
    </div>
`

export default function editPage(ctx) {
    render(template(editSubmit.bind(ctx)), rootEl);

    furnitures.getOne(ctx.params.furnitureId)
        .then(furniture => {
            render(template(editSubmit.bind(ctx), furniture), rootEl);
        });
}

function editSubmit(e) {
    e.preventDefault();

    const furnitureId = this.params.furnitureId

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const inputs = [
        { input: e.target.querySelector('#new-make'), condition: () => data.make.trim().length >= 4 },
        { input: e.target.querySelector('#new-model'), condition: () => data.model.trim().length >= 4 },
        { input: e.target.querySelector('#new-year'), condition: () => data.year >= 1950 && data.year <= 2050 },
        { input: e.target.querySelector('#new-description'), condition: () => data.description.trim().length > 10 },
        { input: e.target.querySelector('#new-price'), condition: () => Number(data.price) > 0 },
        { input: e.target.querySelector('#new-image'), condition: () => data.img.trim() !== '' },
    ];

    const isValid = validateInputs(inputs);

    if (!isValid) return;

    furnitures.update(furnitureId, data)
        .then(() => page.redirect(`/catalog/${furnitureId}`))

}

function validateInputs(inputs) {
    let formIsValid = true;

    inputs.forEach(({ input, condition }) => {
        const isValid = condition();
        input.classList.toggle('is-valid', isValid);
        input.classList.toggle('is-invalid', !isValid);

        if (!isValid) {
            formIsValid = false;
        }
    });

    return formIsValid;
}
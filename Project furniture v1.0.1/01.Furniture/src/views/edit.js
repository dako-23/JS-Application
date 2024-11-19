import { html, render } from 'https://unpkg.com/lit-html';
import furnitures from "../api/furnitures.js";
import page from "//unpkg.com/page/page.mjs";

const url = 'http://localhost:3030/data/catalog';
const rootEl = document.querySelector('#root');

export default async function editPage(ctx) {
    const { furnitureId } = ctx.params;
    const product = await furnitures.getOne(furnitureId);

    const template = () => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${(e) => editSubmit(e, furnitureId)}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" value="${product.make}">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control" id="new-model" type="text" name="model" value="${product.model}">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control" id="new-year" type="number" name="year" value="${product.year}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" value="${product.description}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" value="${product.price}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" value="${product.img}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value="${product.material}">
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>
    </div>
`
    render(template({
        product
    }), rootEl);
}

function validateInput(input, condition) {
    if (condition) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
}

async function editSubmit(e, furnitureId) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const makeInput = e.target.querySelector('#new-make');
    const modelInput = e.target.querySelector('#new-model');
    const yearInput = e.target.querySelector('#new-year');
    const descriptionInput = e.target.querySelector('#new-description');
    const priceInput = e.target.querySelector('#new-price');
    const imgInput = e.target.querySelector('#new-image');

    validateInput(makeInput, data.make.length >= 4);
    validateInput(modelInput, data.model.length >= 4);
    validateInput(yearInput, data.year >= 1950 && data.year <= 2050);
    validateInput(descriptionInput, data.description.length > 10);
    validateInput(priceInput, Number(data.price) > 0);
    validateInput(imgInput, data.img.trim() !== '');


    const isValid = makeInput.classList.contains('is-valid') &&
        modelInput.classList.contains('is-valid') &&
        yearInput.classList.contains('is-valid') &&
        descriptionInput.classList.contains('is-valid') &&
        priceInput.classList.contains('is-valid') &&
        imgInput.classList.contains('is-valid');

    if (!isValid) return;

    const token = localStorage.getItem('accessToken');

    await fetch(`${url}/${furnitureId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(data)
    });
    page.redirect(`/catalog/${furnitureId}`)
}
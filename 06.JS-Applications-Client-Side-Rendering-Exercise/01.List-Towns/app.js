import { html, render } from "https://unpkg.com/lit-html";

const bodyEl = document.querySelector('#body');
let textArea = [];

const template = () => html`

    <form @submit=${previewTowns} action="#" class="content">
        <label for="towns">Towns</label>
        <input id="towns" name="towns" type="text" />
        <button id="btnLoadTowns">Load</button>
    </form>
    <div id="root">
         <ul>
            ${renderLi()}
        </ul>
    </div>
`
const renderLi = () => { return textArea.map(city => html`<li>${city}</li>`) }

const previewTowns = (e) => {
    e.preventDefault();

    textArea = document.querySelector('#towns')
        .value
        .split(', ')

    if (textArea == '') return;

    render(template(), bodyEl)
    e.target.reset();
}

render(template(), bodyEl)

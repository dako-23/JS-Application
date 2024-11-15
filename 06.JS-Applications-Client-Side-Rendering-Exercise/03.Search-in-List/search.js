import { html, render } from "https://unpkg.com/lit-html";
import { towns } from "./towns.js";

const inputEl = document.querySelector('#searchText')
const townListEl = document.querySelector('#towns');
const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', matchTowns);

function matchTowns() {

   const searchTerm = inputEl.value.toLowerCase();
   render(template(searchTerm), townListEl);

}

const createLi = (town, searchTerm) => {
   const isMatch = searchTerm && town.toLowerCase().includes(searchTerm);
   return html`<li class=${isMatch ? 'active' : ''}>${town}</li>`;
}

const template = (searchTerm = '') => html`
   <ul>
${towns.map(town => createLi(town, searchTerm))}
   </ul>
`

render(template(), townListEl);
import { html, render } from 'https://unpkg.com/lit-html';
import { contacts } from "./contacts.js";

const containter = document.querySelector('#contacts');

const template = () =>
    Object.values(contacts).map(data => html`
<div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name: ${data.name}</h2>
                <button @click=${(e) => toggle(e)} class="detailsBtn">Details</button>
                <div class="details" id="detail">
                    <p>Phone number: ${data.phoneNumber}</p>
                    <p>Email: ${data.email}</p>
                </div>
            </div>
        </div>
    `
    )

function toggle(event) {

    const detailsEl = event.target.closest('.info').querySelector('.details');
    detailsEl.style.display = detailsEl.style.display === 'none' ? 'block' : 'none';
}

render(template(), containter);





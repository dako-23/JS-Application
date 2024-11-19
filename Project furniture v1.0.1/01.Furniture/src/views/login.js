import page from "//unpkg.com/page/page.mjs";
import { html, render } from 'https://unpkg.com/lit-html';

import auth from "../api/auth.js";

const rootEl = document.querySelector('#root')

const template = () => html`
<div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${loginSubmitHandler}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
    </div>
`


export default function loginPage() {
    render(template(), rootEl);
}

function loginSubmitHandler(e) {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

    auth.login(email, password)
        .then(() => {
            page.redirect('/');
        })
        .catch(err => alert(err.message));
};
import { html } from "../lib/lit-html.js";
import { register } from "../data/users.js";

const template = (onRegister) => html`
 <section id="register">
    <div class="form">
        <img class="border" src="./images/border.png" alt="" />
        <h2>Register</h2>
        <form @submit=${onRegister} class="register-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>
`

export function registerView(ctx) {

    ctx.render(template(onRegister));

    async function onRegister(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (!data.email || !data.password) {
            window.alert('All fields are required!');
            return;
        } else if (data.password !== data['re-password']) {
            window.alert("Passwords don't match");
            return;
        }

        await register(data.email, data.password);
        event.target.reset();
        ctx.page.redirect('/');
    }
}
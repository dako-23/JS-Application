import { html } from "../lib/lit-html.js";
import { login } from "../data/users.js";

const loginTemplate = (onLogin) => html`
      <section id="login">
<div class="form">
          <img class="border" src="./images/border.png" alt="" />
          <h2>Login</h2>
          <form @submit=${onLogin} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="/register">Create an account</a>
            </p>
          </form>
</div>
<section>
`;

export default function loginPage(ctx) {
  ctx.render(loginTemplate(onLogin));

  async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.email || !data.password) {
      window.alert('All fields are required!');
      return;
    }
      await login(data.email, data.password);
      ctx.page.redirect('/')
  }
}
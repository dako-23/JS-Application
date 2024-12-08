import { html } from "../../lib/lit-html.js";
import { login, register, logout } from "../data/users.js";
import { showError } from "./showError.js";



const templateLogin = (onLogin) => html`
<section id="login">
        <div class="form">
          <h2>Login</h2>
          <form class="login-form" @submit=${onLogin}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="/register">Create an account</a>
            </p>
          </form>
        </div>
  </section>
`

export function loginPage(ctx) {
  ctx.render(templateLogin(onLogin));

  async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.email || !data.password) {
      // return window.alert('All fields are required!');
      return showError('All fields are required!')
    }

    await login(data.email, data.password);
    ctx.page.redirect('/')
  }
}


const templateRegister = (onRegister) => html`
<section id="register">
        <div class="form">
          <h2>Register</h2>
          <form class="register-form" @submit=${onRegister}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="#">Login</a></p>
          </form>
        </div>
</section>
`

export function registerView(ctx) {

  ctx.render(templateRegister(onRegister));

  async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.email || !data.password) {
       window.alert('All fields are required!');
       showError('All fields are required!')
       return

    } else if (data.password !== data['re-password']) {
      window.alert("Passwords don't match");
      showError("Passwords don't match")
      return
    }

    await register(data.email, data.password);

    ctx.page.redirect('/');
  }
}

export async function logoutPage(ctx) {
  const res = await logout()
    .finally(ctx.page.redirect('/'))

  return res
}
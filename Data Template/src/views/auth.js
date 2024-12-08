import { html } from "../../lib/lit-html.js";
import { login, register, logout } from "../data/users.js";
// import { showError } from "./showError.js";



const templateLogin = (onLogin) => html`

`

export function loginPage(ctx) {
  ctx.render(templateLogin(onLogin));

  async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.email || !data.password) {
      return window.alert('All fields are required!');
      // return showError('All fields are required!')
    }

    await login(data.email, data.password);
    ctx.page.redirect('/')
  }
}


const templateRegister = (onRegister) => html`

`

export function registerView(ctx) {

  ctx.render(templateRegister(onRegister));

  async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.email || !data.password) {
      return window.alert('All fields are required!');
      // return showError('All fields are required!')

    } else if (data.password !== data['re-password']) {
      return window.alert("Passwords don't match");
      // showError("Passwords don't match")
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
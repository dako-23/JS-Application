import { html } from "https://unpkg.com/lit-html";

export const templateOption = (data) => data.map(e => html`
    <option value="${e._id}">${e.text}</option>
`)

export const templateForm = (postInfo) => html`
<form @submit=${postInfo}>
    <label for="itemText">
                Text:
    </label>
    <input name="text" type="text" id="itemText" />
    <input type="submit" value="Add">
</form>
`
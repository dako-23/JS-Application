import { html } from "../../lib/lit-html.js";

const template = (hasUser) => html`
<section id="home">
        <div id="home-wrapper">
          <p id="home-intro">
            Whether you're a seasoned artist, a collector of ink, or someone
            looking for inspiration for their first tattoo,
            <span>Tattoo Masters</span> is your community. Share your
            masterpieces, discover incredible designs, and connect with
            artists and aficionados from around the world.
          </p>
          ${!hasUser ? html`<a href="/register" id='join-us'>Join Us!</a>` : ''}
        </div>
</section>
`

export function homeView(ctx) {
    const userData = ctx.userData;

    ctx.render(template(userData));
}

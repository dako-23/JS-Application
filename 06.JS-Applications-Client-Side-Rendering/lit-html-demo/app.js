import { html, render } from './node_modules/lit-html/lit-html.js'

const rootElement = document.getElementById('root');

const currentClass = 'active';
const canCount = true;
let counter = 0;
let names = ['Pesho', 'Gosho', 'Stamat', 'Mariyka'];

const countClickHandler = () => {
    counter++;

    render(helloTemplate('Lit-Html'), rootElement);
}

const nameClickHandler = (name) => {
    names = names.filter(n => n !== name);
    
    render(helloTemplate('Lit-Html'), rootElement);
};

const helloTemplate = (text) => html`
    <header> 
        <h1>Hello <em>${text}!</em></h1>
        <nav>
            <ul class="navigation">
                <li class=${currentClass}>Home</li>
                <li>About</li>
                <li>Pricing</li>
                <li>Contacts</li>
            </ul>
        </nav>
    </header>
    <main>
        ${counter === 0
            ? html`You can start counting!`
            : html`<p>Current count ${counter}</p>`
        }

        <button ?disabled=${!canCount} @click=${countClickHandler}>Count</button>

        <ul>
            ${names.map(name => html`<li @click=${() => nameClickHandler(name)}>${name}</li>`)}
        </ul>
    </main>
    <footer>
        <div>All rights  reserved &copy;</div>
    </footer>
`;

render(helloTemplate('Lit-Html'), rootElement);

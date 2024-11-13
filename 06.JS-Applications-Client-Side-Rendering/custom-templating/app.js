import { engine, render } from "./engine.js";

const rootElement = document.getElementById('root');

const headingHtml = `
    <h1>{{title}}</h1>
    <h2>{{subTitle}}</h2>
    <p>{{quote}}</p>
`;

const template = engine(headingHtml);
const result = template({ title: 'Hello CSR', subTitle: 'Custom Templating', quote: 'To be or not to be?' })

render(result, rootElement);

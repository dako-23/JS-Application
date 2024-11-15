import exportData from "./api/init.js";
import { render } from "https://unpkg.com/lit-html";
import { templateOption, templateForm } from "./views/templates.js";
import { postInfo } from "./views/events.js";

const optionListEl = document.querySelector('#menu')
const articleEl = document.querySelector('#pull')

export const loadOptions = () => {
    exportData.getData()
        .then(data => render(templateOption(data), optionListEl));
};

loadOptions()
render(templateForm(postInfo), articleEl);








// TODO: make this engine to work recursivelly

export const engine = (html) => {
    const matches = html.matchAll(/<([a-z1-9]+)>(.*)<\/\1>/gm);
    const elements = [];

    for (const match of matches) {
        const tagName = match[1];
        let textContent = match[2];

        const element = document.createElement(tagName);


        element.textContent = textContent;
        elements.push(element);
    }

    const template = (data) => {
        for (const element of elements) {
            Object.keys(data).forEach(prop => {
                element.textContent = element.textContent.replaceAll(`{{${prop}}}`, data[prop]);
            });
        }

        return elements;
    }

    return template;
}

export const render = (elements, container) => {
    container.append(...elements);
}

function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const personEl = document.querySelector('#person');
    const phoneEl = document.querySelector('#phone');
    const createBtn = document.querySelector('#btnCreate');
    const loadBtn = document.querySelector('#btnLoad');
    const phonebookEl = document.querySelector('#phonebook');


    createBtn.addEventListener('click', createContact)
    loadBtn.addEventListener('click', previewPhonebook)

    async function createContact() {
        if (personEl == '' || phoneEl == '') return
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                person: personEl.value,
                phone: phoneEl.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()

        console.log(data);

        personEl.value = ''
        phoneEl.value = ''

    }

    async function previewPhonebook() {

        const res = await fetch(url)
        const data = await res.json()

        phonebookEl.textContent = '';

        Object.values(data).forEach(({ person, phone, _id }) => {

            const li = createEl('li', `${person}: ${phone}`, phonebookEl, _id)

            const deleteBtn = createEl('button', 'Delete', li);
            deleteBtn.addEventListener('click', deleteRequest)

        })

    }

    async function deleteRequest(e) {
        const id = e.target.parentNode.id
        e.target.parentNode.remove();

        await fetch(`${url}/${id}`, { method: 'DELETE' })


    }

    function createEl(type, text, appender, id) {

        const result = document.createElement(type);
        result.textContent = text;
        result.setAttribute('id', id)
        appender.appendChild(result);

        return result;

    }

}


attachEvents();
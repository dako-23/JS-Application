document.addEventListener('DOMContentLoaded', () => {


    document.querySelector('#loadBooks').addEventListener('click', loadBook)
    const tbodyEl = document.querySelector('tbody');
    const titleEl = document.querySelector('h3')
    const formEl = document.querySelector('form');
    // console.log(titleEl);


    const url = 'http://localhost:3030/jsonstore/collections/books'


    async function loadBook() {

        const res = await fetch(url);
        const data = await res.json();

        tbodyEl.innerHTML = '';

        Object.entries(data).forEach(([id, info]) => {

            const row = document.createElement('tr');

            const titleData = document.createElement('td');
            titleData.textContent = info.title;

            const authorData = document.createElement('td');
            authorData.textContent = info.author;

            const actionData = document.createElement('td');

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.id = id;
            editBtn.addEventListener('click', editInfo);

            const deleteBtn = document.createElement('button');
            deleteBtn.id = id;
            deleteBtn.textContent = 'Delete';
            // deleteBtn.addEventListener('click', deleteInfo);

            actionData.appendChild(editBtn)
            actionData.appendChild(deleteBtn)

            row.appendChild(titleData)
            row.appendChild(authorData)
            row.appendChild(actionData)

            tbodyEl.appendChild(row)


        })

    }

    async function editInfo(e) {

        titleEl.textContent = 'Edit FORM';

        const row = e.currentTarget.parentNode.parentNode

        const title = row.children[0].textContent;

        const author = row.children[1].textContent;
        const id = e.target.id

        formEl.querySelector('input[name="title"]').value = title;
        formEl.querySelector('input[name="author"]').value = author;
        formEl.querySelector('button').textContent = 'Save'

        formEl.addEventListener('submit', async (ev) => {
            ev.preventDefault()

            const updatedTitle = formEl.querySelector('input[name="title"]').value
            const updatedAuthor = formEl.querySelector('input[name="author"]').value

            const res = await fetch(`${url}/${id}`, {
                method: 'Put',
                body: JSON.stringify({
                    title: updatedTitle,
                    author: updatedAuthor
                }),
                headers: { 'Content-Type': 'aplication/json' }
            })
            loadBook();
            titleEl.textContent = 'FORM';
            formEl.querySelector('button').textContent = 'Submit'
            formEl.reset();

        })
    }
})
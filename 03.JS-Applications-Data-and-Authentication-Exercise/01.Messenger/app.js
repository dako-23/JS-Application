function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const textAreaEl = document.querySelector('#messages');
    const sendBtn = document.querySelector('#submit');
    const refreshBtn = document.querySelector('#refresh');
    const nameAreaEl = document.querySelector('input[name="author"]');
    const messageAreaEl = document.querySelector('input[name="content"]');

    sendBtn.addEventListener('click', postInfo)
    refreshBtn.addEventListener('click', previewNewData)

    async function postInfo() {
        if (nameAreaEl.value == '' || messageAreaEl.value == '') return
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                author: nameAreaEl.value,
                content: messageAreaEl.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()

        console.log(data);

        nameAreaEl.value = ''
        messageAreaEl.value = ''

    }

    async function previewNewData() {

        const res = await fetch(url)
        const data = await res.json()

        console.log(data);

        textAreaEl.value = Object.values(data).map(({ author, content }) => `${author}: ${content}`).join('\n')

        textAreaEl.textContent = '';
    }
}

attachEvents();
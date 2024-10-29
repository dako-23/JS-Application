function solution() {

    const mainEl = document.querySelector('#main');

    const urlTitle = `http://localhost:3030/jsonstore/advanced/articles/list`

    function createPreview() {

        fetch(urlTitle)
            .then(resp => resp.json())
            .then(res => {

                res.forEach(el => {
                    const divAcc = document.createElement('div');
                    divAcc.className = 'accordion';

                    const divHead = document.createElement('div');
                    divHead.className = 'head';

                    const span = document.createElement('span');
                    span.textContent = el.title;

                    const moreBtn = document.createElement('button');
                    moreBtn.className = 'button'
                    moreBtn.id = el._id;
                    moreBtn.textContent = 'More'

                    const divExtra = document.createElement('div');
                    divExtra.className = 'extra'

                    const p = document.createElement('p');

                    divHead.appendChild(span);
                    divHead.appendChild(moreBtn);
                    divAcc.appendChild(divHead);
                    mainEl.appendChild(divAcc);
                    divExtra.appendChild(p);
                    divAcc.appendChild(divExtra);

                    moreBtn.addEventListener('click', toggle)
                })

            })
            .catch(err => console.log(err));

    }

    function toggle(e) {

        const accordion = e.target.parentNode.parentNode;
        const p = accordion.querySelector('.extra p');
        const extra = accordion.querySelector('.extra')

        const id = e.target.id;

        const urlInfo = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`

        fetch(urlInfo)
            .then(resp => resp.json())
            .then(res => {
                p.textContent = res.content
            })
            .catch(err => console.log(err));

        const hidden = e.target.textContent === 'More';

        extra.style.display = hidden ? 'block' : 'none';
        e.target.textContent = hidden ? 'Less' : 'More'

    }
    createPreview()
}
window.addEventListener('load', solution);


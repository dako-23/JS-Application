function solution() {

    const mainEl = document.querySelector('#main');

    const urlTitle = `http://localhost:3030/jsonstore/advanced/articles/list`

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

                divHead.appendChild(span);
                divHead.appendChild(moreBtn);
                divAcc.appendChild(divHead);
                mainEl.appendChild(divAcc);

                const urlInfo = `http://localhost:3030/jsonstore/advanced/articles/details/${el._id}`
                fetch(urlInfo)
                    .then(resp => resp.json())
                    .then(res => {

                        const divExtra = document.createElement('div');
                        divExtra.className = 'extra'

                        const p = document.createElement('p');
                        p.textContent = res.content

                        divExtra.appendChild(p);
                        divAcc.appendChild(divExtra);

                    })

                moreBtn.addEventListener('click', (e) => {

                    const toggle = e.target.parentNode.parentNode;
                    const extra = toggle.querySelector('.extra')

                    const hidden = e.target.textContent === 'More';

                    extra.style.display = hidden ? 'block' : 'none';
                    e.target.textContent = hidden ? 'Less' : 'More'

                })
            })

        })
        .catch(err => console.log(err));
}
window.addEventListener('load', solution);
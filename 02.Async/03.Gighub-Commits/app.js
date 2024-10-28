function loadCommits() {

    const userNameEl = document.querySelector('#username').value;
    const repoEl = document.querySelector('#repo').value;
    const commitEl = document.querySelector('#commits');

    const url = `https://api.github.com/repos/${userNameEl}/${repoEl}/commits`;

    fetch(url)
        .then(res => {

            if (!res.ok) {
                throw new Error(`Eror: ${res.status} (Not Found)`);
            }

            return res.json()
        })
        .then(repos => {
            commitEl.innerHTML = '';

            repos.forEach(repo => {
                const li = document.createElement('li');
                li.textContent = `${repo.commit.author.name}: ${repo.commit.message}`

                commitEl.appendChild(li)
            });
        })
        .catch(err => {
            commitEl.innerHTML = '';
            const errLi = document.createElement('li');
            errLi.textContent = err.message
            commitEl.appendChild(errLi)

        });



}
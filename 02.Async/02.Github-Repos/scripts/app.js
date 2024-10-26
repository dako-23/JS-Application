function loadRepos() {

	// const reposUlEl = document.querySelector('#')
	const inputEl = document.querySelector('#username').value
	const ul = document.querySelector('#repos');

	const url = `https://api.github.com/users/${inputEl}/repos`;


	// <li><a href="{repo.html_url}">{repo.full_name}</a><li>

	fetch(url)
		.then(res => res.json())
		.then(repos => {
			ul.innerHTML = '';

			repos.forEach(repo => {
				const li = document.createElement('li');
				const a = document.createElement('a')
				a.href = repo.html_url
				a.textContent = repo.full_name

				li.appendChild(a);
				ul.appendChild(li);
			});
		})
		.catch(err => console.log(err));

}
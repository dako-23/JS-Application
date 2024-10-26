function loadRepos() {
   let url = 'https://api.github.com/users/testnakov/repos';

   fetch(url)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(err => console.log(err));

}
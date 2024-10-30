const baseUrl = 'http://localhost:3030/data/recipes';
const mainElement = document.querySelector('body > main');

function initNavigation() {
    const email = localStorage.getItem('email');

    if (email && email !== 'undefined') {
        const userNavigation = document.getElementById('user');
        userNavigation.style.display = 'block';
    } else {
        const guestNavigation = document.getElementById('guest');
        guestNavigation.style.display = 'block';
    }
}

function loadRecipes() {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            mainElement.innerHTML = '';

            const recipes = Object.values(data);

            mainElement.append(...recipes.map(renderArticle));
        })
        .catch(err => alert(err.message));
}

function renderArticle(article) {
    console.log(article);

    const h2Element = document.createElement('h2');
    h2Element.textContent = article.name;

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.appendChild(h2Element);

    const imgElement = document.createElement('img');
    imgElement.src = article.img;

    const smallDiv = document.createElement('div');
    smallDiv.classList.add('small');
    smallDiv.appendChild(imgElement);

    const articleElement = document.createElement('article');
    articleElement.classList.add('preview');
    articleElement.appendChild(titleDiv);
    articleElement.appendChild(smallDiv);

    articleElement.addEventListener('click', async () => {
        const response = await fetch(`${baseUrl}/${article._id}`);
        const articleDetails = await response.json();

        const articleDetailsElement = renderDetailedArticle(articleDetails);
        mainElement.innerHTML = '';
        mainElement.appendChild(articleDetailsElement);
    });

    return articleElement;
}

// DONT DO THIS AT HOME! XSS WARNINGS!!!! DONT HAVE TIME FOR WORKSHOP
function renderDetailedArticle(article) {
    const articleElement = document.createElement('article');

    articleElement.innerHTML = `
        <h2>${article.name}</h2>
        <div class="band">
            <div class="thumb">
                <img src="${article.img}">
            </div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${article.ingredients.map(i => `<li>${i}</li>`).join('\n')}
                </ul>
            </div>
        </div>
        <div class="description">
            <h3>Preparation:</h3>
            ${article.steps.map(step => `<p>${step}</p>`).join('\n')}
        </div>
    `;

    return articleElement;
}

loadRecipes();
initNavigation()

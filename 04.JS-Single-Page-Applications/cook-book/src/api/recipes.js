const baseUrl = 'http://localhost:3030/data/recipes';

const recipes = {
    getAll() {
        return fetch(baseUrl)
            .then(res => res.json())
            .then(data => Object.values(data));
    }
}

export default recipes;
const baseUrl = 'http://localhost:3030/data/recipes';

const recipes = {
    getAll() {
        return fetch(baseUrl)
            .then(res => res.json())
            .then(data => Object.values(data));
    },
    getRecent() {
        // const query = new URLSearchParams({
        //     sortBy: '_createdOn desc',
        //     pageSize: 3,
        // });

        const query = encodeURIComponent('_createdOn desc');

        return fetch(`${baseUrl}?sortBy=${query}&pageSize=3`)
            .then(res => res.json())
            .then(data => Object.values(data));
    }
}

export default recipes;

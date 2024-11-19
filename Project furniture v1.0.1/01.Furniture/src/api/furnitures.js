const baseUrl = 'http://localhost:3030/data/catalog';

const furnitures = {
    getAll() {
        return fetch(baseUrl)
            .then(res => res.json())
            .then(data => Object.values(data));
    },
    getOne(id) {
        return fetch(`${baseUrl}/${id}`)
            .then(res => res.json());
    }
}

export default furnitures

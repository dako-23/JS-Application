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
    },
    update(id, data) {
        const token = localStorage.getItem('accessToken');

        return fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
    },
    create(data) {
        const token = localStorage.getItem('accessToken');

        return fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
    },
    delete(id) {
        const token = localStorage.getItem('accessToken');

        return fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'X-Authorization': token,
            }
        });
    }
}

export default furnitures

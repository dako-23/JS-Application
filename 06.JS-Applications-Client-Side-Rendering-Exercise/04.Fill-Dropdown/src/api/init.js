const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

const exportData = {
    getData() {
        return fetch(url)
            .then(res => res.json())
            .then(data => Object.values(data));
    },
    postData(data) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

}

export default exportData;
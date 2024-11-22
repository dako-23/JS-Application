const baseUrl = 'http://localhost:3030/users';

const auth = {
    login(email, password) {
        return fetch(`${baseUrl}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.code >= 400) {
                    throw new Error('Something went wrong');
                }
                return data;
            })
    },

    register(email, password) {
        return fetch(`${baseUrl}/register`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                return data;
            });
    },
    logout() {
        const token = localStorage.getItem('accessToken');

        return fetch(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': token,
            }
        });
    }
}

export default auth;

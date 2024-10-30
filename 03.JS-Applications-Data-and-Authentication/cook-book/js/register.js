const registerForm = document.querySelector('main article form');
const baseUrl = 'http://localhost:3030/users';


registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    fetch(`${baseUrl}/register`, {
        method: 'POST',
        body: JSON.stringify( {
            email: formData.get('email'),
            password: formData.get('password')
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('email', data.email);

            location.href = '/';
        });
})

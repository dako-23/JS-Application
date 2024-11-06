const baseUrl = 'http://localhost:3030/users';

const sectionElement = document.getElementById('login-section');
const loginForm = sectionElement.querySelector('form');

export default function loginPage() {
    sectionElement.style.display = 'block';
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

    fetch(`${baseUrl}/login`, {
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
                return alert(data.message);
            }

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('email', data.email);
            localStorage.setItem('_id', data._id);

            location.href = '/';
        })
        .catch(err => alert(err.message));
});


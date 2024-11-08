import auth from "../api/auth.js";

const sectionElement = document.getElementById('login-section');
const loginForm = sectionElement.querySelector('form');

export default function loginPage() {
    sectionElement.style.display = 'block';
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

    auth.login(email, password)
        .catch(err => alert(err.message));
});


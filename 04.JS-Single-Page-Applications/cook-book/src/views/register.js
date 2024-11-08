import auth from "../api/auth.js";

const sectionElement = document.getElementById('register-section');
const registerForm = sectionElement.querySelector('form');

export default function registerPage() {
    sectionElement.style.display = 'block';
}

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    auth.register(formData.get('email'), formData.get('password'))


        .catch(err => alert(err.message));
})

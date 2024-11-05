const registerForm = document.querySelector('#register')
const urlReg = 'http://localhost:3030/users/register'

registerForm.addEventListener('submit', createAcc);

async function createAcc(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await fetch(urlReg, {
        method: 'POST',
        body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = res.json();

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('email', data.email);

    location.href = '/';

}
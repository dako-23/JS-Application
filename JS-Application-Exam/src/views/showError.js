export function showError(message) {

    const errorBox = document.querySelector('#errorBox');
    const span = document.createElement('span');

    errorBox.innerHTML = '';

    span.textContent = message;

    errorBox.appendChild(span)
    errorBox.style.display = 'block';

    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 3000);
}
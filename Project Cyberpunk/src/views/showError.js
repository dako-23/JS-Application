export function showError(message) {

    const errorBox = document.querySelector('#errorBox');
    
    errorBox.textContent = message;
    errorBox.style.display = 'block';

    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 3000);
}
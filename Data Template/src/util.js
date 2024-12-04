export function saveUserData(data) {
    const userData = {
        email: data.email,
        id: data._id,
        accessToken: data.accessToken
    }

    localStorage.setItem('userData', JSON.stringify(userData));
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
}

export function clearUserData() {
    localStorage.removeItem('userData');
}
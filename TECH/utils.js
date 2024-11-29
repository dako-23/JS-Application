export function saveUserData(data) {
    const userData = {
        email: data.email,
        id: data._id,
        accessToken: data.accessToken
    }

    sessionStorage.setItem('userData', JSON.stringify(userData));
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function clearUserData() {
    sessionStorage.removeItem('userData');
}
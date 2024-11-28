import { clearUserData, saveUserData } from '../utils.js';
import { get, post } from './api.js';
import page from "//unpkg.com/page/page.mjs";


const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
};

export async function login(email, password) {
    const result = await post(endpoints.login, { email, password });

    saveUserData(result);
}

export async function register(email, username, password) {
    const result = await post(endpoints.register, { email, username, password });

    saveUserData(result);
}

export async function logout() {
    get(endpoints.logout);
    clearUserData();
    page.redirect('/');
}
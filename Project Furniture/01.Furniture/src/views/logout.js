import { renderNavigation } from "./navigation.js";
import page from "//unpkg.com/page/page.mjs";

const baseUrl = 'http://localhost:3030/users/logout';

export default function logoutPage() {
    const token = localStorage.getItem('accessToken');

    fetch(baseUrl, {
        headers: {
            'X-Authorization': token,
        }
    })
        .then(() => {
            localStorage.clear();  // Clear local session
            page.redirect('/');
            // renderNavigation(); not needed
        })
}

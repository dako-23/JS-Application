import { getUserData } from "../utils.js";

const hostname = 'http://localhost:3030';

export async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    const userData = getUserData();

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const response = await fetch(hostname + url, options);

    if (!response.ok) {
        const data = await response.json();

        const error = new Error(data.message);
        setTimeout(handleError, 10, error);

        throw error
    }

    if (response.status == 204) {
        return response;
    }

    const result = await response.json();
    return result;
}

export const get = (url) => request('get', url);
export const post = (url, data) => request('post', url, data);
export const put = (url, data) => request('put', url, data);
export const del = (url) => request('delete', url);

function handleError(err) {
    if (!err.handled) {
        alert('Request error:\n' + err.message);
    }
}

export async function getLikesCount(solutionId) {
    return await get(`/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`);
}

export async function hasUserLiked(solutionId, userId) {
    const result = await get(`/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return result > 0; 
}



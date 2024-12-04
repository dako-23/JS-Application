import { post } from "../data/api.js";

export default async function onLike(productId) {
    
    await post(`/data/likes`, { tattooId: productId });

    const likeSpan = document.querySelector('#like');
    likeSpan.textContent = parseInt(likeSpan.textContent) + 1;

    const likeButton = document.querySelector('#like-btn');
    if (likeButton) {
        likeButton.remove()
    }
}
import page from "//unpkg.com/page/page.mjs";

import furnitures from "../api/furnitures.js";

export default function deletePage(ctx) {
    furnitures.delete(ctx.params.furnitureId)
        .then(() => {
            // ctx.showNotification('Successfully deleted recipe!');
            page.redirect('/catalog');
        });
}

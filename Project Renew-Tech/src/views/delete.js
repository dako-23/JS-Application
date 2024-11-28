import page from "//unpkg.com/page/page.mjs";
import { del } from "../data/api.js";

export default async function deletePage(ctx) {

    const { productId } = ctx.params

    await del(`/data/solutions/${productId}`)
    ctx.page.redirect('/dashboard');



    // ctx.showNotification('Successfully deleted recipe!');

}

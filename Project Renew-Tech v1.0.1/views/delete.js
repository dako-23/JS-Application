import { del } from "../data/api.js";

export default async function deleteProduct(ctx) {

    const isConfirmed = confirm('siguren li si brat')
    if (isConfirmed) {
        const { productId } = ctx.params

        await del(`/data/solutions/${productId}`)
        ctx.page.redirect('/dashboard');
    }
}

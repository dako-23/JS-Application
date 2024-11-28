import { logout } from "../data/users.js";

export default async function logoutPage(ctx) {
    await logout()
        .finally(ctx.logout)
}
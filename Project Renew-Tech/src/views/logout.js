import { logout } from "../data/users.js";

export default function logoutPage(ctx) {
    logout()
        .finally(ctx.logout)
}
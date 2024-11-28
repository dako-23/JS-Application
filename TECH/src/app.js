import page from "../lib/page.js";
import { addSession } from "../middlewares/session.js";
import { addRender } from "../middlewares/render.js";
import { naviView } from "../views/navigationView.js";
import { homeView } from "../views/homeView.js";
import { registerView } from "../views/registerView.js";
import { createView } from "../views/createView.js";
import { dashboardView } from "../views/dashboardView.js";
import { detailsView } from "../views/detailsView.js";
import { editView } from "../views/editView.js";
import loginPage from "../views/loginView.js";
import logoutPage from "../views/logout.js";
import deleteProduct from "../views/delete.js";

page(addSession());
page(addRender(document.querySelector('main')));
page(naviView);

page('/', homeView)
page('/dashboard', dashboardView)
page('/dashboard/details/:productId', detailsView)
page('/register', registerView);
page('/login', loginPage)
page('/logout', logoutPage)
page('/create', createView)
page('/edit/:productId', editView)
page('/delete/:productId', deleteProduct)

page();

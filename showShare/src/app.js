import page from "../lib/page.js";
import { addRender } from "./middlewares/render.js";
import { addSession } from "./middlewares/session.js";
import { naviView } from "./views/navigationView.js";
import { homeView } from "./views/homeView.js";
import { loginPage, registerView, logoutPage } from "./views/auth.js";
import { dashboardView } from "./views/dashboardView.js";
import { createView } from "./views/createView.js";
import { deleteProduct, detailsView } from "./views/detailsView.js";
import { editView } from "./views/edit.js";
import { searchView } from "./views/searchView.js";

page(addSession());
page(addRender(document.querySelector('#main')));
page(naviView);

page('/', homeView);
page('/login', loginPage);
page('/register', registerView);
page('/logout', logoutPage);
page('/dashboard', dashboardView);
page('/create', createView);
page('/dashboard/:itemId/details', detailsView);
page('/dashboard/:itemId/edit', editView);
page('/dashboard/:itemId/delete', deleteProduct);
page('/search', searchView)


page();
import page from "//unpkg.com/page/page.mjs";
import { addSession } from "./middlewares/session.js";
import { addRender } from "./middlewares/render.js";
import { naviView } from "./views/navigation.js";
import { homeView } from "./views/home.js";
import { registerView } from "./views/register.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import loginPage from "./views/login.js";
import logoutPage from "./views/logout.js";
import dashboardView from "./views/dashboard.js";
import deletePage from "./views/delete.js";

page(addSession());
page(addRender(document.querySelector('main')));
page(naviView);

page('/', homeView)
page('/dashboard', dashboardView);
page('/register', registerView);
page('/login', loginPage);
page('/logout', logoutPage);
page('/create', createView)
page('/dashboard/details/:productId', detailsView);
page('/delete/:productId', deletePage);
page('/edit/:productId', editView)

page();



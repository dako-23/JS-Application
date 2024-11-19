import page from "//unpkg.com/page/page.mjs";

import homePage from "./views/home.js";
import loginPage from "./views/login.js";
import registerPage from "./views/register.js";
import logoutPage from "./views/logout.js";
import createPage from "./views/create.js";
import { renderNavigation } from "./views/navigation.js";

page(renderNavigation)

page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutPage);
page('/create', createPage);


page();
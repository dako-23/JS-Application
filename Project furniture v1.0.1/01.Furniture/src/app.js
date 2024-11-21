import page from "//unpkg.com/page/page.mjs";

import catalogPage from "./views/catalog.js";
import loginPage from "./views/login.js";
import registerPage from "./views/register.js";
import logoutPage from "./views/logout.js";
import createPage from "./views/create.js";
import detailsPage from "./views/details.js";
import editPage from "./views/edit.js";
import deletePage from "./views/delete.js";
import { renderNavigation } from "./views/navigation.js";
import homePage from "./views/home.js";
import { auth } from "./middlewares/authMiddlewares.js";


page(auth)
page(renderNavigation)

page('/', homePage)
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutPage);
page('/create', createPage);
page('/catalog/:furnitureId', detailsPage);
page('/catalog/:furnitureId/edit', editPage);
page('/catalog/:furnitureId/delete', deletePage)


// page('/my-furniture', myFurniture);

page();
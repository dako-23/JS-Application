import page from "//unpkg.com/page/page.mjs";

import homePage from "./views/home.js";
import createPage from "./views/create.js";
import catalogPage from "./views/catalog.js";
import loginPage from "./views/login.js";
import logoutPage from "./views/logout.js";
import registerPage from "./views/register.js";
import { renderNavigation } from "./views/navigation.js";
import detailsPage from "./views/details.js";
import { auth } from "./middlewares/authMiddlewares.js";
import editPage from "./views/edit.js";
import deletePage from "./views/delete.js";


page(auth)
page(renderNavigation)

page('/', homePage)
page('/catalog', catalogPage);
page('/catalog/:furnitureId', detailsPage);
page('/catalog/:furnitureId/edit', editPage);
page('/catalog/:furnitureId/delete', deletePage)
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/logout', logoutPage);



// page('/my-furniture', myFurniture);

page();
import {test as base} from '@playwright/test';
import {App} from '../pages/app.page';
import { UserBuilder,PostBuilder } from '../builders/index';

export const test = base.extend({

    app: async ({page},use) => {
        
        const app = new App(page);
        await use (app);
    },
    registredUser : 
     async ({page}, use) => {
        const app = new App(page);
        const user = new UserBuilder().withName().withEmail().withPassword().build();
        await page.goto('/');
        await app.mainPage.gotoRegister();
        await app.registerPage.register(user);
        await use ({app, user});
     },
})
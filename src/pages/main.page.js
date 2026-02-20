export class MainPage {
    constructor(page){ 
        //техническое описание страницы
        this.signupLink = page.getByRole('link',{name: 'Sign up'});
        this.loginLink = page.getByRole('link',{name: 'Login'});
        this.profileLink = page.getByRole('link', { name: 'Profile' });
        this.profileSettings = page.getByRole('link', { name: 'Settings' });
        this.profileLogout = page.getByRole('link', { name: 'Logout' });
        this.createPost = page.getByRole('link', { name: 'New Article' });
        this.globalLink =  page.getByRole('button', { name: 'Global Feed' });
        this.firstPost =  page.getByRole('link').filter({ hasText: /./ }).first();
        this.toggleProfile = page.getByRole('button', { name: /profile|settings/i}).or(page.locator('[aria-haspopup="true"]'));
        this.sourceCode = page.getByRole('navigation').getByRole('link', { name: ' Source code' });
        this.userName = page.getByRole('navigation');
    }
    //Бизнесовые действия со страницей
    async gotoRegister(){
        await this.signupLink.click();
    }
    async gotoLogin(){
        await this.loginLink.click();
    }
    async gotoProfile(){
        await this.toggleProfile.click();
        await this.profileLink.click();
    }
    async gotoProfileSettings(){
        await this.toggleProfile.click();
        await this.profileSettings.click();
    }
    async gotoProfileLogout (){
        await this.toggleProfile.click();
        await this.profileLogout.click();
    }
    async gotoCreatePost (){
        await this.createPost.click();
    }
    async gotoGlobalPosts(){
        await this.globalLink.click();
    }
    async gotoFirstPost (){
        await this.firstPost.click();
    }
    async gotoSourceCode(){
        await this.sourceCode.click();
    }
}
import { MainPage, RegisterPage, ProfilePage, EditorPage, ArticlePage} from "./index.js"

export class App {
    constructor(page) {
        this.page = page;
        this.mainPage = new MainPage(page);
        this.registerPage = new RegisterPage(page);
        this.profilePage = new ProfilePage(page);
        this.editorPage = new EditorPage(page);
        this.articlePage = new ArticlePage(page);
}
}
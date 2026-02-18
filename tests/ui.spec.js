import { test, expect } from "@playwright/test";
import { UserBuilder,PostBuilder } from '../src/builders/index';
import { App } from '../src/pages/app.page';

test.describe('Тесты под авторизованным пользователем',() => {
    test.beforeEach(async({page}) => {
        await page.goto('/');
        
        const app = new App(page);

        await app.mainPage.gotoLogin();
        await app.registerPage.login();
    });

    test ('Создание статьи авторизованным пользователем', async({
        page,
    }) => {
        const post = new PostBuilder().withTitle().withDescription().withText().withTags().build();

        const app = new App(page);

        await app.mainPage.gotoCreatePost();
        await app.editorPage.createPost(post);
        await expect(app.editorPage.titlePost).toContainText(post.title);
        await expect(app.editorPage.checktextPost).toContainText(post.text);
    });

    test ('Добавление комментария на первую статью', async({
        page,
    }) => {
        const post = new PostBuilder().withComment().build();
        
        const mainPage = new MainPage(page);
        const articlePage = new ArticlePage(page);

        await app.mainPage.gotoGlobalPosts();
        await app.mainPage.gotoFirstPost();
        await app.articlePage.createComment(post.comment);
        await expect(app.articlePage.commentTxt).toContainText(post.comment);
    });

    test ('Редактирование собственной статьи', async({
        page,
    }) => {
        const post = new PostBuilder().withTitle().withDescription().withText().withTags().build();
        
        const mainPage = new MainPage(page);
        const editorPage = new EditorPage(page);
        const articlePage = new ArticlePage(page);

        await app.mainPage.gotoProfile();
        await app.mainPage.gotoFirstPost();
        await app.articlePage.editPostBut();
        await app.editorPage.editPost(post);
        await expect(app.editorPage.checkTitle).toContainText(post.title);
        await expect(app.editorPage.checktextPost).toContainText(post.text);
    });

    test('Удаление собственной статьи', async({
        page,
    }) => {

        const mainPage = new MainPage(page);
        const articlePage = new ArticlePage(page);

        await app.mainPage.gotoProfile();
        await app.mainPage.gotoFirstPost();
        await app.articlePage.deletePost();
        await expect(page).toHaveURL('/');
    });

});
test ('Регистрация нового пользователя и редактирование информации пользователя через настройки профиля', async({
        page,
    }) => {
        const user = new UserBuilder().withName().withEmail().withPassword().build();

        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        // Регистрация нового пользователя
        await page.goto('/');
        await app.mainPage.gotoRegister();
        await app.registerPage.register(user);
        // Переход к пользовательским настройкм
        await app.mainPage.gotoProfile();
        await app.mainPage.gotoProfileSettings();
        // Генерим данные для изменения
        const userEdit = new UserBuilder().withPhoto().withName().withBio().withPassword().build();
        // Редактирование пользовательской информации
        await app.registerPage.updateProfile(userEdit);
        await expect(app.mainPage.userName).toContainText(userEdit.name);
    });

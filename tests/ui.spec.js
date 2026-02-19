import { expect } from "@playwright/test";
import { test } from '../src/fixtures/fixture';
import { UserBuilder,PostBuilder } from '../src/builders/index';


test.describe('Тесты под авторизованным пользователем',() => {
    test.beforeEach(async({page,app}) => {
        await page.goto('/');
        
        await app.mainPage.gotoLogin();
        await app.registerPage.login();
    });

    test ('Создание статьи авторизованным пользователем', async({
        app,
    }) => {
        const post = new PostBuilder().withTitle().withDescription().withText().withTags().build();

        await app.mainPage.gotoCreatePost();
        await app.editorPage.createPost(post);
        await expect(app.editorPage.titlePost).toContainText(post.title);
        await expect(app.editorPage.checktextPost).toContainText(post.text);
    });

    test ('Добавление комментария на первую статью', async({
        app,
    }) => {
        const post = new PostBuilder().withComment().build();

        await app.mainPage.gotoGlobalPosts();
        await app.mainPage.gotoFirstPost();
        await app.articlePage.createComment(post.comment);
        await expect(app.articlePage.commentTxt).toContainText(post.comment);
    });

    test ('Редактирование собственной статьи', async({
        app,
    }) => {
        const post = new PostBuilder().withTitle().withDescription().withText().withTags().build();
 
        await app.mainPage.gotoProfile();
        await app.mainPage.gotoFirstPost();
        await app.articlePage.editPostBut();
        await app.editorPage.editPost(post);
        await expect(app.editorPage.checkTitle).toContainText(post.title);
        await expect(app.editorPage.checktextPost).toContainText(post.text);
    });

    test('Удаление собственной статьи', async({
        app,page
    }) => {

        await app.mainPage.gotoProfile();
        await app.mainPage.gotoFirstPost();
        await app.articlePage.deletePost();
        await expect(page).toHaveURL('/');
    });

});
test ('Регистрация нового пользователя и редактирование информации пользователя через настройки профиля', async({
        registredUser
    }) => {
        const { app } = registredUser;
        const { user } = registredUser;
        // Переход к пользовательским настройкм
        await app.mainPage.gotoProfile();
        await app.mainPage.gotoProfileSettings();
        // Генерим данные для изменения
        const userEdit = new UserBuilder().withPhoto().withName().withBio().withPassword().build();
        // Редактирование пользовательской информации
        await app.registerPage.updateProfile(userEdit);
        await expect(app.mainPage.userName).toContainText(userEdit.name);
    });

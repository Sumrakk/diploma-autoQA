import { test } from '@playwright/test';
export class ArticlePage {
    constructor(page){ 
        //техническое описание страницы
        this.page = page;
        this.editButton = page.getByRole('button', { name: 'Edit Article' }).first();
        this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).first();
        this.textboxComment = page.getByRole('textbox', { name: 'Write a comment...' });
        this.commentButton = page.getByRole('button', { name: 'Post Comment' });
        this.commentTxt = page.getByRole('main');
    }
    //Бизнесовые действия со страницей
    async createComment(comment = 'NICE!'){
        return await test.step('Добавить комментарий', async () => {
            await this.textboxComment.click();
            await this.textboxComment.fill(comment);
            await this.commentButton.click();
        });
    }
    async editPostBut (){
        return await test.step('Клик на кнопку Edit', async () => {
            await this.editButton.click();
        });
    }
    async deletePost (){
        return await test.step('Удалить статью', async () => {
            this.page.on('dialog', dialog => {
            dialog.accept();
            });
            await this.deleteButton.click();
        });
    }
}
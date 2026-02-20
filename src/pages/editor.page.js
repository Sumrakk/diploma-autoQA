import { test } from '@playwright/test';
export class EditorPage {
    constructor(page){ 
        //техническое описание страницы
        this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.descriptionPost = page.getByRole('textbox', { name: "What's this article about?" });
        this.textPost = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
        this.tagsPost = page.getByRole('textbox', { name: 'Enter tags' });
        this.publishButton = page.getByRole('button', { name: 'Publish Article' });
        this.updateButton = page.getByRole('button', { name: 'Update Article' });
        this.titlePost = page.getByRole('heading');
        this.checktextPost = page.getByRole('paragraph');
        this.checkTitle = page.getByRole('heading');
    }
    //Бизнесовые действия со страницей
    async createPost(post){
        return await test.step('Создать статью', async () => {
            const {title,description,text,tags} = post;
            await this.articleTitle.click();
            await this.articleTitle.fill(title);
            await this.descriptionPost.click();
            await this.descriptionPost.fill(description);
            await this.textPost.click();
            await this.textPost.fill(text);
            await this.tagsPost.click();
            await this.tagsPost.fill(tags);
            await this.publishButton.click();
        });
    }
    async editPost (post){
        return await test.step('Отредактировать статью', async () => {
            const {title,description,text,tags} = post;
            await this.articleTitle.click();
            await this.articleTitle.fill(title);
            await this.descriptionPost.click();
            await this.descriptionPost.fill(description);
            await this.textPost.click();
            await this.textPost.fill(text);
            await this.tagsPost.click();
            await this.tagsPost.fill(tags);
            await this.updateButton.click(); 
        });
    }
}
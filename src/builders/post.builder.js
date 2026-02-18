import { faker } from '@faker-js/faker';

export class PostBuilder {
    withTitle (title){
        this.title = title ?? faker.word.words(2);
        return this;
    }

    withDescription(description) {
        this.description = description ?? faker.internet.emoji(); 
        return this;

    }
    withText (text) {
        this.text = text ?? faker.word.words(15);
        return this;

    }
    withTags (tags) {
        this.tags = tags ?? faker.word.words(1);
        return this;

    }
    withComment (comment) {
        this.comment = comment ?? faker.word.words(3);
        return this;

    }
    build()
    {
        const result = {...this};
        return result;
    }
}
import { faker } from '@faker-js/faker';

export class UserBuilder {
    withEmail (email){
        this.email = email ?? faker.internet.email();
        return this;
    }

    withName(name) {
        this.name = name ?? faker.person.fullName();
        return this;

    }
    withPassword (length=10) {
        this.password =  faker.internet.password({ length: length });
        return this;

    }
    withPhoto () {
        this.photoURL = faker.image.avatar();
        return this;
    }
    withBio (bio) {
        this.bio = bio ?? faker.word.words(15);
        return this;
    }
    build()
    {
        const result = {...this};
        return result;
    }
}
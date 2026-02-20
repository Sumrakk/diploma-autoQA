import { test } from '@playwright/test';
export class ProfilePage {
	constructor(page) {
        this.profilePicture = page.getByRole('textbox', { name: 'URL of profile picture' })
		this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.bioInput = page.getByRole('textbox', { name: 'Short bio about you'});
		this.emailInput = page.getByRole('textbox', { name: 'Email' });
		this.passwordInput = page.getByRole('textbox', { name: 'Password' });
		this.updateButton = page.getByRole('button', { name: 'Update Settings' });
		
	}
	async update(user) {
		return await test.step('Редактирование пользовательской информации', async () => {
			const { photoURL, name, bio } = user;
			await this.profilePicture.click();
			await this.profilePicture.fill(photoURL);
			await this.nameInput.click();
			await this.nameInput.fill(name);
			await this.bioInput.click();
			await this.bioInput.fill(bio);
			await this.updateButton.click();
		});
	}
}
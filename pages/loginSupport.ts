import type {Page, Locator} from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly userNameInput: Locator;
    private readonly userPassInput: Locator;
    private readonly loginBtn: Locator;
    private readonly SigninBtn: Locator;
    

        constructor(page: Page) {
            this.page = page;

            //Locator
            this.userNameInput = page.getByPlaceholder('Your email');
            this.userPassInput = page.getByPlaceholder('Your password');
            this.loginBtn = page.locator('[data-test="login-submit"]');
            this.SigninBtn = page.locator('[data-test="nav-sign-in"]');

        }

        async openLandingPage(): Promise<void> {
            await this.page.goto('/');
        }

        async openPageLogin(): Promise<void> {
            await this.page.goto('/');

            await this.SigninBtn.click();
        }

        async login(username: string, password: string): Promise<void> {
            await this.userNameInput.fill(username);
            await this.userPassInput.fill(password);
            await this.loginBtn.click();
        }

}
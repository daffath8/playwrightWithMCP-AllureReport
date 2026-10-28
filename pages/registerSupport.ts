import type {Page, Locator} from '@playwright/test';

export type RegisterData = {
    firstName: string;
    lastName: string;
    dob: string;
    country: string;
    postalCode: string;
    houseNumber: string;
    street: string;
    city: string;
    state: string;
    phone: string;
    email: string;
    password: string;
};

export class RegisterPage {
    private readonly page: Page;
    private readonly SigninBtn: Locator;
    private readonly registerLink: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly dobInput: Locator;
    private readonly countrySelect: Locator;
    private readonly postalCodeInput: Locator;
    private readonly houseNumberInput: Locator;
    private readonly streetInput: Locator;
    private readonly cityInput: Locator;
    private readonly stateInput: Locator;
    private readonly phoneInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly registerBtn: Locator;

        constructor(page: Page) {
            this.page = page;

            //Locator
            this.SigninBtn = page.locator('[data-test="nav-sign-in"]');
            this.registerLink = page.locator('[data-test="register-link"]');
            this.firstNameInput = page.locator('[data-test="first-name"]');
            this.lastNameInput = page.locator('[data-test="last-name"]');
            this.dobInput = page.locator('[data-test="dob"]');
            this.countrySelect = page.locator('[data-test="country"]');
            this.postalCodeInput = page.locator('[data-test="postal_code"]');
            this.houseNumberInput = page.locator('[data-test="house_number"]');
            this.streetInput = page.locator('[data-test="street"]');
            this.cityInput = page.locator('[data-test="city"]');
            this.stateInput = page.locator('[data-test="state"]');
            this.phoneInput = page.locator('[data-test="phone"]');
            this.emailInput = page.locator('[data-test="email"]');
            this.passwordInput = page.locator('[data-test="password"]');
            this.registerBtn = page.locator('[data-test="register-submit"]');
        }

        async openPageRegister(): Promise<void> {
            await this.page.goto('/');

            await this.SigninBtn.click();
            await this.registerLink.click();
        }

        async fillForm(data: RegisterData): Promise<void> {
            await this.firstNameInput.fill(data.firstName);
            await this.lastNameInput.fill(data.lastName);
            await this.dobInput.fill(data.dob);
            await this.countrySelect.selectOption({ label: data.country });
            await this.postalCodeInput.fill(data.postalCode);
            await this.houseNumberInput.fill(data.houseNumber);
            await this.streetInput.fill(data.street);
            await this.cityInput.fill(data.city);
            await this.stateInput.fill(data.state);
            await this.phoneInput.fill(data.phone);
            await this.emailInput.fill(data.email);
            await this.passwordInput.fill(data.password);
        }

        async submit(): Promise<void> {
            await this.registerBtn.click();
        }

        async register(data: RegisterData): Promise<void> {
            await this.fillForm(data);
            await this.submit();
        }

        errorMessage(field: string): Locator {
            return this.page.locator(`[data-test="${field}-error"]`);
        }

}

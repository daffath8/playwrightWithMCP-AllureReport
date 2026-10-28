import {test, expect} from '@playwright/test';
import {RegisterPage} from '../pages/registerSupport.ts';
import {LoginPage} from '../pages/loginSupport.ts';
import {newUser, invalidRegisterUsers} from '../data/registerUser.ts';

test('Register Successful', async ({page}) => {
    const registerPage: RegisterPage = new RegisterPage(page);
    const loginPage: LoginPage = new LoginPage(page);

    const user = newUser();


    await test.step('Open Register Page', async () => {
        await registerPage.openPageRegister();

        await expect(page).toHaveURL('/auth/register');
        await expect(page.getByRole('heading', { name: 'Customer registration' })).toBeVisible();
    });

    await test.step('Register with valid data', async () => {
        await registerPage.register(user);

        await expect(page).toHaveURL('/auth/login', { timeout: 15000 });
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });

    await test.step('Login with the new account', async () => {
        // Tunggu respons API login, karena server demo kadang lambat
        const loginResponse = page.waitForResponse(
            (res) => res.url().includes('/users/login') && res.request().method() === 'POST');

        await loginPage.login(
            user.email,
             user.password);

        expect((await loginResponse).status()).toBe(200);
        await expect(page).toHaveURL('/account', { timeout: 15000 });
        await expect(page.getByRole('heading', { name: 'My Account' })).toBeVisible();
    });
});

test('Register Failed (Empty Form)', async ({page}) => {
    const registerPage: RegisterPage = new RegisterPage(page);


    await test.step('Open Register Page', async () => {
        await registerPage.openPageRegister();

        await expect(page).toHaveURL('/auth/register');
    });

    await test.step('Submit empty form', async () => {
        await registerPage.submit();

        await expect(registerPage.errorMessage('first-name')).toHaveText('First name is required');
        await expect(registerPage.errorMessage('last-name')).toHaveText('Last name is required');
        await expect(registerPage.errorMessage('dob')).toContainText('Date of Birth is required');
        await expect(registerPage.errorMessage('country')).toHaveText('Country is required');
        await expect(registerPage.errorMessage('postal_code')).toHaveText('Postcode is required');
        await expect(registerPage.errorMessage('house_number')).toHaveText('House number is required');
        await expect(registerPage.errorMessage('street')).toHaveText('Street is required');
        await expect(registerPage.errorMessage('city')).toHaveText('City is required');
        await expect(registerPage.errorMessage('state')).toHaveText('State is required');
        await expect(registerPage.errorMessage('phone')).toHaveText('Phone is required.');
        await expect(registerPage.errorMessage('email')).toHaveText('Email is required');
        await expect(registerPage.errorMessage('password')).toContainText('Password is required');
        await expect(page).toHaveURL('/auth/register');
    });
});

test('Register Failed (Email Already Exists)', async ({page}) => {
    const registerPage: RegisterPage = new RegisterPage(page);

    const user = invalidRegisterUsers.ExistingEmail;


    await test.step('Open Register Page', async () => {
        await registerPage.openPageRegister();

        await expect(page).toHaveURL('/auth/register');
    });

    await test.step('Register with registered email', async () => {
        await registerPage.register(user);

        await expect(page.locator('[data-test="register-error"]')).toBeVisible();
        await expect(page.locator('[data-test="register-error"]')).toHaveText('A customer with this email address already exists.');
        await expect(page).toHaveURL('/auth/register');
    });
});

test('Register Failed (Invalid Email Format)', async ({page}) => {
    const registerPage: RegisterPage = new RegisterPage(page);

    const user = invalidRegisterUsers.InvalidEmailFormat;


    await test.step('Open Register Page', async () => {
        await registerPage.openPageRegister();

        await expect(page).toHaveURL('/auth/register');
    });

    await test.step('Register with invalid email format', async () => {
        await registerPage.register(user);

        await expect(registerPage.errorMessage('email')).toHaveText('Email format is invalid');
        await expect(page).toHaveURL('/auth/register');
    });
});

test('Register Failed (Password Too Short)', async ({page}) => {
    const registerPage: RegisterPage = new RegisterPage(page);

    const user = invalidRegisterUsers.ShortPassword;


    await test.step('Open Register Page', async () => {
        await registerPage.openPageRegister();

        await expect(page).toHaveURL('/auth/register');
    });

    await test.step('Register with short password', async () => {
        await registerPage.register(user);

        await expect(registerPage.errorMessage('password')).toContainText('Password must be minimal 6 characters long.');
        await expect(page).toHaveURL('/auth/register');
    });
});

import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/loginSupport.ts';
import {validUsers} from '../data/user.ts';
import {invalidUsers} from '../data/user.ts';

test('Login Successful', async  ({page}) => {
    const loginPage: LoginPage = new LoginPage(page);

    const user1 = validUsers.User1;


    await test.step('Open Login Page', async () => {
        await loginPage.openPageLogin();

        await expect(page).toHaveURL('/auth/login');

        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });

    await test.step('Login with valid credentials', async () => {
        await loginPage.login(
            user1.username,
             user1.password);

        await expect(page).toHaveURL('/account');
        await expect(page.getByRole('heading', { name: 'My Account' })).toBeVisible();
    });
});

test('Login Invalid Credentials (Invalid Email)', async  ({page}) => {
    const loginPage: LoginPage = new LoginPage(page);

    const user2 = invalidUsers.User1;


    await test.step('Open Login Page', async () => {
        await loginPage.openPageLogin();

        await expect(page).toHaveURL('/auth/login');

        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });

    await test.step('Login with invalid email', async () => {
        await loginPage.login(
            user2.username,
             user2.password);

        await expect(page.locator('[data-test="login-error"]')).toBeVisible();
        await expect(page.locator('[data-test="login-error"]')).toHaveText('Invalid email or password');
    });

});
test('Login Invalid Credentials (Invalid Password)', async  ({page}) => {
    const loginPage: LoginPage = new LoginPage(page);

   
    const user3 = invalidUsers.User2;


    await test.step('Open Login Page', async () => {
        await loginPage.openPageLogin();

        await expect(page).toHaveURL('/auth/login');

        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });

    await test.step('Login with invalid email', async () => {
        await loginPage.login(
            user3.username,
             user3.password);

        await expect(page.locator('[data-test="login-error"]')).toBeVisible();
        await expect(page.locator('[data-test="login-error"]')).toHaveText('Invalid email or password');
    });


});
        



    
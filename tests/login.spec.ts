import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

test.describe("Login", () => {
    test("Login with valid credentials", async ({ page }) => {
        const loginPage: LoginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login("admin", "admin123");

        await expect(loginPage.loginSuccessMessage).toBeVisible();
    });

    test("Login with invalid credentials", async ({ page }) => {
        const loginPage: LoginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login("admin11", "wrongpassword");

        await expect(loginPage.loginErrorMessage).toBeVisible();
    });

    test("Login with empty username", async ({ page }) => {
        const loginPage: LoginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(undefined, "admin123");

        await expect(loginPage.usernameErrorMessage).toBeVisible();
    });

    test("Login with empty password", async ({ page }) => {
        const loginPage: LoginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login("admin", undefined);

        await expect(loginPage.passwordErrorMessage).toBeVisible();
    });
});

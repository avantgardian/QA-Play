import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    readonly loginSuccessMessage: Locator;
    readonly loginErrorMessage: Locator;
    readonly usernameErrorMessage: Locator;
    readonly passwordErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#loginBtn");

        this.loginSuccessMessage = page.locator("#loginSuccess");
        this.loginErrorMessage = page.locator("#loginError");
        this.usernameErrorMessage = page.locator("#usernameError");
        this.passwordErrorMessage = page.locator("#passwordError");
    }

    async goto() {
        await this.page.goto("/QA-Play/pages/login.html");
    }

    async login(username?: string, password?: string) {
        if (username) await this.usernameInput.fill(username);
        if (password) await this.passwordInput.fill(password);

        await this.loginButton.click();
    }
}

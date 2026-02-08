import { Page, Locator } from "@playwright/test";

export class RegisterPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly dobInput: Locator;
    readonly experienceSelect: Locator;
    readonly seleniumSkillCheckbox: Locator;
    readonly playwrightSkillCheckbox: Locator;
    readonly cypressSkillCheckbox: Locator;
    readonly termsCheckbox: Locator;
    readonly registerButton: Locator;
    readonly registerSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator("#firstname");
        this.lastNameInput = page.locator("#lastname");
        this.emailInput = page.locator("#email");
        this.dobInput = page.locator("#dob");
        this.experienceSelect = page.locator("#experience");
        this.seleniumSkillCheckbox = page.locator(
            'input[type="checkbox"][value="selenium"]',
        );
        this.playwrightSkillCheckbox = page.locator(
            'input[type="checkbox"][value="playwright"]',
        );
        this.cypressSkillCheckbox = page.locator(
            'input[type="checkbox"][value="cypress"]',
        );
        this.termsCheckbox = page.locator("#terms");
        this.registerButton = page.locator("#registerBtn");
        this.registerSuccessMessage = page.locator("#registerSuccess");
    }

    async goto() {
        await this.page.goto("/QA-Play/pages/register.html");
    }

    async fillFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillDateOfBirth(date: string) {
        await this.dobInput.fill(date);
    }

    async selectExperience(experience: "junior" | "mid" | "senior" | "lead") {
        await this.experienceSelect.selectOption(experience);
    }

    async checkSkill(skill: "selenium" | "playwright" | "cypress") {
        switch (skill) {
            case "selenium":
                await this.seleniumSkillCheckbox.check();
                break;
            case "playwright":
                await this.playwrightSkillCheckbox.check();
                break;
            case "cypress":
                await this.cypressSkillCheckbox.check();
                break;
        }
    }

    async checkMultipleSkills(
        skills: ("selenium" | "playwright" | "cypress")[],
    ) {
        for (const skill of skills) {
            await this.checkSkill(skill);
        }
    }

    async acceptTerms() {
        await this.termsCheckbox.check();
    }

    async clickRegister() {
        await this.registerButton.click();
    }

    async register(
        firstName: string,
        lastName: string,
        email: string,
        dob: string,
        experience: "junior" | "mid" | "senior" | "lead",
        skills: ("selenium" | "playwright" | "cypress")[],
        acceptTerms: boolean = true,
    ) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillDateOfBirth(dob);
        await this.selectExperience(experience);
        await this.checkMultipleSkills(skills);
        if (acceptTerms) {
            await this.acceptTerms();
        }
        await this.clickRegister();
    }

    async isSkillChecked(
        skill: "selenium" | "playwright" | "cypress",
    ): Promise<boolean> {
        let checkbox: Locator;
        switch (skill) {
            case "selenium":
                checkbox = this.seleniumSkillCheckbox;
                break;
            case "playwright":
                checkbox = this.playwrightSkillCheckbox;
                break;
            case "cypress":
                checkbox = this.cypressSkillCheckbox;
                break;
        }
        return await checkbox.isChecked();
    }
}

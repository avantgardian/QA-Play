import { test, expect } from "@playwright/test";
import { RegisterPage } from "./pages/RegisterPage";

test.describe("Registration", () => {
    test("Valid registration with all fields filled", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();
        await registerPage.register(
            "John",
            "Doe",
            "john.doe@example.com",
            "1990-01-15",
            "mid",
            ["selenium", "playwright"],
        );

        await expect(registerPage.registerSuccessMessage).toBeVisible();
    });

    test("Registration with minimum required fields", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();
        await registerPage.fillFirstName("Jane");
        await registerPage.fillLastName("Smith");
        await registerPage.fillEmail("jane.smith@test.com");
        await registerPage.acceptTerms();
        await registerPage.clickRegister();

        await expect(registerPage.registerSuccessMessage).toBeVisible();
    });

    test("Registration with all skills selected", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();
        await registerPage.register(
            "Test",
            "User",
            "test.user@example.com",
            "1985-06-20",
            "senior",
            ["selenium", "playwright", "cypress"],
        );

        await expect(registerPage.registerSuccessMessage).toBeVisible();
    });

    test("Registration fails without first name", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();
        await registerPage.fillLastName("Doe");
        await registerPage.fillEmail("test@example.com");
        await registerPage.acceptTerms();
        await registerPage.clickRegister();

        // Form should not submit - success message should not appear
        await expect(registerPage.registerSuccessMessage).not.toBeVisible();
        // First name field should be highlighted or show validation
        await expect(registerPage.firstNameInput).toBeFocused();
    });

    test("Registration fails without last name", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();
        await registerPage.fillFirstName("John");
        await registerPage.fillEmail("test@example.com");
        await registerPage.acceptTerms();
        await registerPage.clickRegister();

        await expect(registerPage.registerSuccessMessage).not.toBeVisible();
        await expect(registerPage.lastNameInput).toBeFocused();
    });

    test("Registration fails without email", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();
        await registerPage.fillFirstName("John");
        await registerPage.fillLastName("Doe");
        await registerPage.acceptTerms();
        await registerPage.clickRegister();

        await expect(registerPage.registerSuccessMessage).not.toBeVisible();
    });

    test("Registration fails with invalid email format", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();
        await registerPage.fillFirstName("John");
        await registerPage.fillLastName("Doe");
        await registerPage.fillEmail("invalid-email");
        await registerPage.acceptTerms();
        await registerPage.clickRegister();

        await expect(registerPage.registerSuccessMessage).not.toBeVisible();
    });

    test("Registration fails without accepting terms", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();
        await registerPage.fillFirstName("John");
        await registerPage.fillLastName("Doe");
        await registerPage.fillEmail("john@example.com");
        await registerPage.clickRegister();

        await expect(registerPage.registerSuccessMessage).not.toBeVisible();
    });

    test("Select different experience levels", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();

        // Test Junior level
        await registerPage.selectExperience("junior");
        await expect(registerPage.experienceSelect).toHaveValue("junior");

        // Test Senior level
        await registerPage.selectExperience("senior");
        await expect(registerPage.experienceSelect).toHaveValue("senior");

        // Test Lead level
        await registerPage.selectExperience("lead");
        await expect(registerPage.experienceSelect).toHaveValue("lead");
    });

    test("Verify individual skill checkbox selection", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();

        // Check Selenium
        await registerPage.checkSkill("selenium");
        expect(await registerPage.isSkillChecked("selenium")).toBeTruthy();

        // Check Playwright
        await registerPage.checkSkill("playwright");
        expect(await registerPage.isSkillChecked("playwright")).toBeTruthy();

        // Check Cypress
        await registerPage.checkSkill("cypress");
        expect(await registerPage.isSkillChecked("cypress")).toBeTruthy();
    });

    test("Verify multiple skill checkboxes can be selected", async ({
        page,
    }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();
        await registerPage.checkMultipleSkills(["selenium", "cypress"]);

        expect(await registerPage.isSkillChecked("selenium")).toBeTruthy();
        expect(await registerPage.isSkillChecked("cypress")).toBeTruthy();
        expect(await registerPage.isSkillChecked("playwright")).toBeFalsy();
    });

    test("Registration with date of birth", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();
        await registerPage.fillFirstName("Test");
        await registerPage.fillLastName("User");
        await registerPage.fillEmail("testuser@example.com");
        await registerPage.fillDateOfBirth("1995-12-25");
        await registerPage.acceptTerms();
        await registerPage.clickRegister();

        await expect(registerPage.registerSuccessMessage).toBeVisible();
    });

    test("Verify form fields are editable", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();

        // Verify all inputs are enabled
        await expect(registerPage.firstNameInput).toBeEnabled();
        await expect(registerPage.lastNameInput).toBeEnabled();
        await expect(registerPage.emailInput).toBeEnabled();
        await expect(registerPage.dobInput).toBeEnabled();
        await expect(registerPage.experienceSelect).toBeEnabled();
        await expect(registerPage.termsCheckbox).toBeEnabled();
        await expect(registerPage.registerButton).toBeEnabled();
    });

    test("Complete form submission workflow", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();

        // Step 1: Fill personal details
        await registerPage.fillFirstName("Alice");
        await registerPage.fillLastName("Johnson");

        // Step 2: Fill email
        await registerPage.fillEmail("alice.johnson@company.com");

        // Step 3: Fill date of birth
        await registerPage.fillDateOfBirth("1988-03-10");

        // Step 4: Select experience
        await registerPage.selectExperience("lead");

        // Step 5: Select skills
        await registerPage.checkMultipleSkills(["playwright", "cypress"]);

        // Step 6: Accept terms
        await registerPage.acceptTerms();

        // Step 7: Submit
        await registerPage.clickRegister();

        // Verify success
        await expect(registerPage.registerSuccessMessage).toBeVisible();
        await expect(registerPage.registerSuccessMessage).toHaveText(
            "Registration successful!",
        );
    });
});

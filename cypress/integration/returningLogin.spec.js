///<reference types="cypress"/>

describe("Returning Login feature", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("TC-7: Modal with messagem when E-mail isn't registered", () => {
    // 1. Test Setup
    const expectedTitle = "\n    Uh oh!\n  ";
    const expectedMessage =
      "Sorry, we couldn't find your account that way! If you are already registered through your school or employer please try again. This app is designed for schools and employers. Please contact your org to tell them you'd like to improve your English!";

    // 2. Enter a valid but unregistered e-mail and click Continue
    cy.findByPlaceholderText("name@email.com").type("lucashdoa@gmail.com");
    cy.findByRole("button", { name: "Continue" }).click();
    //3. Validate modal title and message
    cy.get(".login-error-message__title").should("have.text", expectedTitle);
    cy.get(".login-error-message__message").should(
      "have.text",
      expectedMessage
    );
  });

  it("TC-18: Message when 'Ativar' button is pressed but activation code isn't working", () => {
    // 1. Test setup
    const expectedMessage =
      "The code you entered isn't working. Are you sure you copied it correctly? Please try again.";
    // 2. Click "I have a code" and enter a full code
    cy.get(".code-button").click();
    cy.get("#activation-code").type("1234123412341234");
    cy.findByRole("button", { name: "Continue" }).click();

    // 3. Fill obrigatory form fields at the modal and click Activate
    cy.get("#email").type("lucashdoa@gmail.com");
    cy.get("#firstName").type("Lucas");
    cy.findByLabelText("Enter password").type("Abc!@#12");
    cy.findByLabelText("Confirm password").type("Abc!@#12");

    // 4. Validate form validation message
    cy.findByRole("button", { name: "Activate" }).click();
    cy.get('[role="group"] > .account-form__error').should(
      "have.text",
      expectedMessage
    );
  });
});

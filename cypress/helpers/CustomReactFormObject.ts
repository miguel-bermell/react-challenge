export class CustomReactFormObject {
  nextButton = () => cy.findByRole('button', { name: /next/i });
  backButton = () => cy.findByRole('button', { name: /back/i });
  submitButton = () => cy.findByRole('button', { name: /submit/i });

  stepAccommodation = () => cy.findByTestId('step-accommodation');
  stepOwner = () => cy.findByTestId('step-owner');
  stepSummary = () => cy.findByTestId('step-summary');

  visit() {
    cy.visit('../custom-form-result.html');
    cy.window().then((win) => {
      const formEl = win.document.querySelector('custom-react-form');
      const stub: sinon.SinonStub = cy.stub().as('submitEventSpy');
      formEl?.addEventListener('custom-react-submit', stub);
    });
  }

  getSubmitEventStub() {
    return cy
      .get('@submitEventSpy')
      .then((stub) => stub as unknown as sinon.SinonStub);
  }

  fillAccommodation({ name, address, description, type }) {
    this.stepAccommodation().within(() => {
      cy.findByLabelText(/name/i).clear().type(name);
      cy.findByLabelText(/address/i)
        .clear()
        .type(address);
      cy.findByLabelText(/description/i)
        .clear()
        .type(description);
    });
    if (type) {
      cy.get('[data-testid="accommodation-type-trigger"]').click();
      cy.get('[role="option"]')
        .contains(new RegExp(type, 'i'))
        .click({ force: true });
    }
  }

  fillOwner({ name, email, phone }) {
    this.stepOwner().within(() => {
      cy.findByLabelText(/name/i).clear().type(name);
      cy.findByLabelText(/email/i).clear().type(email);
      cy.findByLabelText(/phone/i).clear().type(phone);
    });
  }

  addPhoto(fileName: string) {
    cy.fixture(fileName, 'base64').then((fileContent) => {
      cy.get('input[data-testid="photo-input"]').selectFile(
        {
          contents: Cypress.Buffer.from(fileContent, 'base64'),
          fileName,
          mimeType: 'image/png',
          lastModified: Date.now(),
        },
        { force: true }
      );
    });
  }

  checkAccommodationError(field: string, message: string) {
    this.checkFieldError(this.stepAccommodation, field, message);
  }

  checkOwnerError(field: string, message: string) {
    this.checkFieldError(this.stepOwner, field, message);
  }

  goToOwnerStep() {
    this.nextButton().click();
  }

  goToSummaryStep() {
    this.nextButton().click();
  }

  submit() {
    this.submitButton().click();
  }

  private checkFieldError(
    step: () => Cypress.Chainable<JQuery<HTMLElement>>,
    field: string,
    message: string
  ) {
    step().within(() => {
      cy.contains('label', new RegExp(field, 'i'))
        .parent()
        .find('[data-slot="form-message"]')
        .should('contain.text', message);
    });
  }
}

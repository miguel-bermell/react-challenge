import { CustomReactFormObject } from 'cypress/helpers/CustomReactFormObject';

describe('Custom React Form', () => {
  let form = new CustomReactFormObject();

  beforeEach(() => {
    form = new CustomReactFormObject();
    form.visit();
  });

  it('should complete and submit the form successfully', () => {
    cy.fixture('custom-react-form-data.json').then((data) => {
      form.fillAccommodation(data.accommodation);
      form.addPhoto('ok_image.png');
      form.goToOwnerStep();
      form.fillOwner(data.owner);
      form.goToSummaryStep();
      form.submit();
      form.getSubmitEventStub().should('have.been.calledOnce');
      form.getSubmitEventStub().should((stub) => {
        const event = stub.firstCall.args[0];
        expect(event.detail).to.have.property('accommodation');
        expect(event.detail).to.have.property('owner');
        expect(event.detail.accommodation).to.include(data.accommodation);
        expect(event.detail.owner).to.deep.equal(data.owner);
      });
    });
  });

  it('should validate accommodation step errors', () => {
    form.fillAccommodation({
      address: '12',
      name: '12',
      description: 'short',
      type: null,
    });
    form.addPhoto('error_image.png');
    form.nextButton().click();

    form.checkAccommodationError(
      'name',
      'Name must be at least 4 characters long'
    );
    form.checkAccommodationError(
      'address',
      'Address must be at least 4 characters long'
    );
    form.checkAccommodationError(
      'description',
      'Description must be at least 128 characters long'
    );
    form.checkAccommodationError('type', 'Type is required');
    form.checkAccommodationError(
      'photos',
      'All photos must be at most 500x500 pixels'
    );

    form.fillAccommodation({
      address: 't'.repeat(129),
      name: 't'.repeat(129),
      description: 't'.repeat(2049),
      type: null,
    });

    form.nextButton().click();

    form.checkAccommodationError(
      'name',
      'Name must be at most 128 characters long'
    );
    form.checkAccommodationError(
      'address',
      'Address must be at most 128 characters long'
    );
    form.checkAccommodationError(
      'description',
      'Description must be at most 2048 characters long'
    );
  });

  it('should validate owner step errors', () => {
    cy.fixture('custom-react-form-data.json').then((data) => {
      form.fillAccommodation(data.accommodation);
      form.goToOwnerStep();
    });
    form.fillOwner({
      name: 't'.repeat(3),
      email: 'invalid-email',
      phone: '1234567891',
    });
    form.nextButton().click();

    form.checkOwnerError('name', 'Name must be at least 4 characters long');
    form.checkOwnerError('email', 'Email must be a valid email address');
    form.checkOwnerError('phone', 'Phone number must be up to 9 digits');

    form.fillOwner({
      name: 't'.repeat(70),
      email: 'test@test.com',
      phone: '123456789',
    });

    form.nextButton().click();

    form.checkOwnerError('name', 'Name must be at most 64 characters long');
  });
});

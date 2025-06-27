const customReactFormEn = {
  steps: {
    accommodation: {
      title: 'Accommodation',
      form: {
        name: 'Name',
        address: 'Address',
        description: 'Description',
        type: 'Type',
        photos: 'Photos',
        typeOptions: {
          apartment: 'Apartment',
          house: 'House',
          villa: 'Villa',
        },
        typePlaceholder: 'Select type',
        descriptionHint: 'Optional. Min {{min}}, max {{max}} characters.',
        descriptionPlaceholder: 'Accommodation description',
        namePlaceholder: 'Accommodation name',
      },
    },
    owner: {
      title: 'Owner',
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        namePlaceholder: 'Owner name',
        phonePlaceholder: 'Phone (optional)',
      },
    },
  },
  buttons: {
    next: 'Next',
    back: 'Back',
    submit: 'Submit',
  },
  errors: {
    required: '{{field}} is required',
    minLength: '{{field}} must be at least {{min}} characters long',
    maxLength: '{{field}} must be at most {{max}} characters long',
    invalidEmail: 'Email must be a valid email address',
    invalidPhone: 'Phone number must be up to 9 digits',
    maxPhotos: 'Max {{max}} photos',
    photoSize: 'All photos must be at most {{width}}x{{height}} pixels',
    nameRegex: 'Name can only contain letters',
  },
};

export default customReactFormEn;

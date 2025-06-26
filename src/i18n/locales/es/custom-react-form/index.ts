const customReactFormEs = {
  steps: {
    accommodation: {
      title: 'Alojamiento',
      form: {
        name: 'Nombre',
        address: 'Dirección',
        description: 'Descripción',
        type: 'Tipo',
        photos: 'Fotos',
        typeOptions: {
          apartment: 'Apartamento',
          house: 'Casa',
          villa: 'Villa',
        },
        typePlaceholder: 'Seleccionar tipo',
        descriptionHint: 'Opcional. Mín {{min}}, máx {{max}} caracteres.',
        descriptionPlaceholder: 'Descripción del alojamiento',
        namePlaceholder: 'Nombre del alojamiento',
      },
    },
    owner: {
      title: 'Propietario',
      form: {
        name: 'Nombre',
        email: 'Correo electrónico',
        phone: 'Teléfono',
        namePlaceholder: 'Nombre del propietario',
        phonePlaceholder: 'Teléfono (opcional)',
      },
    },
  },
  buttons: {
    next: 'Siguiente',
    back: 'Atrás',
    submit: 'Enviar',
  },
  errors: {
    required: '{{field}} es requerido',
    minLength: '{{field}} debe tener al menos {{min}} caracteres',
    maxLength: '{{field}} debe tener como máximo {{max}} caracteres',
    invalidEmail: 'El correo electrónico debe ser una dirección válida',
    invalidPhone: 'El número de teléfono debe tener hasta 9 dígitos',
    maxPhotos: 'Max {{max}} fotos',
    photoSize:
      'Todas las fotos deben tener como máximo {{width}}x{{height}} píxeles',
    nameRegex: 'El nombre solo puede contener letras',
  },
};

export default customReactFormEs;

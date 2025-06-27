import { createRoot } from 'react-dom/client';

import i18n from '@/i18n';

import { CustomReactForm } from './form';

export class CustomReactFormElement extends HTMLElement {
  static get observedAttributes() {
    return ['lang'];
  }

  connectedCallback() {
    const container = document.createElement('div');
    container.setAttribute('id', 'custom-react-form-container');

    const root = createRoot(container);
    root.render(<CustomReactForm hostRef={this} />);

    this.appendChild(container);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'lang' && oldValue !== newValue) {
      i18n.changeLanguage(newValue);
    }
  }
}

customElements.define('custom-react-form', CustomReactFormElement);

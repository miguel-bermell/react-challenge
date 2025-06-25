import { createRoot } from 'react-dom/client';

import { CustomReactForm } from './form';

export class CustomReactFormElement extends HTMLElement {
  connectedCallback() {
    const container = document.createElement('div');
    container.setAttribute('id', 'custom-react-form-container');

    const root = createRoot(container);
    root.render(<CustomReactForm hostRef={this} />);

    this.appendChild(container);
  }
}

customElements.define('custom-react-form', CustomReactFormElement);

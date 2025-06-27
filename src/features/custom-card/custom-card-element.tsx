export class CustomCardElement extends HTMLElement {
  connectedCallback() {
    this.className = 'block max-w-xl mt-7 mx-auto p-6 bg-white rounded shadow';
  }
}

customElements.define('custom-card', CustomCardElement);

export default class Component {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    throw new Error(`not on abstract class`);
  }

  createElement(template) {
    const div = document.createElement(`div`);
    div.innerHTML = template;
    return div.firstChild;
  }

  getElement() {
    if (!this._element) {
      this._element = this.createElement(this.getTemplate());
    }
    return this._element;
  }

  deleteElement() {
    this._element = null;
  }
}

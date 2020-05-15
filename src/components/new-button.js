import Component from './component.js';

const createNewListButtonTemplate = (type) => {
  return (
    `<button class="button button--new button--${type}">+ add another list</button>`
  )
};

export default class NewButton extends Component {
  constructor(type) {
    super();
    this._type = type;
  }

  getTemplate() {
    return createNewListButtonTemplate(this._type);
  }

  onNewButtonClick(handler) {
    this.getElement().parentElement.querySelector(`.button--${this._type}`).addEventListener(`click`, handler);
  }
}
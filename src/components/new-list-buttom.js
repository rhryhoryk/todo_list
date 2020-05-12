import Component from './component.js';

const createNewListButtonTemplate = () => {
  return (
    `<button class="button button--new button--list">+ add another list</button>`
  )
};

export default class NewListButton extends Component {
  constructor() {
    super();
  }

  getTemplate() {
    return createNewListButtonTemplate();
  }

  onNewButtonClick(handler) {
    this.getElement().parentElement.querySelector(`.button--list`).addEventListener(`click`, handler);
  }
}
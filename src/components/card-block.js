import Component from './component.js';

const createEditBlockTemplate = () => {
  return (
    `<div class="group group--new group--edit">
      <textarea name="" id="" cols="30" rows="5" class="edit-textarea user-input" placeholder="enter your task..."></textarea>
      <div class="group group--buttons">
        <button class="button button--add button--edit">edit</button>
        <button class="button button--service button--cancel button--editcancel">X</button>
        <button class="button button--service button--editdelete">&#128465</button>
      </div>
    </div>`
  )
};

export default class CardBlock extends Component {

  getTemplate() {
    return createEditBlockTemplate(this._addingType);
  }

  onEditButtonClick(handler) {
    this.getElement().querySelector(`.button--edit`).addEventListener(`click`, handler);
  };

  onEditCancelButtonClick(handler) {
    this.getElement().querySelector(`.button--editcancel`).addEventListener(`click`, handler);
  }

  onEditDeleteButtonClick(handler) {
    this.getElement().querySelector(`.button--editdelete`).addEventListener(`click`, handler);
  }
}
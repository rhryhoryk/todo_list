import Component from './component.js';

const createEditBlockTemplate = (addingType) => {
  return (
    `<div class="group group--new group--edit">
      <textarea name="" id="" cols="30" rows="5" class="edit-textarea user-input"></textarea>
      <div class="group group--buttons">
        <button class="button button--add button--edit" data-value="${addingType}">edit</button>
        <button class="button button--service button--cancel button--editcancel" data-value="${addingType}">X</button>
        <button class="button button--service button--editdelete">&#128465</button>
      </div>
    </div>`
  )
};

export default class EditBlock extends Component {
  constructor(addingType) {
    super();
    this._addingType = addingType;
  }

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
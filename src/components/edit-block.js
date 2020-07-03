import Component from './component';

const createEditBlockTemplate = (cardID, previousInput) => {
  return (
    `<div class="group group--new group--edit" data-value="cardID--${cardID}">
      <textarea name="" id="" cols="30" rows="5" class="edit-textarea user-card-input" placeholder="enter your task...">${previousInput}</textarea>
      <div class="group group--buttons">
        <button class="button button--add button--edit">edit</button>
        <button class="button button--service button--cancel button--editcancel">X</button>
        <button class="button button--service button--editdelete">&#128465</button>
      </div>
    </div>`
  );
};

export default class EditBlock extends Component {
  constructor(cardID, previousInput) {
    super();
    this._previousInput = previousInput;
    this._cardID = cardID;
  }

  getTemplate() {
    return createEditBlockTemplate(this._cardID, this._previousInput);
  }

  onEditButtonClick(handler) {
    this.getElement().querySelector(`.button--edit`).addEventListener(`click`, handler);
  }

  onEditCancelButtonClick(handler) {
    this.getElement().querySelector(`.button--editcancel`).addEventListener(`click`, handler);
  }

  onEditDeleteButtonClick(handler) {
    this.getElement().querySelector(`.button--editdelete`).addEventListener(`click`, handler);
  }
}

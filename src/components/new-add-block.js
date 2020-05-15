import Component from './component.js';

const createNewAddBlockTemplate = (addingType) => {
  return (
    `<div class="group group--new">
      <input type="text" name="new" id="newItem" class="input user-input" placeholder="enter new ${addingType}..." autocomplete="off">
      <div class="group group--buttons">
        <button class="button button--add" data-value="${addingType}">add</button>
        <button class="button button--service button--cancel" data-value="${addingType}">X</button>
      </div>
    </div>`
  )
}

export default class NewAddBlock extends Component {
  constructor(addingType) {
    super();
    this._addingType = addingType;
  } 

  getTemplate() {
    return createNewAddBlockTemplate(this._addingType);
  }

  onAddbuttonClick(handler) {
    this.getElement().querySelector(`.button--add`).addEventListener(`click`, handler);
  } 

  onCancelButoonClick(handler) {
    this.getElement().querySelector(`.button--cancel`).addEventListener(`click`, handler);
  } 
}
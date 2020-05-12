import Component from './component.js';

const createAddNewBlockTemplate = (addingType) => {
  return (
    `<div class="group group--new">
      <input type="text" name="new" id="newItem" class="input" placeholder="enter new ${addingType}...">
      <div class="group group--buttons">
        <button class="button button--add">add</button>
        <button class="button button--service button--cancel">X</button>
      </div>
    </div>`
  )
}

export default class AddNewBlock extends Component {
  constructor(addingType) {
    super();
    this._addingType = addingType;
  } 

  getTemplate() {
    return createAddNewBlockTemplate(this._addingType);
  }

  onAddbuttonClick(handler) {
    this.getElement().querySelector(`.button--add`).addEventListener(`click`, handler);
  } 

  onCancelButoonClick(handler) {
    this.getElement().querySelector(`.button--cancel`).addEventListener(`click`, handler);
  } 
}
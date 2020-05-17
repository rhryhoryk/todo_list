import Component from './component.js';

const createNewAddBlockTemplate = () => {
  return (
    `<div class="group group--new">
      <input type="text" name="new" id="newItem" class="input user-input" placeholder="enter new list name..." autocomplete="off">
      <div class="group group--buttons">
        <button class="button button--add">add</button>
        <button class="button button--service button--cancel">X</button>
      </div>
    </div>`
  )
}

export default class ListBlock extends Component {

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
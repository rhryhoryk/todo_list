import Component from './component';

const createNewAddBlockTemplate = (listID) => {
  return (
    `<div class="group group--new group--list" data-value="listID--${listID}">
      <input type="text" name="new" id="newItem" class="input user-list-input" placeholder="enter new list name..." autocomplete="off">
      <div class="group group--buttons">
        <button class="button button--add">add</button>
        <button class="button button--service button--cancel">X</button>
      </div>
    </div>`
  );
};

export default class ListBlock extends Component {
  constructor(listID) {
    super();
    this._listID = listID;
  }

  getTemplate() {
    return createNewAddBlockTemplate(this._listID);
  }

  onAddbuttonClick(handler) {
    this.getElement().querySelector(`.button--add`).addEventListener(`click`, handler);
  }

  onCancelButoonClick(handler) {
    this.getElement().querySelector(`.button--cancel`).addEventListener(`click`, handler);
  }
}

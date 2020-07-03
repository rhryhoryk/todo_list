import Component from './component';

const createListTemplate = (listName, index) => {
  return (
    `<ul class="taskList" id="${index}">
      <input class="taskList__name" value="${listName}" autocomplete="off">
      <button class="button button--service button--delete">&#128465</button>
    </ul>`
  );
};

export default class TaskList extends Component {
  constructor(index, listName) {
    super();
    this._index = index;
    this._listName = listName;
  }

  getTemplate() {
    return createListTemplate(this._listName, this._index);
  }

  onNewButtonClick(handler) {
    this.getElement().querySelector(`.button--card`).addEventListener(`click`, handler);
  }

  onDeleteButoonClick(handler) {
    this.getElement().querySelector(`.button--delete`).addEventListener(`click`, handler);
  }

  onHeadingMouseMove(handler) {
    this.getElement().querySelector(`.taskList__name`).addEventListener(`mousedown`, handler);
  }

  onInputChange(handler) {
    this.getElement().querySelector(`.taskList__name`).addEventListener(`change`, handler);
  }
}

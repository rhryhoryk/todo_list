import Component from './component.js';

const createListTemplate = (listName, index) => {
  return (
    `<ul class="taskList" id="${index}">
      <h3 class="taskList__name">${listName}</h3>
      <button class="button button--service button--delete">&#128465</button>
    </ul>`
  )
}

export default class TaskList extends Component {
  constructor(index, listName) {
    super()
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
}


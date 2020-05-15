import Component from './component.js';

const createListTemplate = (listName) => {
  return (
    `<ul class="taskList">
      <h3 class="taskList__name">${listName}</h3>
      <!-- <div class="group"> -->
        <button class="button button--new button--card">+ add another card</button>
      <!-- </div> -->
      <button class="button button--service button--delete">&#128465</button>
    </ul>`
  )
}

export default class TaskList extends Component {
  constructor(listName) {
    super()
    this._listName = listName;
  }

  getTemplate() {
    return createListTemplate(this._listName);
  }

  onNewButtonClick(handler) {
    this.getElement().querySelector(`.button--card`).addEventListener(`click`, handler);
  }

  onDeleteButoonClick(handler) {
    this.getElement().querySelector(`.button--delete`).addEventListener(`click`, handler);
  } 
}


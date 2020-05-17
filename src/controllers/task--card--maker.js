import TaskCard from '../components/task-card.js';
import AddCardBlockMaker from '../controllers/add--card--block-maker.js';

export default class TaskCardMaker {
  constructor(userInput, list) {
    this._userInput = userInput;
    this._taskList = new TaskCard(this._userInput);
    this._list = list;
  }

  render() {
    this._taskList.onEditButoonClick(this._edit);
    this._list.append(this._taskList.getElement());
  }

  _edit() {
    const cardTEst = this.nextElementSibling.textContent;
    const list = this.parentElement.parentElement;
    this.parentElement.remove();
    list.querySelector(`.button--new`).remove();

    const block = new AddCardBlockMaker(list, cardTEst);
    block.render();
  }
}
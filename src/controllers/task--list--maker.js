import TaskLIst from '../components/task-list.js';
import AddCardBlockMaker from './add--card--block-maker.js';

import {app} from '../controllers/add--new--button--maker.js';


export default class TaskListMaker {
  constructor(userInput) {
    this._userInput = userInput;
    this._taskList = new TaskLIst(this._userInput);
  }

  render() {
    this._addTasklisteners()
    app.append(this._taskList.getElement());
  }

  _addTasklisteners() {
    this._taskList.onNewButtonClick(this._addTaskCard);
    this._taskList.onDeleteButoonClick(this._deleteList);
  }

  _addTaskCard() {
    const list = this.parentElement;
    list.querySelector(`.button--new`).remove();
    const block = new AddCardBlockMaker(list);
    block.render();
  }

  _deleteList() {
    this.parentElement.remove();
  }

} 
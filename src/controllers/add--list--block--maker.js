import ListBlock from '../components/list-block.js';
import TaskListMaker from '../controllers/task--list--maker.js';

import {NEWButtonMaker, app} from '../controllers/add--new--button--maker.js';

export default class AddListBlocktMaker {
  constructor() {
    this._listBlock = new ListBlock();
  }

  render(parent) {
    this._addBlocklisteners()
    parent.append(this._listBlock.getElement())
  }

  _addBlocklisteners() {
    this._listBlock.onAddbuttonClick(this._addTaskList);
    this._listBlock.onCancelButoonClick(this._deleteBlock);
  }

  _addTaskList() {
    const userInput = this.parentElement.parentElement.querySelector(`.user-input`).value;
    this.parentElement.parentElement.remove();
    const taskList = new TaskListMaker(userInput);
    taskList.render();
    const button = new NEWButtonMaker();
    button.renderNewButton(`list`, app)
  }

  _deleteBlock() {
    this.parentElement.parentElement.remove();
    const button = new NEWButtonMaker();
    button.renderNewButton(`list`, app)
  }
}

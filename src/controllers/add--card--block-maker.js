import CardBlock from '../components/card-block.js';
import TaskCardMaker from './task--card--maker.js';

import {NEWButtonMaker} from './add--new--button--maker.js';

export default class AddCardBlockMaker {
  constructor(list, cardText) {
    this._block = new CardBlock();
    this._list = list;
    this._cardText = cardText;
  }

  render() {
    this._addBlocklisteners()
    const block = this._block.getElement();
    block.querySelector(`.user-input`).textContent = this._cardText;
    this._list.append(block);
  }

  _addBlocklisteners() {
    this._block.onEditButtonClick(this._addTaskCard);
    this._block.onEditCancelButtonClick(this._cancelBlock);
    this._block.onEditDeleteButtonClick(this._deleteBlock);
  }

  _addTaskCard() {
    const userInput = this.parentElement.parentElement.querySelector(`.user-input`).value;
    const list = this.parentElement.parentElement.parentElement;
    this.parentElement.parentElement.remove();
    const taskCard = new TaskCardMaker(userInput, list);
    taskCard.render();
    const button = new NEWButtonMaker();
    button.renderNewButton(`card`, list)
  }

  _cancelBlock() {
    
    const userInput = this.parentElement.parentElement.querySelector(`.user-input`).textContent;
    if (!userInput) {
      const list = this.parentElement.parentElement.parentElement;
      this.parentElement.parentElement.remove();
      const button = new NEWButtonMaker();
      button.renderNewButton(`card`, list)
    }
    else {
      const list = this.parentElement.parentElement.parentElement;
      this.parentElement.parentElement.remove();
      const taskCard = new TaskCardMaker(userInput, list);
      taskCard.render();
      const button = new NEWButtonMaker();
      button.renderNewButton(`card`, list)
    }
    
  }

  _deleteBlock() {
    const list = this.parentElement.parentElement.parentElement;
    this.parentElement.parentElement.remove();
    const button = new NEWButtonMaker();
    button.renderNewButton(`card`, list)
  }
}
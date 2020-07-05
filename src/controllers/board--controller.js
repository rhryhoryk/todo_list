import NewButton from '../components/new-button';
import ListBlock from '../components/list-block';
import TaskList from '../components/task-list';
import ListController from './list--controller';
import ListModel from '../model/list---model';
import Util from '../util';

const app = document.querySelector(`.app`);

export default class BoardController {
  constructor() {
    this._newButton = new NewButton(`list`);
    this._listAmount = localStorage.length;
  }

  start() {
    this._renderNewButton();
    this._renderStorage();
  }

  _renderNewButton() {
    this._newButton.onNewButtonClick(() => {
      Util.hideButton(this._newButton.getElement());
      const existedLists = Array.from(app.querySelectorAll(`.taskList`));
      const listID = Util.setIndex(existedLists, this._listAmount);
      this._createBlock(listID);
    });
    app.append(this._newButton.getElement());
  }

  _renderStorage() {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key.indexOf(`--list`) !== -1) {
        const obj = JSON.parse(localStorage.getItem(key));
        const listID = obj.listID;
        const head = obj.h3;
        const cardAmount = obj.cardAmount;
        const cards = obj.cards;

        const objModel = new ListModel(listID, head, cardAmount, cards);
        this._createNewList(objModel);

        const list = document.getElementById(listID);
        this._createCards(list, objModel);
      } else { continue; }
    }
  }

  _createBlock(listID) {
    const block = new ListBlock(listID);
    block.onAddbuttonClick(() => {
      const userInput = Util.getUserInput(document, `.user-list-input`);
      const listdata = new ListModel(listID, userInput, 0, []);
      listdata.createListInLocalDATA();
      this._createNewList(listdata);
      this._resetBlock();
      this._listAmount += 1;
    });
    block.onCancelButoonClick(() => {
      this._resetBlock();
    });
    app.append(block.getElement());
  }

  _createNewList(listdata) {
    const list = new TaskList(listdata.listID, listdata.h3);
    list.onDeleteButoonClick(() => {
      document.getElementById(listdata.listID).remove();
      listdata.deleteListFormLocalDATA();
      this._listAmount -= 1;
    });

    list.onInputChange((evtChange) => {
      listdata.h3 = evtChange.target.value;
      const listID = evtChange.target.parentElement.id;
      const listInStorage = JSON.parse(localStorage.getItem(`${listID}--list`));
      localStorage.removeItem(`${listID}--list`);
      listInStorage.h3 = evtChange.target.value;
      localStorage.setItem(`${listID}--list`, JSON.stringify(listInStorage));
    });

    list.onHeadingMouseMove((evt) => {
      Util.moveElement(evt, list, app);
    });

    app.insertBefore(list.getElement(), this._newButton.getElement());
    const listController = new ListController(list.getElement(), listdata);
    listController.render();
  }

  _createCards(parent, data) {
    const listController = new ListController(parent, data);
    listController.renderCards();
  }

  _resetBlock() {
    Util.deleteBlock(document, `.group--list`);
    Util.showButton(this._newButton.getElement());
  }
}

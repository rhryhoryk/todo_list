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
    this._listArr = [];
  }

  start() {
    this._renderNewButton();
    this._renderStorage();
  }

  _renderNewButton() {
    this._newButton.onNewButtonClick(() => {
      Util.hideButton(this._newButton.getElement());
      const listID = Util.setIndex(this._listArr.length);
      this._createBlock(listID);
    });
    app.append(this._newButton.getElement());
  }

  _renderStorage() {
    const listArr = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key.indexOf(`--list`) !== -1) {
        const obj = JSON.parse(localStorage.getItem(key));
        const listID = obj.listID;
        const head = obj.h3;
        const cardAmount = obj.cardAmount;
        const cards = obj.cards;

        const objModel = new ListModel(listID, head, cardAmount, cards);
        listArr.push(objModel);
      } else { continue; }
    }

    listArr.sort((a, b) => {
      return a.listID - b.listID;
    });

    this._listArr = listArr;

    listArr.forEach((el) => {
      this._createNewList(el);
    });
  }

  _createBlock(listID) {
    const block = new ListBlock(listID);
    block.onAddbuttonClick(() => {
      const userInput = Util.getUserInput(document, `.user-list-input`);
      if (!userInput) {
        this._resetBlock();
      } else {
        const listdata = new ListModel(listID, userInput, 0, []);
        this._listArr.push(listdata);
        listdata.createListInLocalDATA();
        this._createNewList(listdata);
        this._resetBlock();
        this._listAmount += 1;
      }
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
      this._listArr.splice(listdata.listID, 1);
      Util.resetIndex(this._listArr);
      listdata.deleteListFormLocalDATA();
      Util.resetListStorage(this._listArr);
      Util.resetNodeIndex(document.querySelectorAll(`.taskList`));
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
      Util.moveElement(evt, list, app, this._listArr);
    });

    app.insertBefore(list.getElement(), this._newButton.getElement());
    const listController = new ListController(list.getElement(), listdata);
    listController.render();
  }

  _resetBlock() {
    Util.deleteBlock(document, `.group--list`);
    Util.showButton(this._newButton.getElement());
  }
}

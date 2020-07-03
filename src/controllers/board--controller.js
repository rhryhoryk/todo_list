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

    list.onHeadingMouseMove((evt) => {
      evt.preventDefault();
      const userCoordinate = evt.clientX;
      list.getElement().style.zIndex = `1`;

      const onmousemove = (moveEVT) => {
        const shift = userCoordinate - moveEVT.clientX;
        list.getElement().style.right = `${shift}px`;
      };

      const onmouseup = (upEVT) => {
        const direction = list.getElement().style.right.slice(0, -2);
        const listsArr = Array.from(upEVT.currentTarget.parentElement.querySelectorAll(`.taskList`));
        const index = listsArr.findIndex((listEl) => listEl.id === upEVT.currentTarget.id);
        const lists = upEVT.currentTarget.parentElement.querySelectorAll(`.taskList`);

        const isLast = () => {
          return lists.length - 1 === index;
        };

        if (direction <= 0) {
          if (direction >= -50 || isLast()) {
            list.getElement().style.right = `0px`;
          } else {
            const replaced = app.replaceChild(lists[index], lists[index + 1]);
            app.insertBefore(replaced, lists[index]);
            list.getElement().style.right = `0px`;
          }
        }

        if (direction > 0) {
          if (direction < 50) {
            list.getElement().style.right = `0px`;
          } else {
            const replaced = app.replaceChild(lists[index], lists[index - 1]);
            lists[index].after(replaced);
            list.getElement().style.right = `0px`;
          }
        }

        list.getElement().style.zIndex = `0`;
        list.getElement().removeEventListener(`mousemove`, onmousemove);
        list.getElement().removeEventListener(`mouseup`, onmouseup);
      };
      list.getElement().addEventListener(`mousemove`, onmousemove);
      list.getElement().addEventListener(`mouseup`, onmouseup);
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

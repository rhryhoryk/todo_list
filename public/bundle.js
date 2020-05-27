/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/component.js":
/*!*************************************!*\
  !*** ./src/components/component.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
class Component {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    throw new Error(`not on abstract class`)
  }

  createElement(template) {
    const div = document.createElement(`div`);
    div.innerHTML = template;
    return div.firstChild;
  }

  getElement() {
    if (!this._element) {
      this._element = this.createElement(this.getTemplate())
    }
    return this._element;
  }

  deleteElement() {
    this._element = null;
  }
}

/***/ }),

/***/ "./src/components/edit-block.js":
/*!**************************************!*\
  !*** ./src/components/edit-block.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditBlock; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component.js */ "./src/components/component.js");


const createEditBlockTemplate = (cardID, previousInput) => {
  return (
    `<div class="group group--new group--edit" data-value="cardID--${cardID}">
      <textarea name="" id="" cols="30" rows="5" class="edit-textarea user-card-input" placeholder="enter your task...">${previousInput}</textarea>
      <div class="group group--buttons">
        <button class="button button--add button--edit">edit</button>
        <button class="button button--service button--cancel button--editcancel">X</button>
        <button class="button button--service button--editdelete">&#128465</button>
      </div>
    </div>`
  )
};

class EditBlock extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(cardID, previousInput) {
    super();
    this._previousInput = previousInput;
    this._cardID = cardID;
  }

  getTemplate() {
    return createEditBlockTemplate(this._cardID, this._previousInput);
  }

  onEditButtonClick(handler) {
    this.getElement().querySelector(`.button--edit`).addEventListener(`click`, handler);
  };

  onEditCancelButtonClick(handler) {
    this.getElement().querySelector(`.button--editcancel`).addEventListener(`click`, handler);
  }

  onEditDeleteButtonClick(handler) {
    this.getElement().querySelector(`.button--editdelete`).addEventListener(`click`, handler);
  }
}

/***/ }),

/***/ "./src/components/list-block.js":
/*!**************************************!*\
  !*** ./src/components/list-block.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ListBlock; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component.js */ "./src/components/component.js");


const createNewAddBlockTemplate = (listID) => {
  return (
    `<div class="group group--new group--list" data-value="listID--${listID}">
      <input type="text" name="new" id="newItem" class="input user-list-input" placeholder="enter new list name..." autocomplete="off">
      <div class="group group--buttons">
        <button class="button button--add">add</button>
        <button class="button button--service button--cancel">X</button>
      </div>
    </div>`
  )
}

class ListBlock extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(listID) {
    super();
    this._listID = listID;
  }

  getTemplate() {
    return createNewAddBlockTemplate(this._listID);
  }

  onAddbuttonClick(handler) {
    this.getElement().querySelector(`.button--add`).addEventListener(`click`, handler);
  } 

  onCancelButoonClick(handler) {
    this.getElement().querySelector(`.button--cancel`).addEventListener(`click`, handler);
  } 
}

/***/ }),

/***/ "./src/components/new-button.js":
/*!**************************************!*\
  !*** ./src/components/new-button.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NewButton; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component.js */ "./src/components/component.js");


const createNewListButtonTemplate = (type) => {
  return (
    `<button class="button button--new button--${type}">+ add another ${type}</button>`
  )
};

class NewButton extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(type) {
    super();
    this._type = type;
  }

  getTemplate() {
    return createNewListButtonTemplate(this._type);
  }

  onNewButtonClick(handler) {
    this.getElement().parentElement.querySelector(`.button--${this._type}`).addEventListener(`click`, handler);
  }
}

/***/ }),

/***/ "./src/components/task-card.js":
/*!*************************************!*\
  !*** ./src/components/task-card.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TaskCard; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component.js */ "./src/components/component.js");


const createCardTemplate = (index, text) => {
  return (
    `<li class="card" id="${index}">
      <button class="button button--service button--edit">&#128394;</button>
      <p class="card__text">${text}</p>
    </li>`
  )
}

class TaskCard extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(index, text) {
    super();
    this._index = index;
    this._text = text;
  }

  getTemplate() {
    return createCardTemplate(this._index, this._text)
  }

  onEditButoonClick(handler) {
    this.getElement().querySelector(`.button--edit`).addEventListener(`click`, handler);
  } 
}

/***/ }),

/***/ "./src/components/task-list.js":
/*!*************************************!*\
  !*** ./src/components/task-list.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TaskList; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component.js */ "./src/components/component.js");


const createListTemplate = (listName, index) => {
  return (
    `<ul class="taskList" id="${index}">
      <h3 class="taskList__name">${listName}</h3>
      <button class="button button--service button--delete">&#128465</button>
    </ul>`
  )
}

class TaskList extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
  
  onHeadingMouseMove(handler) {
    this.getElement().querySelector(`.taskList__name`).addEventListener(`mousedown`, handler);
  }
}



/***/ }),

/***/ "./src/controllers/board--controller.js":
/*!**********************************************!*\
  !*** ./src/controllers/board--controller.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BoardController; });
/* harmony import */ var _components_new_button_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/new-button.js */ "./src/components/new-button.js");
/* harmony import */ var _components_list_block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/list-block.js */ "./src/components/list-block.js");
/* harmony import */ var _components_task_list_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/task-list.js */ "./src/components/task-list.js");
/* harmony import */ var _list_controller_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list--controller.js */ "./src/controllers/list--controller.js");
/* harmony import */ var _model_list_model_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../model/list---model.js */ "./src/model/list---model.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util.js */ "./src/util.js");







const app = document.querySelector(`.app`);

class BoardController {
  constructor() {
    this._newButton = new _components_new_button_js__WEBPACK_IMPORTED_MODULE_0__["default"](`list`);
    this._listAmount = localStorage.length;
  }

  start() {
    this._renderNewButton();
    this._renderStorage();
  }

  _renderNewButton() {
    this._newButton.onNewButtonClick(() => {
      _util_js__WEBPACK_IMPORTED_MODULE_5__["default"].hideButton(this._newButton.getElement());
      const existedLists = Array.from(app.querySelectorAll(`.taskList`))
      const listID = _util_js__WEBPACK_IMPORTED_MODULE_5__["default"].setIndex(existedLists, this._listAmount);
      this._createBlock(listID);
    })
    app.append(this._newButton.getElement());
  }

  _renderStorage() {
      for(let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.indexOf(`--list`) != -1) {
        const obj = JSON.parse(localStorage.getItem(key))
        const listID = obj.listID;
        const head = obj.h3;
        const cardAmount = obj.cardAmount;
        const cards = obj.cards;

        const objModel = new _model_list_model_js__WEBPACK_IMPORTED_MODULE_4__["default"](listID, head, cardAmount, cards);
        this._createNewList(objModel);

        const list = document.getElementById(listID);
        this._createCards(list, objModel);
      } else {continue}
    }
  }

  _createBlock(listID) {
    const block = new _components_list_block_js__WEBPACK_IMPORTED_MODULE_1__["default"](listID);
      block.onAddbuttonClick(() => {
        const userInput = _util_js__WEBPACK_IMPORTED_MODULE_5__["default"].getUserInput(document, `.user-list-input`);
        const listdata = new _model_list_model_js__WEBPACK_IMPORTED_MODULE_4__["default"](listID, userInput, 0, []);
        listdata.createListInLocalDATA();
        this._createNewList(listdata);
        this._resetBlock()
        ++this._listAmount
      })
      block.onCancelButoonClick(() => {
        this._resetBlock();
      })
    app.append(block.getElement());
  }

  _createNewList(listdata) {
    const list = new _components_task_list_js__WEBPACK_IMPORTED_MODULE_2__["default"](listdata.listID, listdata.h3);
      list.onDeleteButoonClick(() => {
        document.getElementById(listdata.listID).remove();
        listdata.deleteListFormLocalDATA();
        --this._listAmount
      })

      list.onHeadingMouseMove((evt) => {
        evt.preventDefault();
        const userCoordinate = evt.clientX;
        list.getElement().style.zIndex = `1`;

        const onmousemove = (moveEVT) => {
          const shift = userCoordinate - moveEVT.clientX;
          list.getElement().style.right = `${shift}px`;
        }

        const onmouseup = (upEVT) => {
          const direction = list.getElement().style.right.slice(0, -2);
          const listsArr = Array.from(upEVT.currentTarget.parentElement.querySelectorAll(`.taskList`));
          const index = listsArr.findIndex(listEl => listEl.id == upEVT.currentTarget.id);
          const lists = upEVT.currentTarget.parentElement.querySelectorAll(`.taskList`);

          if (direction <= 0) {
            if (direction <= 0 && direction >= -50) {
              list.getElement().style.right = `0px`
            } else {
              if (lists.length - 1 === index ) {
                list.getElement().style.right = `0px`
              } else {
                const replaced = app.replaceChild(lists[index], lists[index + 1])
                app.insertBefore(replaced, lists[index])
                list.getElement().style.right = `0px`
              }
            }
          } else {
            if (direction >= 0 && direction < 50) {
              list.getElement().style.right = `0px`
            } else {
              const replaced = app.replaceChild(lists[index], lists[index - 1])
              lists[index].after(replaced)
              list.getElement().style.right = `0px`
            }
          }
          list.getElement().style.zIndex = `0`;
          list.getElement().removeEventListener(`mousemove`, onmousemove);
          list.getElement().removeEventListener(`mouseup`, onmouseup)
        }
        list.getElement().addEventListener(`mousemove`, onmousemove);
        list.getElement().addEventListener(`mouseup`, onmouseup)
      })

    app.insertBefore(list.getElement(), this._newButton.getElement());
    const listController = new _list_controller_js__WEBPACK_IMPORTED_MODULE_3__["default"](list.getElement(), listdata);
    listController.render();
  }

  _createCards(parent, data) {
    const listController = new _list_controller_js__WEBPACK_IMPORTED_MODULE_3__["default"](parent, data);
    listController.renderCards();
  }

  _resetBlock() {
    _util_js__WEBPACK_IMPORTED_MODULE_5__["default"].deleteBlock(document, `.group--list`);
    _util_js__WEBPACK_IMPORTED_MODULE_5__["default"].showButton(this._newButton.getElement());
  }
}


/***/ }),

/***/ "./src/controllers/list--controller.js":
/*!*********************************************!*\
  !*** ./src/controllers/list--controller.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ListController; });
/* harmony import */ var _components_new_button_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/new-button.js */ "./src/components/new-button.js");
/* harmony import */ var _components_edit_block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/edit-block.js */ "./src/components/edit-block.js");
/* harmony import */ var _components_task_card_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/task-card.js */ "./src/components/task-card.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util.js */ "./src/util.js");






class ListController {
  constructor(listElement, listData) {
    this._newButton = new _components_new_button_js__WEBPACK_IMPORTED_MODULE_0__["default"](`card`);
    this._listElement = listElement;
    this._listData = listData;
    this._cardAmount = this._listData.cardAmount
  }

  render() {
    this._renderNewButton();
  }

  renderCards() {
    this._listData.cards.forEach((cardData) => {
      const card = new _components_task_card_js__WEBPACK_IMPORTED_MODULE_2__["default"](cardData.cardID, cardData.cardText)
      card.onEditButoonClick((evt) => {
        const innerText = evt.target.nextElementSibling.textContent
        card.getElement().remove();
        this._createBlock(cardData.cardID, innerText);
      })
      this._listElement.insertBefore(card.getElement(), this._listElement.lastChild);
    })
  }

  _renderNewButton() {
    this._newButton.onNewButtonClick(() => {
      _util_js__WEBPACK_IMPORTED_MODULE_3__["default"].hideButton(this._newButton.getElement());
      this._createBlock(this._cardAmount, ``);
    })
    this._listElement.append(this._newButton.getElement())
  }

  _createBlock(cardID, previousInput) {
    const block = new _components_edit_block_js__WEBPACK_IMPORTED_MODULE_1__["default"](cardID, previousInput);
    
      block.onEditButtonClick( () => {
        const userInput = _util_js__WEBPACK_IMPORTED_MODULE_3__["default"].getUserInput(this._listElement, `.user-card-input`);
        this._createCard(cardID, userInput);
      });

      block.onEditCancelButtonClick(() => {
        if (!previousInput) {
          this._resetBlock()
        } else {
          const userInput = _util_js__WEBPACK_IMPORTED_MODULE_3__["default"].getPreviousInput(this._listElement, `.user-card-input`);
          this._createCard(cardID, userInput);
        }
      });

      block.onEditDeleteButtonClick(() => {
        if(!previousInput) {
          this._resetBlock()
        } else {
          this._listData.deleteCardFromLocalDATA(cardID);
          this._resetBlock()
          --this._cardAmount
        }
      });

    this._listElement.insertBefore(block.getElement(), this._listElement.lastChild);
  }

  _createCard(cardID, userInput) {
    this._listData.editCardInlocalDATA(cardID, userInput);
      const card = new _components_task_card_js__WEBPACK_IMPORTED_MODULE_2__["default"](cardID, userInput);
      card.onEditButoonClick((evt) => {
        const innerText = evt.target.nextElementSibling.textContent
        card.getElement().remove();
        this._createBlock(cardID, innerText);
      })

    this._resetBlock();
    ++this._cardAmount
    this._listElement.insertBefore(card.getElement(), this._listElement.lastChild);
  }

  _resetBlock() {
    _util_js__WEBPACK_IMPORTED_MODULE_3__["default"].deleteBlock(this._listElement, `.group--edit`);
    _util_js__WEBPACK_IMPORTED_MODULE_3__["default"].showButton(this._newButton.getElement());
  }
}



/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_board_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/board--controller.js */ "./src/controllers/board--controller.js");



class App {
  constructor() {
    this.board = new _controllers_board_controller_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  start () {
    this.board.start();
    // localStorage.clear();
  }

}

const application = new App();
application.start();

/***/ }),

/***/ "./src/model/list---model.js":
/*!***********************************!*\
  !*** ./src/model/list---model.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ListModel; });
class ListModel {
  constructor(listID, h3, cardAmount, cards) {
    this.listID = listID;
    this.h3 = h3;
    this.cardAmount = cardAmount;
    this.cards = cards;

    this.keyName = `${this.h3}--list`
  }

  createListInLocalDATA() {
    const obj = {
      listID: this.listID, 
      h3: this.h3, 
      cardAmount: this.cardAmount, 
      cards: this.cards
    }
    localStorage.setItem(this.keyName, JSON.stringify(obj));
  }

  deleteListFormLocalDATA() {
    localStorage.removeItem(this.keyName);
  }

  editCardInlocalDATA(cardID, userInput) {
    const obj = this._getObjFromLocalData()
    const realIndex = obj.cards.findIndex(card => card.cardID == cardID)

    if (realIndex > -1) {
      obj.cards[realIndex].cardText = userInput;
    } else {
      obj.cards.push({cardID: cardID, cardText: userInput});
      obj.cardAmount =  obj.cardAmount + 1;
    }

    this.cards = obj.cards
    localStorage.setItem(this.keyName, JSON.stringify(obj));
  }

  deleteCardFromLocalDATA(cardID) {
    const obj = this._getObjFromLocalData();
    const realIndex = obj.cards.findIndex(card => card.cardID == cardID)
    obj.cards.splice(realIndex, 1);
    obj.cardAmount =  obj.cardAmount - 1;
    this.cards = obj.cards;
    localStorage.setItem(this.keyName, JSON.stringify(obj));
  }

  _getObjFromLocalData() {
    return JSON.parse(localStorage.getItem(this.keyName))
  }
}

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Util; });
  class Util {

    static hideButton(button) {
      button.style.display = `none`;
    } 

    static showButton(button) {
      button.style.display = `block`;
    }

    static deleteBlock(parent, selector) {
      parent.querySelector(selector).remove();
    }

    static deleteNode(parent, selector) {
      parent.querySelector(selector).remove();
    }

    static getUserInput(parent, selector) {
     return parent.querySelector(selector).value;
    }

    static getPreviousInput(parent, selector) {
      return parent.querySelector(selector).textContent;
    }

    static setIndex(arr, index) {
      // !
      if (!this._isIndexLegal(arr, index)) {
        index = index - 1
        this.setIndex(arr, index)
      };
      return index
      // !
    }

    static _isIndexLegal(arr, index) {
      if (arr.findIndex(el => el.id == index) > -1) {
        return false
      } else {return true}
    }

  }

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
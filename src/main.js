import EditBlock from './components/edit-block.js';
import NewAddBlock from './components/new-add-block';
import NewButton from './components/new-button.js';
import TaskCard from './components/task-card.js';
import TaskList from './components/task-list.js';

import {revomeNode} from './util.js';

const app = document.querySelector(`.app`);
const renderNewButton = (type, parent) => {
  const button = new NewButton(type);
  button.onNewButtonClick(renderNewAddBlock)
  parent.append(button.getElement());
};

// ----------------------------render new-add-block logic--------------------------------

const renderNewAddBlock = (evt) => {
  let addingType = `list name`;
  let parent = app;
  if (!evt.target.classList.contains(`button--list`)) {
    addingType = `card text`
    parent = document.querySelector(`.taskList`);
  } 
  evt.target.remove()
  const block = new NewAddBlock(addingType);
  block.onAddbuttonClick(renderTaskPart)
  block.onCancelButoonClick(cancel)
  parent.append(block.getElement());
};

const cancel = (evt) => {
  revomeNode(`.group--new`);
  {evt.target.getAttribute(`data-value`) === `card text` ? 
    renderNewButton(`card`, document.querySelector(`.taskList`)) : 
    renderNewButton(`list`, app);}
}

// ----------------------------render task logic--------------------------------

const renderTaskPart = (evt) => {
  let classFROM = TaskList;
  let parentNode = app;
  if (evt.target.getAttribute(`data-value`) === `card text`) {
    classFROM = TaskCard;
    parentNode = document.querySelector(`.taskList`);
  }

  const userInput = document.querySelector(`.user-input`).value;
  revomeNode(`.group--new`);

  const taskPart = new classFROM(userInput);
  if (classFROM === TaskList) {
    taskPart.onNewButtonClick(renderNewAddBlock)
    taskPart.onDeleteButoonClick(deleteTaskPart)
  } else {
    taskPart.onEditButoonClick(editCard)
  }

  parentNode.append(taskPart.getElement());
  {
    classFROM === TaskList ? 
    renderNewButton(`list`, app) :
    renderNewButton(`card`, document.querySelector(`.taskList`))
  }
};

const deleteList = () => {
  revomeNode(`.taskList`);
};

const deleteTaskPart = (evt) => {
  let deletingElement = `.taskList`;
  if (evt.target.classList.contains(`button--editdelete`)) {
    deletingElement = `.group--edit`;
  }
  revomeNode(deletingElement);
}

// ----------------------------edit card logic--------------------------------

const editCard = () => {
  const cardText = document.querySelector(`.card__text`).textContent;
  revomeNode(`.card`);
  renderEditBlock(cardText);
}

const renderEditBlock = (cardText) => {
  const editBlock = new EditBlock(`card-text`);
  editBlock.onEditButtonClick(editing);
  editBlock.onEditCancelButtonClick(editing);
  editBlock.onEditDeleteButtonClick(deleteTaskPart);
  const editBlockElement = editBlock.getElement();
  editBlockElement.querySelector(`.edit-textarea`).textContent = cardText;
  document.querySelector(`.button--card`).before(editBlockElement)
}

const editing = (evt) => {
  let editedText = ` `;
  {evt.target.classList.contains(`button--edit`) ? 
    editedText = document.querySelector(`.edit-textarea`).value :
    editedText = document.querySelector(`.edit-textarea`).textContent
  }
  revomeNode(`.group--edit`);
  const card = new TaskCard(editedText);
  card.onEditButoonClick(editCard);
  document.querySelector(`.button--card`).before(card.getElement());
};

// ----------------------------start app--------------------------------
renderNewButton(`list`, app); 




// ----------------------------do some class?--------------------------------

// class App {
//   constructor() {
//     this._newListBtn = new NewListButton();
//     this._newAddBlock = new AddNewBlock();
//     this._list = new TaskList();
//     this._card = new taskcard();
//   }
// }
import NewButton from '../components/new-button';
import EditBlock from '../components/edit-block';
import TaskCard from '../components/task-card';
import Util from '../util';


export default class ListController {
  constructor(listElement, listData) {
    this._newButton = new NewButton(`card`);
    this._listElement = listElement;
    this._listData = listData;
    this._cardAmount = this._listData.cardAmount;
  }

  render() {
    this._renderNewButton();
  }

  renderCards() {
    this._listData.cards.forEach((cardData) => {
      const card = new TaskCard(cardData.cardID, cardData.cardText);
      card.onEditButoonClick((evt) => {
        const innerText = evt.target.nextElementSibling.textContent;
        card.getElement().remove();
        this._createBlock(cardData.cardID, innerText);
      });
      card.onMouseDown((evtdown) => {
        Util.moveElement(evtdown, card, this._listElement);
      });
      this._listElement.insertBefore(card.getElement(), this._listElement.lastChild);
    });
  }

  _renderNewButton() {
    this._newButton.onNewButtonClick(() => {
      Util.hideButton(this._newButton.getElement());
      this._createBlock(this._cardAmount, ``);
    });
    this._listElement.append(this._newButton.getElement());
  }

  _createBlock(cardID, previousInput) {
    const block = new EditBlock(cardID, previousInput);
    block.onEditButtonClick(() => {
      const userInput = Util.getUserInput(this._listElement, `.user-card-input`);
      if (!userInput) {
        this._resetBlock();
      } else {
        this._createCard(cardID, userInput);
      }
    });

    block.onEditCancelButtonClick(() => {
      if (!previousInput) {
        this._resetBlock();
      } else {
        const userInput = Util.getPreviousInput(this._listElement, `.user-card-input`);
        this._createCard(cardID, userInput);
      }
    });

    block.onEditDeleteButtonClick(() => {
      if (!previousInput) {
        this._resetBlock();
      } else {
        this._listData.deleteCardFromLocalDATA(cardID);
        this._resetBlock();
        this._cardAmount -= 1;
      }
    });

    this._listElement.insertBefore(block.getElement(), this._listElement.lastChild);
  }

  _createCard(cardID, userInput) {
    this._listData.editCardInlocalDATA(cardID, userInput);
    const card = new TaskCard(cardID, userInput);
    card.onEditButoonClick((evt) => {
      const innerText = evt.target.nextElementSibling.textContent;
      card.getElement().remove();
      this._createBlock(cardID, innerText);
    });

    card.onMouseDown((evtdown) => {
      Util.moveElement(evtdown, card, this._listElement);
    });

    this._resetBlock();
    this._cardAmount += 1;
    this._listElement.insertBefore(card.getElement(), this._listElement.lastChild);
  }

  _resetBlock() {
    Util.deleteBlock(this._listElement, `.group--edit`);
    Util.showButton(this._newButton.getElement());
  }
}

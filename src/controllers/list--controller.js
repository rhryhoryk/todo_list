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
    this._cardArr = this._listData.cards;
  }

  render() {
    this._renderNewButton();
    this._renderStorage();
  }

  _renderNewButton() {
    this._newButton.onNewButtonClick(() => {
      Util.hideButton(this._newButton.getElement());
      const cardID = Util.setIndex(this._cardArr.length);
      this._createBlock(cardID, ``);
    });
    this._listElement.append(this._newButton.getElement());
  }

  _renderStorage() {
    this._cardArr.forEach((cardData) => {
      const card = new TaskCard(cardData.cardID, cardData.cardText);
      card.onEditButoonClick((evt) => {
        const innerText = evt.target.nextElementSibling.textContent;
        card.getElement().remove();
        this._createBlock(cardData.cardID, innerText);
      });
      card.onMouseDown((evtdown) => {
        Util.moveElement(evtdown, card, this._listElement, this._cardArr);
      });
      this._listElement.insertBefore(card.getElement(), this._listElement.lastChild);
    });
  }

  _createBlock(cardID, previousInput) {
    const block = new EditBlock(cardID, previousInput);
    block.onEditButtonClick(() => {
      const userInput = Util.getUserInput(this._listElement, `.user-card-input`);
      if (!userInput) {
        this._resetBlock();
      } else {
        this._listData.editCardInlocalDATA(cardID, userInput);
        this._createCard(cardID, userInput);
        this._resetBlock();
        this._cardAmount += 1;
      }
    });

    block.onEditCancelButtonClick(() => {
      if (!previousInput) {
        this._resetBlock();
      } else {
        const userInput = Util.getPreviousInput(this._listElement, `.user-card-input`);
        this._createCard(cardID, userInput);
        this._resetBlock();
        this._cardAmount += 1;
      }
    });

    block.onEditDeleteButtonClick(() => {
      if (!previousInput) {
        this._resetBlock();
      } else {
        this._cardArr.splice(cardID, 1);
        Util.resetIndex(this._cardArr);
        this._listData.deleteCardFromLocalDATA(cardID);
        Util.resetCardStorage(this._listData.listID, this._cardArr);
        Util.resetNodeIndex(this._listElement.querySelectorAll(`.card`));
        this._resetBlock();
        this._cardAmount -= 1;
      }
    });

    if (cardID + 1 === this._cardArr.length) {
      this._listElement.insertBefore(block.getElement(), this._listElement.lastChild);
    } else {
      this._listElement.insertBefore(block.getElement(), this._listElement.querySelector(`.card--${cardID + 1}`));
    }
  }

  _createCard(cardID, userInput) {
    const card = new TaskCard(cardID, userInput);
    card.onEditButoonClick((evt) => {
      const innerText = evt.target.nextElementSibling.textContent;
      card.getElement().remove();
      this._createBlock(cardID, innerText);
    });

    card.onMouseDown((evtdown) => {
      Util.moveElement(evtdown, card, this._listElement);
    });

    if (!this._cardArr.some((cardData) => {
      return cardData.cardID === cardID;
    })) {
      this._cardArr.push({ cardID, userInput });
    }

    if (cardID + 1 === this._cardArr.length) {
      this._listElement.insertBefore(card.getElement(), this._listElement.querySelector(`.button--new`));
    } else {
      this._listElement.insertBefore(card.getElement(), this._listElement.querySelector(`.card--${cardID + 1}`));
    }
  }

  _resetBlock() {
    Util.deleteBlock(this._listElement, `.group--edit`);
    Util.showButton(this._newButton.getElement());
  }
}

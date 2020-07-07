export default class ListModel {
  constructor(listID, h3, cardAmount, cards) {
    this.listID = listID;
    this.h3 = h3;
    this.cardAmount = cardAmount;
    this.cards = cards;
    this.keyName = `${this.listID}--list`;
  }

  createListInLocalDATA() {
    const obj = {
      listID: this.listID,
      h3: this.h3,
      cardAmount: this.cardAmount,
      cards: this.cards,
    };
    localStorage.setItem(this.keyName, JSON.stringify(obj));
  }

  deleteListFormLocalDATA() {
    localStorage.removeItem(this.keyName);
  }

  editCardInlocalDATA(cardID, cardText) {
    const obj = this._getObjFromLocalData();
    if (!obj.cards.some((cardData) => {
      return cardData.cardID === cardID;
    })) {
      obj.cards.push({ cardID, cardText });
      obj.cardAmount += 1;
    } else {
      obj.cards[cardID] = { cardID, cardText };
    }
    this.cards = obj.cards;
    localStorage.setItem(this.keyName, JSON.stringify(obj));
  }

  deleteCardFromLocalDATA(cardID) {
    const obj = this._getObjFromLocalData();
    obj.cards.splice(cardID, 1);
    obj.cardAmount -= 1;
    this.cards = obj.cards;
    localStorage.setItem(this.keyName, JSON.stringify(obj));
  }

  _getObjFromLocalData() {
    return JSON.parse(localStorage.getItem(this.keyName));
  }
}

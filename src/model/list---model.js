export default class ListModel {
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
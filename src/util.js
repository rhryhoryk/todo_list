export default class Util {
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
    if (!this._isIndexLegal(arr, index)) {
      index -= 1;
      this.setIndex(arr, index);
    }
    return index;
  }

  static _isIndexLegal(arr, index) {
    return !!arr.find((el) => el.id === index);
  }
}

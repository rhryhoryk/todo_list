import TaskList from './components/task-list';

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
    if (arr.findIndex((el) => el.id === index) > -1) {
      return false;
    }
    return true;
  }

  static moveElement(evtdown, element, parent) {
    let coordinate;
    if (element instanceof TaskList) {
      coordinate = evtdown.clientX;
    } else {
      coordinate = evtdown.clientY;
    }
    element.getElement().style.zIndex = `1`;

    const onMouseMove = (evtmove) => {
      evtmove.preventDefault();
      let shift;
      if (element instanceof TaskList) {
        shift = coordinate - evtmove.clientX;
      } else {
        shift = coordinate - evtmove.clientY;
      }

      if (element instanceof TaskList) {
        element.getElement().style.right = `${shift}px`;
      } else {
        element.getElement().style.bottom = `${shift}px`;
      }
    };

    const onMouseUp = (evtup) => {
      evtup.preventDefault();
      let distance;
      let arr;
      let index;
      let elements;

      if (element instanceof TaskList) {
        distance = element.getElement().style.right.slice(0, -2);
        arr = Array.from(evtup.currentTarget.parentElement.querySelectorAll(`.taskList`));
        index = arr.findIndex((El) => El.id === evtup.currentTarget.id);
        elements = evtup.currentTarget.parentElement.querySelectorAll(`.taskList`);
      } else {
        distance = element.getElement().style.bottom.slice(0, -2);
        arr = Array.from(evtup.currentTarget.parentElement.querySelectorAll(`.card`));
        index = arr.findIndex((El) => El.id === evtup.currentTarget.id);
        elements = evtup.currentTarget.parentElement.querySelectorAll(`.card`);
      }

      const toZero = () => {
        if (element instanceof TaskList) {
          element.getElement().style.right = `0px`;
        } else {
          element.getElement().style.bottom = `0px`;
        }
      };

      const isFirst = () => {
        return element.getElement().id === `0`;
      };

      const isLast = () => {
        return elements.length - 1 === index;
      };

      if (distance <= 0) {
        if (distance >= -50 || isLast()) {
          toZero();
        } else {
          const replaced = parent.replaceChild(elements[index], elements[index + 1]);
          parent.insertBefore(replaced, elements[index]);
          toZero();
        }
      }

      if (distance > 0) {
        if (distance < 50 || isFirst()) {
          toZero();
        } else {
          const replaced = parent.replaceChild(elements[index], elements[index - 1]);
          elements[index].after(replaced);
          toZero();
        }
      }

      element.getElement().style.zIndex = `0`;
      element.getElement().removeEventListener(`mousemove`, onMouseMove);
      element.getElement().removeEventListener(`mouseup`, onMouseUp);
    };

    element.getElement().addEventListener(`mousemove`, onMouseMove);
    element.getElement().addEventListener(`mouseup`, onMouseUp);
  }
}

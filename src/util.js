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

  static setIndex(length) {
    let index;
    if (!length) {
      index = 0;
    } else {
      index = length;
    }
    return index;
  }

  static resetIndex(arr) {
    arr.forEach((el, index) => {
      if (Object.prototype.hasOwnProperty.call(el, `listID`)) {
        el.listID = index;
      } else {
        el.cardID = index;
      }
    });
  }

  static resetListStorage(arr) {
    localStorage.clear();
    arr.forEach((el) => {
      const obj = {
        listID: el.listID,
        h3: el.h3,
        cardAmount: el.cardAmount,
        cards: el.cards,
      };
      const keyName = `${obj.listID}--list`;
      localStorage.setItem(keyName, JSON.stringify(obj));
    });
  }

  static resetCardStorage(listID, arr) {
    const obj = JSON.parse(localStorage.getItem(`${listID}--list`));
    obj.cards = arr;
    localStorage.setItem(`${listID}--list`, JSON.stringify(obj));
  }

  static resetNodeIndex(col) {
    for (let i = 0; i < col.length; i += 1) {
      col[i].id = i;
    }
  }

  static moveElement(evtdown, element, parent, dataArr) {
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

      const changeStorage = (listID) => {
        if (element instanceof TaskList) {
          this.resetListStorage(dataArr);
        } else {
          this.resetCardStorage(listID, dataArr);
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
          [elements[index].id, elements[index + 1].id] = [elements[index + 1].id, elements[index].id];
          [dataArr[index], dataArr[index + 1]] = [dataArr[index + 1], dataArr[index]];
          this.resetIndex(dataArr);
          const parentID = elements[index].parentElement.id;
          changeStorage(parentID);
          toZero();
        }
      }

      if (distance > 0) {
        if (distance < 50 || isFirst()) {
          toZero();
        } else {
          const replaced = parent.replaceChild(elements[index], elements[index - 1]);
          elements[index].after(replaced);
          [elements[index].id, elements[index - 1].id] = [elements[index - 1].id, elements[index].id];
          [dataArr[index], dataArr[index - 1]] = [dataArr[index - 1], dataArr[index]];
          this.resetIndex(dataArr);
          const parentID = elements[index].parentElement.id;
          changeStorage(parentID);
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

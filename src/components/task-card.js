import Component from './component';

const createCardTemplate = (index, text) => {
  return (
    `<li class="card card--${index}" id="${index}">
      <button class="button button--service button--edit">&#128394;</button>
      <p class="card__text">${text}</p>
    </li>`
  );
};

export default class TaskCard extends Component {
  constructor(index, text) {
    super();
    this._index = index;
    this._text = text;
  }

  getTemplate() {
    return createCardTemplate(this._index, this._text);
  }

  onEditButoonClick(handler) {
    this.getElement().querySelector(`.button--edit`).addEventListener(`click`, handler);
  }

  onMouseDown(handler) {
    this.getElement().addEventListener(`mousedown`, handler);
  }
}

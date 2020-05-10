import Component from './component.js';

const createCardTemplate = (text) => {
  return (
    `<li class="card">
      <button class="button button--service button--edit">&#128394;</button>
      <p class="card__text">${text}</p>
    </li>`
  )
}

export default class TaskCard extends Component {
  constructor(text) {
    super();
    this._text = text;
  }

  getTemplate() {
    return createCardTemplate(this._text)
  }
}
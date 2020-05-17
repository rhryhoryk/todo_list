import NewButton from '../components/new-button.js';
import AddListBlocktMaker from '../controllers/add--list--block--maker.js';
import AddCardBlockMaker from '../controllers/add--card--block-maker.js';


export const app = document.querySelector(`.app`);

export class NEWButtonMaker {
  constructor() {}

  renderNewButton(type, parent) {
    const button = new NewButton(type);
    button.onNewButtonClick(this._renderBlock);
    parent.append(button.getElement());
  }

  _renderBlock(evt) {
    let parent = app;
    let block = new AddListBlocktMaker();

    if (evt.target.classList.contains(`button--card`)) {
      parent = evt.target.parentElement;
      block = new AddCardBlockMaker(parent)
    }

    this.remove();
    block.render(parent);
  }
}
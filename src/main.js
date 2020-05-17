import {NEWButtonMaker, app} from './controllers/add--new--button--maker.js';

class App {
  constructor() {}

  start () {
    const button = new NEWButtonMaker();
    button.renderNewButton(`list`, app)
  }
}

const application = new App();
application.start();
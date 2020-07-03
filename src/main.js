
import BoardController from './controllers/board--controller';

class App {
  constructor() {
    this.board = new BoardController();
  }

  start() {
    this.board.start();
    // localStorage.clear();
  }
}

const application = new App();
application.start();

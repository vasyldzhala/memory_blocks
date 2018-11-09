import Game from './js/game';
import GameOverModal from './js/game-over-modal';
import LoginUserModal from './js/login-modal';
import Http from './js/http';

const user = {
  id: 0,
  name: ''
};

const gameParams = {
  fieldsizeId: 2,
  opponentId: 1
};

const game = new Game();

// const http = new Http();
// http.loadAllResults().then(resp => console.log(resp));
// http.loadAllUsers().then(resp => console.log(resp));


document.addEventListener('gameIsOver', (event) => {
  gameOverHundler(event.detail);
});

document.querySelector('#new-game-button').addEventListener('click', (event) => {
  event.preventDefault();
  startNewGame();
});

const startNewGame = () => {
  game.startNewGame();
};

document.querySelector('#login-button').addEventListener('click', (event) => {
  event.preventDefault();
  loginUserHundler(user);
});

document.addEventListener('loginUser', event => {
  event.preventDefault();
  loginUserEventHundler(event.detail);
});

const loginUserEventHundler = resp => {
  Object.assign(user, resp);
  document.querySelector('#login-button').innerHTML = `
    <i class="fas fa-user-check"></i>
    <span>Hello, ${user.name}!</span>        
`
};

const loginUserHundler = user => {
  const loginUserModal = new LoginUserModal({}, user);
};

const gameOverHundler = (results) => {
  const message = GameOverModal.parseResults(results);

  const modal = new GameOverModal({content: message});

  document.querySelector('.confirm-btn').addEventListener('click', (event) => {
    event.preventDefault();
    startNewGame();
    modal.closeModal(modal.modalEl);
  });
};



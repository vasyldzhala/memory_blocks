import Game from './js/game';
import GameOverModal from './js/game-over-modal';
import LoginUserModal from './js/login-modal';
import Http from './js/http';
import SetSettingsModal from './js/set-settings-modal';
import BestResultsModal from './js/best-results-modal';

const user = {
  id: 0,
  name: ''
};

const gameSettings = {
  fieldsizeId: 2,
  opponentId: 1
};

const game = new Game(gameSettings);

// const http = new Http();
// http.loadAllResults().then(resp => console.log(resp));
// http.loadAllUsers().then(resp => console.log(resp));


document.addEventListener('gameIsOver', event => {
  event.preventDefault()
  gameOverHandler(event.detail);
});

document.querySelector('#new-game-button').addEventListener('click', event => {
  event.preventDefault();
  startNewGame(gameSettings);
});

document.querySelector('#login-button').addEventListener('click', event => {
  event.preventDefault();
  loginUserHandler(user);
});

document.addEventListener('loginUser', event => {
  event.preventDefault();
  loginUserEventHandler(event.detail);
});

document.querySelector('#settings-button').addEventListener('click', event => {
  event.preventDefault();
  setSettings(gameSettings);
});

document.querySelector('#results-button').addEventListener('click', event => {
  event.preventDefault();
  showResultsButtonHandler(gameSettings, user);
});


document.addEventListener('setGameSettings', event => {
  event.preventDefault();
  Object.assign(gameSettings, event.detail);
  startNewGame(gameSettings);
});

const startNewGame = (gameSettings) => {
  game.startNewGame(gameSettings);
};

const setSettings = settings => {
  const setSettingsModal = new SetSettingsModal({}, settings);
};

const loginUserEventHandler = resp => {
  Object.assign(user, resp);
  document.querySelector('#login-button').innerHTML = `
    <i class="fas fa-user-check"></i>
    <span>${user.name}</span>        
`
};

const loginUserHandler = user => {
  const loginUserModal = new LoginUserModal({}, user);
};

const gameOverHandler = (results) => {
  const message = GameOverModal.parseResults(results);
  message.concat(' ');

  const modal = new GameOverModal({content: message}, user);

  document.querySelector('.confirm-btn').addEventListener('click', (event) => {
    event.preventDefault();
    if ( document.forms.gameOverForm.isSaveResult.checked ) {
      console.log(user, gameSettings, results);
      const sendData = {
        user_id: user.id,
        fieldsize_id: gameSettings.fieldsizeId,
        opponent_id: gameSettings.opponentId,
        time: results.endTime - results.startTime,
        flips: results.flipped
      };
      console.log(sendData);
      const http = new Http();
      http.saveResult(sendData);
      console.log('Save my results!');
    }
    startNewGame(gameSettings);
    modal.closeModal(modal.modalEl);
  });
};

const showResultsButtonHandler = (gameSettings, user) => {
  const bestResultsModal = new BestResultsModal({}, gameSettings, user);
};




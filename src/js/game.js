import {cards} from "./cards";

export default class Game {

  constructor(params) {
    this.startNewGame(params);
  };

  startNewGame(params) {
    this.defaultParams = {
      cardsNumber: 15,
      playersNumber: 1,
      gameContainer: document.querySelector('#game-container'),
      stateBarContainer: document.querySelector('#state-bar')
    };
    this.params = Object.assign(this.defaultParams, params);
    this.init();
    this.params.gameContainer.addEventListener('click', e => {
      e.preventDefault();
      this.clickCardHundler(e);
    });
  };

  clickCardHundler({target}) {

    if (target.hasAttribute('data-code') && !target.classList.contains('show')) {

      const flipCard = () => {
        target.classList.toggle('show');
        target.dataset.ischecked = true;
        this.state.openCards.push(target);
        this.state.flipped++;
      };
      const getCardCode = (ind) => {
        return this.state.openCards[ind].dataset.code;
      };

      switch(this.state.stage)  {
        case 0:
          this.state.isGameProceed = true;
          this.setTimer();
          flipCard();
          this.state.stage = 2;
          this.state.messageInd = 1;
          break;
        case 1:
          this.state.openCards.forEach(el => el.classList.toggle('show'));
          this.state.openCards = [];
          flipCard();
          this.state.stage = 2;
          this.state.messageInd = 1;
          break;
        case 2:
          flipCard();
          this.state.stage = 1;
          this.state.messageInd = 2;
          if (getCardCode(0) === getCardCode(1)) {
            this.state.openCards.forEach(el => el.classList.add('close'));
            this.state.score--;
            this.state.messageInd = 3;
            if (this.state.score <= 0 ) {
              this.state.isGameProceed = false;
              this.gameOver();
            }
          }
          break;
      }
      this.showState();
    }
  }

  init() {
    this.state = {
      isGameProceed: false,
      isMessage: false,
      stage: 0,                         // 0 - init game, 1 - first flip, 2 - second flip
      score: this.params.cardsNumber,   // unclosed cards' number
      flipped: 0,                       // flips number
      openCards: [],
      messageInd: 0,
      gameMessage: [
        'Click card to start!',
        'Chose another one',
        'Try again! Click another card',
        'Congratulation! Try again!'
      ]
    };
    this.rend = {
      messageEl: this.params.stateBarContainer.querySelector('.hint'),
      timeEl: this.params.stateBarContainer.querySelector('.time'),
      scoreEl: this.params.stateBarContainer.querySelector('.score'),
      flippedEl: this.params.stateBarContainer.querySelector('.flipped')
    };
    if ( !this.state.isMessage ) { this.rend.messageEl.hidden = true; }
    this.rend.timeEl.innerHTML = `Time: 0 sec`;
    this.showState();
    this.dealCards();
  }

  showState() {
    this.rend.messageEl.innerHTML = this.showMessage(this.state.messageInd);
    this.rend.scoreEl.innerHTML = `${(this.params.cardsNumber - this.state.score) * 2} / ${this.params.cardsNumber * 2}`;
    this.rend.flippedEl.innerHTML = `Flipped: ${this.state.flipped}`;
  }

  showMessage(ind) {
    let str = '';
    if (this.state.isMessage) { str += this.state.gameMessage[ind]; }
    return str;
  }

  setTimer() {
    this.state.startTime = Date.now();
    const showSeconds = () => {
      const seconds = ((Date.now() - this.state.startTime) * 1e-3).toFixed();
      if ( this.state.isGameProceed && !isNaN(parseFloat(seconds)) && isFinite(seconds) ) {
        this.rend.timeEl.innerHTML = `Time: ${seconds} sec`;
      }
    };
    this.state.timer = setInterval(showSeconds, 1000);
  }

  stopTimer() {
    console.log('stop timer!');
    this.state.endTime = Date.now();
    clearInterval(this.state.timer);
  }

  gameOver() {
    this.stopTimer();
    const gameIsOverEvent = new CustomEvent('gameIsOver', {
      bubbles: true,
      detail: this.state
    });
    document.dispatchEvent(gameIsOverEvent);
  }

  dealCards() {
    const { gameContainer } = this.params;
    let cardsMixed = cards.slice(0, this.params.cardsNumber);
    cardsMixed = cardsMixed
      .concat(cardsMixed)
      .sort((x, y) => Math.random() - 0.5);

    let gameTemplate = ``;

    for (let i = 0; i < cardsMixed.length; i++) {
      gameTemplate += `
      <div class="card">
        <button data-code="${cardsMixed[i]}" data-ischecked="false">
          <i class="fas">&#x${cardsMixed[i]};</i>
        </button>
      </div>      
      `;
    }
    gameContainer.innerHTML = gameTemplate;
  }

};

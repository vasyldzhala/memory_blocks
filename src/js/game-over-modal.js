import Modal from './modal';

export default class GameOverModal extends Modal {

  constructor(params) {
    const defaultParams = {
      name: 'gameOver',
      class: 'game-over-modal',
      logo: '<i class="fas fa-award"></i>',
      close: '<i class="far fa-times-circle"></i>',
      title: 'Congratulations! The Game Is Over!',
      content: '',
      confirmBtn: 'Start New Game!'
    };

    const paramsAll = Object.assign(defaultParams, params);

    super(paramsAll);

    super.init();
  }

  static parseResults(results) {
    return `
<h3>
  Your results are: 
</h3>
<p>Time: ${((results.endTime - results.startTime) * 1e-3).toFixed(2)}</p>
<p>Total flips: ${results.flipped}</p>
  
  `;

  }

}

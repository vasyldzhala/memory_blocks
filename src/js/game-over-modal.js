import Modal from './modal';

export default class GameOverModal extends Modal {

  constructor(params, user) {

    const formContent = `
<label for="isSaveResult">Save results</label>
<input type="checkbox" name="isSaveResult"><br>
<span class="warning" hidden>for save results you have to be checked in</span><br>    
    `;

    const defaultParams = {
      name: 'gameOverForm',
      class: 'game-over-modal',
      logo: '<i class="fas fa-award"></i>',
      close: '<i class="far fa-times-circle"></i>',
      title: 'Congratulations! The Game Is Over!',
      content: '',
      formContent: formContent,
      confirmBtn: 'Start New Game!'
    };

    const paramsAll = Object.assign(defaultParams, params);

    super(paramsAll);

    super.init();

    this.setFormHandler(user);

  }

  setFormHandler(user) {
    if ( !user.id ) {
      this.modalEl.querySelector('.warning').hidden = false;
      this.modalEl.querySelector('input[type="checkbox"]').disabled = true;
    }
  };

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

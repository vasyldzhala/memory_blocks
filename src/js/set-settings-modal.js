import Modal from './modal';

export default class SetSettingsModal extends Modal {

  constructor (params, gameSettings) {

    const formContent = `
<fieldset class="radiogroup">
  <legend>Set field's size</legend>
  <ul class="radio">
    <li>
    <input type="radio" name="fieldSizeId" id="fieldSizeId1" value="1" />
    <label for="fieldSizeId1">beginner - 4 x 4</label>
    </li>
    <li>
    <input type="radio" name="fieldSizeId" id="fieldSizeId2" value="2" />
    <label for="fieldSizeId2">proficient - 6 x 5</label>
    </li>
    <li>
    <input type="radio" name="fieldSizeId" id="fieldSizeId3" value="3" />
    <label for="fieldSizeId3">expert - 8 x 6</label>
    </li>
  </ul>
</fieldset>

<fieldset class="radiogroup" hidden>
  <legend>Who is the opponent?</legend>
  <ul class="radio">
    <li>
    <input type="radio" name="opponentId" id="opponentId1" value="1" />
    <label for="opponentId1">one player</label>
    </li>
    <li>
    <input type="radio" name="opponentId" id="opponentId2" value="2" />
    <label for="opponentId2">vs Robot</label>
    </li>
    <li>
    <input type="radio" name="opponentId" id="opponentId3" value="3" />
    <label for="opponentId3">two players</label>
    </li>
  </ul>
</fieldset>

    `;

    const defaultParams = {
      name: 'setSettingsForm',
      class: 'set-settings-modal',
      logo: '<i class="fas fa-sliders-h"></i>',
      close: '<i class="far fa-times-circle"></i>',
      title: 'Settings',
      formContent: formContent,
      confirmBtn: 'OK'
    };

    const paramsAll = Object.assign(defaultParams, params);

    super(paramsAll);
    super.init();
    this.setFormEventHandlers(gameSettings);
  }

  setFormEventHandlers (gameSettings) {
    this.modalEl.querySelector(`#fieldSizeId${gameSettings.fieldsizeId}`).checked = true;
    this.modalEl.querySelector(`#opponentId${gameSettings.opponentId}`).checked = true;

    const generateSetGameSettingsEvent = settings => {
      const setGameSettingsEvent = new CustomEvent('setGameSettings', {
        bubbles: true,
        detail: settings
      });
      document.dispatchEvent(setGameSettingsEvent);
    };

    this.confirmBtn = this.modalEl.querySelector('.confirm-btn');
    this.confirmBtn.addEventListener('click', e => {
      e.preventDefault();
      const fielsizeValue = this.modalEl.querySelector('input[name="fieldSizeId"]:checked').value;
      gameSettings.fieldsizeId = parseInt(fielsizeValue);
      const opponentValue = this.modalEl.querySelector('input[name="opponentId"]:checked').value;
      gameSettings.opponentId = parseInt(opponentValue);
      generateSetGameSettingsEvent(gameSettings);
      this.closeModal(this.modalEl);
    });
  }

}

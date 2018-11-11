import Modal from './modal';
import Http from './http';

export default class BestResultsModal extends Modal {

  constructor(params, gameSettings, user) {

    const defaultParams = {
      name: 'BestResultsForm',
      class: 'best-results-modal',
      logo: '<i class="fas fa-trophy"></i>',
      close: '<i class="far fa-times-circle"></i>',
      title: 'Best Results',
      content: '',
      formContent: '',
      confirmBtn: 'OK'
    };

    const paramsAll = Object.assign(defaultParams, params);

    super(paramsAll);
    super.init();
    this.http = new Http();

    this.getResults(gameSettings, user).then( resp => console.log(resp));

  }

  getResults(gameSettings, user) {
    return Promise.all([this.http.loadAllUsers(), this.http.loadAllResults()])
        .then( ([users, results]) => {
          return [
            users,
            results.filter( item => {
              return ( item.fieldsize_id == gameSettings.fieldsizeId
                && item.opponent_id == gameSettings.opponentId )
            })
          ]
      });
  }


}

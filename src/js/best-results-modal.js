import Modal from './modal';
import Http from './http';

export default class BestResultsModal extends Modal {

  constructor (params, gameSettings, user) {

    const defaultParams = {
      name: 'BestResultsForm',
      class: 'best-results-modal',
      logo: '<i class="fas fa-trophy"></i>',
      close: '<i class="far fa-times-circle"></i>',
      title: 'Best Results',
      content: 'Best Results Tables',
      formContent: '',
      confirmBtn: 'OK'
    };

    const paramsAll = Object.assign(defaultParams, params);

    super(paramsAll);
    super.init();
    this.user = user;
    this.http = new Http();

    this.getResults(gameSettings).then( ([users, results]) => {
      this.renderTables(users, results);
    });

    this.setHandlers();

  }

  getResults (gameSettings) {
    return Promise.all([this.http.loadAllUsers(), this.http.loadAllResults()])
      .then( ([users, results]) => {
        return [
          users,
          results.filter( item => {
            return ( parseInt(item.fieldsize_id) === gameSettings.fieldsizeId
              && parseInt(item.opponent_id) === gameSettings.opponentId );
          })
        ];
      });
  }

  setHandlers () {
    this.modalEl.querySelector('.confirm-btn').addEventListener('click', event => {
      event.preventDefault();
      this.closeModal(this.modalEl);
    });
  }

  renderTables (users, results) {

    const getNameById = id => users.find(u => u.id === id).name;

    const rendTableBody = results => {
      let template = '';
      let i = 1;
      results.forEach( res => {
        template += (`
          <tr class="${ res.user_id === this.user.id ? 'user-own-res' : '' }">
            <td>${i++}</td>
            <td>${getNameById(res.user_id)}</td>
            <td>${(res.time * 1e-3).toFixed(2)}</td>
            <td>${res.flips}</td>
          </tr>        
        `);
      });
      return template;
    };

    const rendTable = header => {
      return `
<div class="results-table-container">
  <h3>${header}</h3>
  <table class="results-table">
    <tr>
      <th>No</th>
      <th>Name</th>
      <th>Time</th>
      <th>Flips</th>
    </tr>
    ${rendTableBody(results)}
    </table>
</div>    
    `;
    };

    let template = '';
    results.sort( (a, b) => parseInt(a.time) - parseInt(b.time) );
    template += rendTable('Best Time:');
    results.sort( (a, b) => parseInt(a.flips) - parseInt(b.flips) );
    template += rendTable('Best Flips:');

    this.modalEl.querySelector('.content').innerHTML = template;

  }


}

export default class Modal {

  constructor (params) {
    this.defaultParams = {
      name: '',
      class: '',
      logo: '<i class="far fa-window-maximize"></i>',
      close: '<i class="far fa-times-circle"></i>',
      title: 'Modal Window',
      content: '',
      formContent: '',
      confirmBtn: '<i class="fas fa-check-circle"></i>OK'
    };
    this.params = Object.assign(this.defaultParams, params);
  }

  init () {
    const modalTemplate = `
<div class="modal-window ${this.params.class}">
  <header class="fb-row fb-between">
    ${this.params.logo}
    <span>${this.params.title}</span>
    <button class="close-btn">
      ${this.params.close}
    </button>
  </header>

  <div class="main-container">
    <div class="fb-col fb-start main">
      ${ this.params.content ? `
      <div class="fb-col fb-start content">
        ${this.params.content}
      </div>
      ` : ''}
      <div class="confirm">
        <form action="" name="${this.params.name}">
          <div class="form-content">
            ${this.params.formContent}
          </div>
          <div class="form-confirm">
            <button class="cancel-btn">
              Cancel
            </button>
            <button class="confirm-btn">
              ${this.params.confirmBtn}
            </button>
          </div>

        </form>
      </div>
    </div>
    
  </div>


</div>
    `;

    const modalEl = document.createElement('div');
    modalEl.classList.add('modal');
    document.querySelector('body').appendChild(modalEl);
    modalEl.innerHTML = modalTemplate;

    modalEl.querySelector('.close-btn').addEventListener('click', event => {
      event.preventDefault();
      this.closeModal(modalEl);
    });

    modalEl.querySelector('.cancel-btn').addEventListener('click', event => {
      event.preventDefault();
      this.closeModal(modalEl);
    });

    this.modalEl = modalEl;

  }

  closeModal (el) {
    document.querySelector('body').removeChild(el);
  }

}

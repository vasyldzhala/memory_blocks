import Modal from './modal';
import Http from './http';

export default class LoginUserModal extends Modal {

  constructor (params) {

    const formContent = `
<label for="userLogin">Login:</label><br>
<input class="text-input" type="text" name="userLogin" required maxlength="20">
<span class="error" hidden="true">
	Invalid login!
</span><br>
<label for="userPassword">Password:</label><br>
<input class="text-input" type="password" name="userPassword" required maxlength="20">
<span class="error" hidden="true">
	Invalid password!
</span><br>
<label for="isNewUser">New User</label>
<input type="checkbox" name="isNewUser"><br>
<span class="error warning" id="warning"></span>

    `;

    const defaultParams = {
      name: 'loginUserForm',
      class: 'login-modal',
      logo: '<i class="fas fa-user-check"></i>',
      close: '<i class="far fa-times-circle"></i>',
      title: 'Please, login',
      formContent: formContent,
      confirmBtn: 'Login'
    };

    const paramsAll = Object.assign(defaultParams, params);

    super(paramsAll);
    super.init();
    this.setFormEventHandlers();
  }

  setFormEventHandlers () {
    this.confirmBtn = this.modalEl.querySelector('.confirm-btn');
    this.confirmBtn.addEventListener('click', e => {
      e.preventDefault();
      this.login();
    });
    this.modalEl.querySelectorAll('.text-input').forEach( el => {
      el.addEventListener('blur', e => {
        e.target.nextSibling.nextSibling.hidden = this.checkInput(e.target.value);
      });
    });
  }

  login () {
    const user = {};
    user.name = document.forms.loginUserForm.userLogin.value;
    user.password = document.forms.loginUserForm.userPassword.value;

    const respHandler = resp => {
      typeof resp === 'object' ?
        generateUserLoginEvent(resp) :
        showWarning(resp);
    };

    const generateUserLoginEvent = resp => {
      const loginUserEvent = new CustomEvent('loginUser', {
        bubbles: true,
        detail: resp
      });
      document.dispatchEvent(loginUserEvent);
      this.closeModal(this.modalEl);
    };

    const showWarning = resp => {
      this.modalEl.querySelector('#warning').innerHTML = resp;
    };

    const http = new Http();

    if ( document.forms.loginUserForm.isNewUser.checked ) {
      http.addUser(user).then(resp => respHandler(resp));
    } else  {
      http.loginUser(user).then(resp => respHandler(resp));
    }

  }

  checkInput (str) {
    return /^[0-9a-zA-Zа-яієїА-ЯЄЇІ]+$/u.test(str);
  }
}


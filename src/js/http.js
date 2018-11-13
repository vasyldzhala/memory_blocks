export default class Http {

  constructor () {
    this.baseUrl = 'https://mblocks.jala.in.ua/db';
  }

  ajaxRequest (method, url, sendData = null) {
    return new Promise( (resolve, reject) => {
      const req = new XMLHttpRequest();
      if (( method === 'GET' ) && !( sendData === null)) {
        url = `${url}?jsonData=${JSON.stringify(sendData)}`;
      }
      req.open(method, url, true);
      req.addEventListener('load', () => {
        if ( req.status === 200 ) {
          resolve(req.response);
        } else {
          const error = new Error(req.statusText);
          error.code = req.status;
          reject(error);
        }
      }, false);
      req.addEventListener('error', () => {
        reject(new Error('Network Error'));
      }, false);
      if (( method === 'POST' ) && !( sendData === null ))  {
        req.send(`jsonData=${JSON.stringify(sendData)}`);
      } else {
        req.send();
      }
    });
  }

  loadResources (script) {
    return this.ajaxRequest('GET', `${this.baseUrl}/${script}`)
      .then(resp => JSON.parse(resp), reason => reason);
  }

  loadAllResults () {
    return this.loadResources('readresults.php');
  }

  loadAllUsers () {
    return this.loadResources('readusers.php');
  }

  addUser (user) {
    return this.ajaxRequest('GET', `${this.baseUrl}/adduser2.php`, user)
      .then(resp => JSON.parse(resp), reason => reason );
  }

  loginUser (user) {
    return this.ajaxRequest('GET', `${this.baseUrl}/confirmuser.php`, user)
      .then(resp => JSON.parse(resp), reason => reason);
  }

  saveResult (result) {
    return this.ajaxRequest('GET', `${this.baseUrl}/saveresult.php`, result)
      .then(resp => resp, reason => reason);
  }
}

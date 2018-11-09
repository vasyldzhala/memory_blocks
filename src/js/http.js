export default class Http {

  constructor(params) {
    // this.baseUrl = 'http://localhost:80/camp1/mblocks/db';
    this.baseUrl = 'http://mblocks.jala.in.ua/db';
  };

  ajaxRequest(method, url, sendData = null) {
    return new Promise( (resolve, reject) => {
      const req = new XMLHttpRequest();
      if (( method === 'GET' ) && !( sendData === null)) {
        url = `${url}?jsonData=${JSON.stringify(sendData)}`;
      }
      console.log(`ajaxRequest, method=${method}, url=${url}`);
      req.open(method, url, true);
      // req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
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
        reject(new Error("Network Error"));
      }, false);
      if (( method === 'POST' ) && !( sendData === null ))  {
        req.send(`jsonData=${JSON.stringify(sendData)}`);
        console.log(`sendData = ${JSON.stringify(sendData)}`);
      } else {
        req.send();
      }
    });
  }

  loadResources(script) {
    return this.ajaxRequest('GET', `${this.baseUrl}/${script}`)
      .then(resp => JSON.parse(resp),
            reason => console.log(`Rejected: ${reason}`)
      )
  }
  loadAllResults() {
    return this.loadResources('readresults.php');
  }

  loadAllUsers() {
    return this.loadResources('readusers.php');
  }

  addUser(user) {
    return this.ajaxRequest('GET', `${this.baseUrl}/adduser2.php`, user)
      .then(resp => JSON.parse(resp),
        reason => console.log(`Rejected: ${reason}`)
      )
  }

  loginUser(user) {
    return this.ajaxRequest('GET', `${this.baseUrl}/confirmuser.php`, user)
      .then(resp => JSON.parse(resp),
        reason => console.log(`Rejected: ${reason}`)
      )
  }

  saveResult(sendData) {
    this.ajaxRequest('GET', `${this.baseUrl}/saveresult.php`, sendData)
      .then(
        respValue => {
          console.log(`Response = ${respValue}`);
          const resultsAreSavedEvent = new CustomEvent("resultsAreSaved", {
            bubbles: true,
            detail: respValue
          });
          document.dispatchEvent(resultsAreSavedEvent);
         },
        reason => {
          console.log(`Rejected: ${reason}`);
        }
      );
  }
}

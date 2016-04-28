(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  let zrickr = document.querySelector('#app');

  // Sets app default base URL
  zrickr.baseUrl = '/';
  if (window.location.port === '') {  // if production
    // Uncomment zrickr.baseURL below and
    // set zrickr.baseURL to '/your-pathname/' if running from folder in production
    // zrickr.baseUrl = '/polymer-starter-kit/';
  }

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  zrickr.addEventListener('dom-change', () => {
    let zrickrAuth = document.querySelector('zrickr-auth');
    let currentElement;

    //Main Switched Event
    zrickrAuth.addEventListener('user-changed', (event) => {
      if (currentElement) {
        currentElement.remove();
        currentElement = null;
      }

      if (event.detail.value) {
        currentElement = document.createElement('zrickr-app');
        currentElement.user = zrickr.user;
        currentElement.location = zrickr.location;
      }
      else {
        currentElement = document.createElement('zrickr-login');
        /*document.body.style.backgroundImage = "url('../images/background.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "100% 100%";*/
      }
      document.body.appendChild(currentElement);
    });

    //Show Message
    window.addEventListener('message-opened', (event) => {
      let message = document.createElement('zrickr-message');
      let text = document.createAttribute('text');
      text.value = event.detail.message;
      message.setAttributeNode(text);
      let type = document.createAttribute('type');
      if (event.detail.error) {
        type.value = 'error'
        message.setAttributeNode(type);
      }
      else if (event.detail.success) {
        type.value = 'success'
        message.setAttributeNode(type);
      }
      document.body.appendChild(message);
      message.open();
    });
    //Remove Message from DOM
    window.addEventListener('message-closed', (event) => {
      let message = document.querySelector('zrickr-message');
      if (message) {
        message.remove();
      }
    });

    //User Login Events
    window.addEventListener('login-tapped', (event) => {
      let zrickrLogin = event.detail;
      zrickrAuth.provider = zrickrLogin.provider;
      zrickrAuth.email = zrickrLogin.email;
      zrickrAuth.password = zrickrLogin.password;
      zrickrAuth.login();
    });
    window.addEventListener('signin-tapped', (event) => {
      let zrickrLogin = event.detail;
      zrickrAuth.provider = zrickrLogin.provider;
      zrickrAuth.email = zrickrLogin.email;
      zrickrAuth.password = zrickrLogin.password;
      zrickrAuth.createUser();
    });
    window.addEventListener('reset-password-tapped', (event) => {
      zrickrAuth.email = event.detail.email;
      zrickrAuth.resetPassword();
    });

    //User App Events
    window.addEventListener('logout-tapped', (event) => {
      zrickrAuth.logout();
    });
    window.addEventListener('change-password-tapped', (event) => {
      let zrickr = event.detail;
      let infoUser = zrickr.user.password;
      zrickrAuth.email = infoUser.email;
      zrickrAuth.changePassword(zrickr.oldPassword, zrickr.newPassword);
    });
    window.addEventListener('signout-tapped', (event) => {
      zrickrAuth.removeUser();
    });
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', () => {
    // imports are loaded and elements have been registered
  });

})(document);

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  let zrickrApp = document.querySelector('#app');

  // Sets app default base URL
  zrickrApp.baseUrl = '/';
  if (window.location.port === '') {  // if production
    // Uncomment zrickrApp.baseURL below and
    // set zrickrApp.baseURL to '/your-pathname/' if running from folder in production
    // zrickrApp.baseUrl = '/polymer-starter-kit/';
  }

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  zrickrApp.addEventListener('dom-change', () => {
    let userAuth = document.querySelector('user-auth');
    let zrickrUser;
    let currentElement;

    //Main Switched Event
    userAuth.addEventListener('user-changed', (event) => {
      if (currentElement) {
        currentElement.remove();
        currentElement = null;
      }

      if (event.detail.value) {
        currentElement = document.createElement('zrickr-app');
        zrickrUser = zrickrApp.user;
      }
      else {
        currentElement = document.createElement('zrickr-login');
      }

      document.body.appendChild(currentElement);
    });

    window.addEventListener('input', (event) => {
    });

    window.addEventListener('change', (event) => {
    });

    userAuth.addEventListener('message-changed', (e) => {
      console.log("Message UserAuth changed " + e.detail.value);
    });

    //User Login Events
    window.addEventListener('login-tapped', (event) => {
      let zrickrLogin = event.detail;
      userAuth.provider = zrickrLogin.provider;
      userAuth.email = zrickrLogin.email;
      userAuth.password = zrickrLogin.password;
      console.log("auth-email ", zrickrLogin.email);
      userAuth.login();
      console.log("MESSAGE", userAuth.message)
    });
    window.addEventListener('signin-tapped', (event) => {
      let zrickrLogin = event.detail;
      userAuth.provider = zrickrLogin.provider;
      userAuth.email = zrickrLogin.email;
      userAuth.password = zrickrLogin.password;
      userAuth.createUser();
    });
    window.addEventListener('reset-password-tapped', (event) => {
      userAuth.email = event.detail.email;
      userAuth.resetPassword();
    });

    //User App Events
    window.addEventListener('logout-tapped', (event) => {
      userAuth.logout();
    });
    window.addEventListener('change-password-tapped', (event) => {
      let zrickrApp = event.detail;
      userAuth.email = zrickrUser.password.email;
      userAuth.changePassword(zrickrApp.oldPassword, zrickrApp.newPassword);
    });
    window.addEventListener('signout-tapped', (event) => {
      userAuth.removeUser();
    });

  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', () => {
    // imports are loaded and elements have been registered
  });

})(document);

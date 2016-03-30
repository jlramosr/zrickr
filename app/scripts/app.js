(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  let myApp = document.querySelector('#app');

  // Sets app default base URL
  myApp.baseUrl = '/';
  if (window.location.port === '') {  // if production
    // Uncomment myApp.baseURL below and
    // set myApp.baseURL to '/your-pathname/' if running from folder in production
    // myApp.baseUrl = '/polymer-starter-kit/';
  }

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  myApp.addEventListener('dom-change', () => {
    let authLogin = document.querySelector('auth-login');
    let currentElement;

    authLogin.addEventListener('user-changed', (event) => {
      if (currentElement) {
        currentElement.remove();
        currentElement = null;
      }

      if (event.detail.value) {
        currentElement = document.createElement('zrickr-app');
      } else {
        currentElement = document.createElement('zrickr-login');
      }

      document.body.appendChild(currentElement);
    })
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', () => {
    // imports are loaded and elements have been registered
  });

})(document);

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
    let userAuth = document.querySelector('user-auth');
    let currentElement;

    //Main Switched Event
    userAuth.addEventListener('user-changed', (event) => {
      if (currentElement) {
        currentElement.remove();
        currentElement = null;
      }

      if (event.detail.value) {
        currentElement = document.createElement('zrickr-app');
        currentElement.user = zrickr.user;
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
      userAuth.provider = zrickrLogin.provider;
      userAuth.email = zrickrLogin.email;
      userAuth.password = zrickrLogin.password;
      userAuth.login();
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
    window.addEventListener('add-item-tapped', (event) => {
      let newCollectionDialog = document.createElement('zrickr-collection-new-dialog');
      let id = document.createAttribute("id");
      id.value = "newCollectionDialog";
      newCollectionDialog.setAttributeNode(id);
      let optionSelected = event.detail.optionSelected;
      if (optionSelected) {
        let selectedItem = document.createAttribute("selected");
        selectedItem.value = optionSelected;
        newCollectionDialog.setAttributeNode(selectedItem);
      }
      document.body.appendChild(newCollectionDialog);
      newCollectionDialog.toggle();
    });
    window.addEventListener('new-collection-dialog-next-tapped', (event) => {
      /*let newNextCollectionDialog;
      let id = document.createAttribute("id");
      let optionSelected = event.detail.optionSelected;
      if (optionSelected == 'users-check') {
        newNextCollectionDialog = document.createElement('collection-new-users-dialog');
        id.value = "newUsersCollectionDialog";
      }
      else if (optionSelected == 'custom-check') {
        newNextCollectionDialog = document.createElement('collection-new-custom-dialog');
        id.value = "newCustomCollectionDialog";
      }
      if (newNextCollectionDialog) {
        newNextCollectionDialog.setAttributeNode(id);
        document.body.appendChild(newNextCollectionDialog);
        newNextCollectionDialog.toggle();
      }*/
    });
    window.addEventListener('logout-tapped', (event) => {
      userAuth.logout();
    });
    window.addEventListener('change-password-tapped', (event) => {
      let zrickr = event.detail;
      let infoUser = zrickr.user.password;
      userAuth.email = infoUser.email;
      userAuth.changePassword(zrickr.oldPassword, zrickr.newPassword);
    });
    window.addEventListener('signout-tapped', (event) => {
      userAuth.removeUser();
    });
    window.addEventListener('menu-tapped', (event) => {
      let mainPanel = document.querySelector('#mainPanel');
      mainPanel.openDrawer();
    });

  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', () => {
    // imports are loaded and elements have been registered
  });

})(document);

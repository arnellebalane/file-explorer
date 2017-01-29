const { ipcRenderer } = require('electron');


const app = new Vue({
  el: '#app',

  methods: {
    confirm: function() {
      ipcRenderer.send('delete-confirmed');
    },
    cancel: function() {
      ipcRenderer.send('delete-cancelled');
    }
  }
});


const keyCodes = {
  ESC: 27
};

document.addEventListener('keydown', e => {
  // Trigger app's "cancel" method when ESC key is pressed.
  if (e.keyCode === keyCodes.ESC) {
    app.cancel();
  }
});

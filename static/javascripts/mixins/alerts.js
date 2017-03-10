const DirectoryMixin = require('./directory');


const AlertsMixin = {

    mixins: [
        DirectoryMixin
    ],

    data: {
        alertMessage: null,
        alertKey: null,
        alertType: 'error',
        alertActions: []
    },

    methods: {
        /**
         *  @param {String} message The alert message to be shown.
         *  @param {String} key A unique key associated with the alert message.
         *      Used if we want to close an alert if it matches the key.
         *  @param {Object} options
         *      - type {String}: The alert type, will be added as a class to
         *        the alert message.
         **/
        alert(message, key, options={}) {
            this.alertMessage = message;
            this.alertKey = key;
            this.alertType = options.type || this.alertType;
            this.alertActions = options.actions || this.alertActions;

            if (options.block) {
                this.blocked = true;
            }

            Vue.nextTick(_ => {
                this.$refs.alert.querySelector('[autofocus]').focus();
            });
        },

        /**
         *  @param {String} key Only closes the alert message if its key
         *      matches this provided key.
         **/
        closeAlert(key) {
            if (arguments.length === 0 || key === this.alertKey) {
                this.alertMessage = null;
                this.alertKey = null;
                this.alertType = 'error';
                this.blocked = false;
            }
        }
    }

};


module.exports = AlertsMixin;

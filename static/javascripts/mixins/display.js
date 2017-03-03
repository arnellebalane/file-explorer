/**
 *  Vue mixin that deals with how directory items are being displayed.
 **/
const DisplayMixin = {

    data: {
        showHiddenFiles: true
    },

    methods: {
        /**
         *  Determines whether an item is going to be show or not.
         *  @param {Object} item An object representing an item in the directory.
         *  @return {Boolean} Whether the item should be shown or not.
         **/
        visible(item) {
            return (!this.showHiddenFiles && item.name[0] !== '.')
                || this.showHiddenFiles;
        },

        /**
         *  Gets an item's name from its path. The root directory "/" is
         *  represented as "ROOT".
         *  @param {String} itempath The path of the item whose name will be
         *    retrieved.
         *  @return {String} The name of the item based on its path.
         **/
        name(itempath) {
            return itempath.split('/').pop() || 'ROOT';
        },

        /**
         *  Toggles visibility of hidden files.
         **/
        toggleHiddenFiles() {
            this.showHiddenFiles = !this.showHiddenFiles;
        }
    },

    watch: {
        showHiddenFiles(value) {
            window.localStorage.setItem('show-hidden-files', value);
        }
    },

    created() {
        const showHiddenFiles = window.localStorage.getItem('show-hidden-files');
        this.showHiddenFiles = JSON.parse(showHiddenFiles);
    }

};


module.exports = DisplayMixin;

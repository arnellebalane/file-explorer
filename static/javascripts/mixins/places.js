const path = require('path');
const userhome = require('user-home');


/**
 *  Vue mixin to manage bookmarked "places" in the app sidebar.
 **/
const PlacesMixin = {

    data: {
        places: [
            path.join(userhome, 'Documents'),
            path.join(userhome, 'Pictures'),
            path.join(userhome, 'Music'),
            path.join(userhome, 'Videos')
        ]
    }

};


module.exports = PlacesMixin;

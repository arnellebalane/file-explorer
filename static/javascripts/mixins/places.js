const path = require('path');
const userhome = require('user-home');


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

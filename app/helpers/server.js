'use strict';

class Server {
    constructor () {}

    createRootRequire (roothPath) {
    	global.rootRequire = function(name) {
		    return require(roothPath + '/' + name);
		};
    }
}
module.exports = Server;
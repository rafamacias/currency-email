//import Auth from "./auth";

// TODO: change this
var logger = console;

class webSocket{

    constructor($rootScope) {
        this.$rootScope = $rootScope;
        this.socket = io();
        this.init();
    }

    init () {
        let host = window.location.origin;
        logger.log("WEBSOCKET connecting to ", host);

        this.socket.on('connect', () => {
            let sessionId = this.socket.io.engine.id;

            logger.log("WEBSOCKET connected with session id", sessionId);

            this.socket.emit('new_user', { id: sessionId });

            this.socket.on('new_connection', (data) => {
                if (data.user.id === sessionId) {
                    this.$rootScope.$apply(() => {
                        //Auth.setCurrentUser(data.user);
                        logger.log('Auth.setCurrentUser(data.user);');
                    });
                }
            });
        });

        this.socket.on('error', (error) => {
            logger.log("WEBSOCKET - error", error)
        });
    }

    emit (key, data) {
        logger.log("socket emit: ", key, data)
        this.socket.emit(key, data) 
    }

    on (key, callback) {

        this.socket.on(key, (data) => {

            logger.log("socket on: ", key, data)

            this.$rootScope.$apply(() => {
                callback(data)
            });
        });
    }
}

webSocket.$inject = ['$rootScope'];
export default webSocket;


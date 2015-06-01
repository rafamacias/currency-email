'use strict';
var chalk = require('chalk');
class Log {
    constructor(debug) {
        this._debug = debug;
        this._logFunction = {
            log: chalk.black,
            error: chalk.red,
            warn: chalk.yellow,
            info: chalk.blue
        };
    }

    log(msg, msgHeader) {
        this._consoleLog('log', msg, msgHeader);
    }

    /**
     * @ngdoc method
     * @name $log#info
     *
     * @description
     * Write an information message
     */
    info(msg, msgHeader) {
        this._consoleLog('info', msg, msgHeader);
    }

    /**
     * @ngdoc method
     * @name $log#warn
     *
     * @description
     * Write a warning message
     */
    warn(msg, msgHeader) {
        this._consoleLog('warn', msg, msgHeader);
    }

    /**
     * @ngdoc method
     * @name $log#error
     *
     * @description
     * Write an error message
     */
    error(msg, msgHeader) {
        this._consoleLog('error', msg, msgHeader);
    }

    debug(msg) {
        if (this._debug) {
            this._consoleLog('debug', msg, msgHeader);
        }
    }
    _formatError(arg) {
        if (arg instanceof Error) {
            if (arg.stack) {
                arg = (arg.message && arg.stack.indexOf(arg.message) === -1)
                    ? 'Error: ' + arg.message + '\n' + arg.stack
                    : arg.stack;
            } else if (arg.sourceURL) {
                arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
            }
        }
        return arg;
    }

    _noop() {
        // as the name implies
    }

    _consoleLog(type, msg, msgHeader) {

        if (msgHeader) {
            //chalk.cyan(`---- ${msgHeader} ----`);  
            console[type](`---- ${msgHeader} ----`);  
        }

        //this._logFunction[type](msg);
        console[type](msg);
    }
}
// /**
//  * This is the AngularJS $logProvider pulled out into a module that JSPM ES6
//  * can use as a dependency
//  * @ngdoc provider
//  * @name $logProvider
//  * @description
//  * Use the `$logProvider` to configure how the application logs messages
//  */
// class Log {
//     static factory(debug) {
//         return new Log(debug);
//     }

//     constructor(debug) {
//         this._debug = debug;
//     }

//     /**
//      * @ngdoc method
//      * @name $logProvider#debugEnabled
//      * @description
//      * @param {boolean=} flag enable or disable debug level messages
//      * @returns {*} current value if used as getter or itself (chaining) if used as setter
//      */
//     debugEnabled(flag) {
//         if (flag !== undefined && flag !== null) {
//             this._debug = flag;
//             return this;
//         } else {
//             return this._debug;
//         }
//     }

//     /**
//      * @ngdoc method
//      * @name $log#log
//      *
//      * @description
//      * Write a log message
//      */
//     log(...args) {
//         this._consoleLog('log', args);
//     }

//     /**
//      * @ngdoc method
//      * @name $log#info
//      *
//      * @description
//      * Write an information message
//      */
//     info(...args) {
//         this._consoleLog('info', args);
//     }

//     /**
//      * @ngdoc method
//      * @name $log#warn
//      *
//      * @description
//      * Write a warning message
//      */
//     warn(...args) {
//         this._consoleLog('warn', args);
//     }

//     /**
//      * @ngdoc method
//      * @name $log#error
//      *
//      * @description
//      * Write an error message
//      */
//     error(...args) {
//         this._consoleLog('error', args);
//     }

//     *
//      * @ngdoc method
//      * @name $log#debug
//      *
//      * @description
//      * Write a debug message
     
//     debug(...args) {
//         if (this._debug) {
//             this._consoleLog('debug', args);
//         }
//     }

//     _formatError(arg) {
//         if (arg instanceof Error) {
//             if (arg.stack) {
//                 arg = (arg.message && arg.stack.indexOf(arg.message) === -1)
//                     ? 'Error: ' + arg.message + '\n' + arg.stack
//                     : arg.stack;
//             } else if (arg.sourceURL) {
//                 arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
//             }
//         }
//         return arg;
//     }

//     _noop() {
//         // as the name implies
//     }

//     _consoleLog(type, args) {
//         let c = window.console || {},
//             logFn = c[type] || c.log || this._noop,
//             hasApply = false;

//         // Note: reading logFn.apply throws an error in IE11 in IE8 document mode.
//         // The reason behind this is that console.log has type "object" in IE8...
//         try {
//             hasApply = !!logFn.apply;
//         } catch (e) {
//         }

//         if (hasApply) {
//             var _args = [];
//             args.forEach((arg) => {
//                 _args.push(this._formatError(arg));
//             });
//             logFn.apply(c, _args);
//         }
//         else {
//             // we are IE which either doesn't have window.console => this is _noop and we do nothing,
//             // or we are IE where console.log doesn't have apply so we log at least first 2 args
//             logFn(args[0], args[1] == null ? '' : args[1]);
//         }

//     }

// }

module.exports = Log;

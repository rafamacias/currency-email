'use strict';
let nodemailer  = require('nodemailer');
let Helpers = rootRequire('helpers');
let logger = new Helpers().logger;


/**
*   Class EmailSender
*   
* 
*/
let className = 'EMAIL CLASS';  //DEBUG purposes
class Email {

    constructor (config) {
        this._transporter = nodemailer.createTransport(config.server);

        this.mailOptions = {
            from: config.from,
            subject: config.subject,
            text: config.defaultText,
            html: config.defaultText
        };
    }

    send (options, callback, fake) {
        // The own configuration for nodeMailer
        this.mailOptions.to         = options.to || '';
        this.mailOptions.subject    = options.subject || '';
        this.mailOptions.html       = options.body || '';
        this.mailOptions.text       = options.plaiText || '';

// TODO: check that addresses is an string of addresses separated by commas
// like: 'asd@example.com, info@exmp.com'
        if(options.to) {


            ///REMOVEEEEEEE
            if(!fake) {
                
                setTimeout(function() {
                    if(Math.random().toString().search('3333') != -1) { //An error that could occur sometimes
                        var err = new Error('FUCKKKKKKKKKKKKKKK An err');
                        logger.error('Error happened: ' + err);
                        return callback(err);
                    }

                    logger.log('FAKE EMAIL.EMAIL SENT TO :' + options.to);
                    callback(null, {response: 'fakeSent'});
                }, 500);
                return;
            }
            ///REMOVEEEEEEE

            return this._transporter.sendMail(this.mailOptions, function(err, info){
                if (err) {
                    logger.error(err, className);
                    return callback(err);
                }
                logger.log('Message sent: ' + info.response, className);
                logger.log(options.to);

                callback(null, info);
            });

        } else {
            logger.warn('There was not address to send', className);
        }
    }
}

module.exports = Email;

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

    send (options,addresses, body) {
        // The own configuration for nodeMailer
        this.mailOptions.to         = options.to || '';
        this.mailOptions.subject    = options.subject || '';
        this.mailOptions.html       = options.body || '';
        this.mailOptions.text       = options.plaiText || '';

// TODO: check that addresses is an string of addresses separated by commas
// like: 'asd@example.com, info@exmp.com'
        if(options.to) {


            ///REMOVEEEEEEE
            setTimeout(function() {
                if(Math.random().toString().search('3333') != -1) { //An error that could occur sometimes
                    var err = new Error('FUCKKKKKKKKKKKKKKK An err');
                    logger.error('Error happened: ' + err);
                    return;
                }

                logger.log('FAKE EMAIL.EMAIL SENT TO :' + options.to);
            }, 500);
            return;
            ///REMOVEEEEEEE

            return this._transporter.sendMail(this.mailOptions, function(err, info){
                if (err) {
                    logger.error(err, className);
                } else {
                    logger.log('Message sent: ' + info.response, className);
                    logger.log(options.to);
                }
            });

        } else {
            logger.warn('There was not address to send', className);
        }
    }
}

module.exports = Email;

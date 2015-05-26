'use strict';
let Helpers = rootRequire('helpers');
let logger = new Helpers().logger;

/**
*   Class Email Repository
*   
* 
*/

let className = 'EMAILMANAGER CLASS';  //DEBUG purposes
class EmailManager {

    constructor (emailSender) {
        this._emailSender = emailSender;
    }

    _createBody (currencyName, currencyRates) {
        let rates = '';
        for(let key in currencyRates) {
            rates += '<li>' + key + ': ' + currencyRates[key] + '</li>';
        }

        return `<h1>Hello</h1>
                <p>Your currency is: <span>${currencyName}</span></p>
                <p>And the rates for today are:</p>
                <ul>${rates}</ul>
                <p>Thanks for Using our services</p>`;
    }

    _createPlainText (currencyName, currencyRates) {
        let rates = '';
        for(let key in currencyRates) {
            rates += key + ': ' + currencyRates[key] + '\n';
        }

        return `Hello. \n
                Your currency is: <span>${currencyName}\n
                And the rates for today are:\n
                ${rates}\n
                Thanks for Using our services\n`;
    }


    send (to, currencyName, currencyRates) {

        let mailOptions = {
            to,
            plaintText: this._createPlainText(currencyRates, currencyName),
            body: this._createBody(currencyRates, currencyName)
        }; 

// TODO: check that addresses is an string of addresses separated by commas
// like: 'asd@example.com, info@exmp.com'
        if(to) {

            this._emailSender.send(mailOptions, function(err, info) {
                if (err) {
                    return logger.error(err, className);
                }
               
                logger.info('Message sent: ' + info.response, className);
                
            });

        } else {
            logger.info('There was not address to send', className);
        }
    }
}

module.exports = EmailManager;

// // create reusable transporter object using SMTP transport
// var transporter = nodemailer.createTransport(config.server);

// // NB! No need to recreate the transporter object. You can use
// // the same transporter object for all e-mails

// var emailFrom = config.from;
// var subject = config.subject;
// var defaultText = config.defaultText;

// // setup e-mail data with unicode symbols
// var mailOptions = {
//     from: emailFrom, // sender address
//     to: 'rafakol@gmail.com', // list of receivers
//     subject: subject, // Subject line
//     text: defaultText, // plaintext body
//     html: defaultText // html body
// };

// function send(addresses, text) {
//      if(text) {
//         mailOptions.text = text;
//         mailOptions.html = text;
//     }

//     // TODO: check that addresses is an string of addresses separated by commas
//     // like: 'asd@example.com, info@exmp.com'
//     if(addresses) {
//         mailOptions.to = addresses;
//     }

//     // send mail with defined transport object
//     console.log(mailOptions);

//     transporter.sendMail(mailOptions, function(err, info){
//         if(err){
//             console.log(err);
//         }else{
//             console.log('Message sent: ' + info.response);
//         }
//     });
// }

// function log(text, flag) {
//     if (flag) {
//         console.log(text);
//     }
// }
'use strict'
var uuid = require('node-uuid');

// Verification token model
var verificationTokenSchema = new Schema({
    _userId: {type: ObjectId, required: true, ref: 'User'},
    token: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now, expires: '4h'}
});

verificationTokenSchema.methods.createVerificationToken = function (done) {
    var verificationToken = this;
    var token = uuid.v4();
    verificationToken.set('token', token);
    verificationToken.save( function (err) {
        if (err) return done(err);
        return done(null, token);
      	console.log("Verification token", verificationToken);
    });
};

function verifyUser(token, callback) {

    verificationTokenModel.findOne({token: token}, function (err, doc){
        if (err) return done(err);

		let conditions = {_id: doc._userId};
		let update = {active: true};

        userModel.findOneAndUpdate(conditions, update, function (err, user) {
            if (err) return callback(err);

            callback(null, user);
        })
    })
};

var verificationTokenModel = mongoose.model('VerificationToken', verificationTokenSchema);
module.exports.verificationTokenModel = verificationTokenModel;
module.exports.verifyUser = verifyUser;




var verificationToken = new verificationTokenModel({_userId: user._id});

verificationToken.createVerificationToken(function (err, token) {
    if (err) return console.log("Couldn't create verification token", err);

    var message = {
        email: user.email,
        name: user.name,
        verifyURL: req.protocol + "://" + req.get('host') + "/confirmation/" + token};

    sendVerificationEmail(message, function (error, success) {
        if (error) {
            // not much point in attempting to send again, so we give up
            // will need to give the user a mechanism to resend verification
            console.error("Unable to send via postmark: " + error.message);
            return;
        }
        console.info("Sent to postmark for delivery")
    });
});

app.get("/verify/:token", function (req, res, next) {
    var token = req.params.token;

    verificationToken.verifyUser(token, function(err) {
        if (err) return res.redirect("verification-failure");
        res.redirect("verification-success");
    });
});



function sendVerificationEmail(message, callback) {
	console.log('fake email sending:');
	console.log(message);
	callback(null);
}




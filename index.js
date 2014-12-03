global._ = require('lodash');
global.t = require('moment');
global.bodyParser = require('body-parser');
global.nodemailer = require('nodemailer');

function run(appdir) {
    var express = require('express');
    var app = express();

    app.dir = process.cwd();
    // things to do on each request
    app.use(function(req, res, next) {
        // tell the client what firebase to use
        if (process.env.NODE_ENV === 'production') {
            res.cookie('rootRef', "https://matsi1.firebaseio.com/");
        } else {
            // development mode
            res.cookie('rootRef', "https://brilliant-heat-9512.firebaseio.com/");
            // log the request
            console.log(t().format('HH:MM'), req['method'], req.url, req.socket.bytesRead);
        }
        next();
    });
    // static files
    app.use(express.static(app.dir + '/public'));

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.post('/mail/user/:type', function(req, res) {
        console.log(req.body);
        var fellowName = req.body.firstName;
        var fellowMail = req.body.email;
        var mailMessage = req.body.message;
        var type = req.params.type;
        var adminMail = 'Andela ✔ <1testertest1@gmail.com>';
        //var data = req.params.fellow;
        console.log(type);
        //var emailAddress,emailBody;
        var _res = req.body;
        _res.type = type;
        var user = req.body.user;
        // create reusable transporter object using SMTP transport
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "1testertest1@gmail.com",
                pass: "p87654321"
            }
        });

        if (type) {
            type = parseInt(type, 10);
            switch (type) {
                case 1:
                    var mailOptions = {
                        from: adminMail, // sender address
                        to: fellowMail, // list of receivers
                        subject: 'Hello '+fellowName, // Subject line
                        html: "You have a pending request to be mentored, you can <a href='http://localhost:5555/myProfile'>View them here</a> <br> We hope you have a great time! <br> Team Matsi", // plaintext body
                    };
                    break;
                case 2:
                    var mailOptions = {
                        from: adminMail, // sender address
                        to: fellowMail, // list of receivers
                        subject: 'Hello '+fellowName, // Subject line
                        html: "Your signup request has been recieved and is being processed, until approved<br>you won't be able to login, please be patient as approvals are done by real humans <br>Thank you for your offer of service <br> Team Matsi", // plaintext body
                    };
                    break;
                case 3:
                    var mailOptions = {
                        from: adminMail, // sender address
                        to: fellowMail, // list of receivers
                        subject: 'Hello '+fellowName, // Subject line
                        html: 'Your mentor request has been accepted', // plaintext body
                    };
                    break;
                case 4:
                    var mailOptions = {
                        from: adminMail, // sender address
                        to: fellowMail, // list of receivers
                        subject: 'Hello '+ fellowName, // Subject line
                        html: 'Your mentor request has been rejected because '+ mailMessage, // plaintext body
                    };
                    break;
                case 5:
                    var mailOptions = {
                        from: adminMail, // sender address
                        to: fellowMail, // list of receivers
                        subject: 'Hello ✔', // Subject line
                        html: 'This is a mail from Case 2', // plaintext body
                    };
                    break;
            }
            console.log(mailOptions);
        };
        // create email options
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(e, i) {
            if (e) {
                console.log(e, "fgfhdhdhdhhd");
            } else {
                console.log('Message sent: ' + i.response);
            }
        });
        res.status(200).send(_res);
    });
    app.get('/*', function(req, res) {
        //res.header('Access-Control-Allow-Origin', '*');
        //res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
        console.log(req.body);
        res.sendFile('index.html', {
            root: './public/'
        });
    });
    // Standard error handling
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
    // Fire up server
    var server = app.listen(process.env.PORT || 5555, function() {
        console.log('Up Matsi Listening on port %d', server.address().port);
    });
}
run(process.cwd());

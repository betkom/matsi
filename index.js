global._ = require('lodash');
global.t = require('moment');
global.bodyParser = require('body-parser');
global.nodemailer = require('nodemailer');

function run(appdir) {
	var express = require('express');
	var app = express();

	app.dir = process.cwd();
	// things to do on each request
	app.use(function (req, res, next) {
		// tell the client what firebase to use
		if(process.env.NODE_ENV === 'production') {
		  res.cookie('rootRef', "https://matsi1.firebaseio.com/");
		}
		else {
			// development mode
			res.cookie('rootRef', "https://brilliant-heat-9512.firebaseio.com/");
			// log the request
		  console.log(t().format('HH:MM'), req['method'], req.url, req.socket.bytesRead);
		}
	  next();
	});
	// static files
	app.use(express.static(app.dir + '/public'));
	var sendMail = function(emailAddress,emailBody,callback) {
	};

	app.use(bodyParser.urlencoded({ extended: true }));

	app.post('/mail/user/:type',function(req, res){
		var type = req.params.type;
		//var emailAddress,emailBody;
		var _res = req.body;
		_res.type= type;
		var user = req.body.user;
		// create reusable transporter object using SMTP transport
		var transporter = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user: "1testertest1@gmail.com",
				pass: "p87654321"
			}
		});
		// create email options
		var mailOptions = {
			from: 'Andela ✔ <1testertest1@gmail.com>', // sender address
			to: 'terwase.gberikon@andela.co', // list of receivers
			subject: 'Hello ✔', // Subject line
			text: 'This is a mail from Case 1', // plaintext body
			//html: '<b>Hello world ✔</b>' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(e, i){
			if(e){
				console.log(e);
			}else{
				console.log('Message sent: ' + i.response);
			}
		});
		res.status(200).send(_res);
	});

	app.get('/*',function(req,res){
		console.log(req.body, "TEKRONDO!!'");
		res.sendFile('index.html',{root:'./public/'});
	});
	// Standard error handling
	app.use(function(err, req, res, next){
	  console.error(err.stack);
	  res.status(500).send('Something broke!');
	});

  // Fire up server
	var server = app.listen(process.env.PORT || 5555, function() {
	  console.log('Listening on port %d', server.address().port);
	});
}
run(process.cwd());

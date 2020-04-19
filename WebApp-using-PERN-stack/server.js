const config = require('./config')
const jwt = require('jsonwebtoken')

const express = require('express')
const app = express()
app.set('secret', config.SECRET)
const cors = require('cors')
app.use(cors())

const fileUpload = require('express-fileupload')
app.use(fileUpload())
app.use(express.static('build'))
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
var morgan = require('morgan')
app.use(morgan('dev'))
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB_DATABASE, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

//sequelize
const UserModel = require('./models/user')
const ReviewModel = require('./models/review')
const User = UserModel(sequelize, Sequelize)
const Review = ReviewModel(sequelize, Sequelize)

//ssl & https 
//var http = require('http');
var http = require('https');
app.use(express.static('static'));
const fs = require('fs');
var privateKey  = fs.readFileSync(__dirname + '/ssl/private.key');
var certificate = fs.readFileSync(__dirname + '/ssl/certificate.crt');
var credentials = { key: privateKey, cert: certificate };
var server = http.createServer(credentials, app);

 // ************************ Google Calendar  ***************** 
const readline = require('readline');
const {google} = require('googleapis');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials/*, callback*/) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  return oAuth2Client ;
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

app.post('/api/addEvent', cors(), function(request, response){ 
  console.log('add event')
  var eventTitle =   request.body.eventTitle ;
	var startDate = request.body.startDate ; 
  var endDate =   request.body.endDate ;

  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);

    authorize(JSON.parse(content)).then( auth => {
      fs.readFile(TOKEN_PATH, (err, token) => {
        auth.setCredentials(JSON.parse(token));
        const calendar = google.calendar({version: 'v3', auth});
        var event = {
          'summary': eventTitle,
          'start': {
            'dateTime': startDate,
            'timeZone': 'Asia/Taipei',
          },
          'end': {
            'dateTime': endDate,
            'timeZone': 'Asia/Taipei',
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10},
            ],
          },
        };
      
        calendar.events.insert({
          auth: auth,
          calendarId: config.CALENDAR_ID,
          resource: event,
        }, function(err, event) {
          if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            response.status( 500 ).json({ success: true, message: 'There was an error contacting the Calendar service: ' + err}) 
            //return;
          }
          console.log('Event created: %s', event);
          response.status( 200 ).json({ success: true, message: event}) 
        });
      })
    } )
    .catch((err) => {
      console.log(err) ; 
      return response.status( 500 ).json({ success: false, msg: err});
    });
  });
});
 // ************************ Google Calendar  END ***************** 

 // ************************  email verify  ***************** 
var nodemailer = require('nodemailer');

app.post('/api/register', cors(), function(request, response){ 
  console.log('register');
  var username =   request.body.account ;
	var password = request.body.password ; 
  var realname =   request.body.realname ;
	var gender =   request.body.gender ;
	var mobile =   request.body.mobile ;
	var address =   request.body.address ;
	var email =   request.body.email ;
  var note =   request.body.note ;
  var created_at = new Date();

  User.create({username:  username, password: password,  realname: realname, gender: gender, mobile: mobile, address: address,
               email: email, note: note, createdAt: created_at, type: 0, isActive: false   } ).then(user => {
            return response.status( 200 ).json({
              success: true,
              message: 'register success!',
            });
  }).catch((err) => {
    return response.status( 500 ).json({ msg: err});
  })

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.GOOGLE_MAIL_USER,
      pass: config.GOOGLE_MAIL_PASS
    },
  });
  
  var code = Buffer.from(password).toString('base64') ;
  console.log('code = ' + code ) ; 

  var mailOptions = {
    from: config.GOOGLE_MAIL_USER,
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'Activate：<a href='+ config.APP_HOST + '/api/checkCode?name='+ username +'&code='+ code + '"></a>'
  };
  
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

app.get('/api/checkCode', function (req, res) {
  console.log('checkCode')
  User.findOne(  {where:{ username: req.query.name} }  ).then(user => {
    if ( user !== undefined   ){ 
      var decode = Buffer.from(req.query.code, 'base64').toString('ascii')
      if(user.dataValues.password === decode) {
          User.update({ isActive: true } , { where: { username: req.query.name} }  ).then(user2 => {
            return res.status( 200 ).json({
              success: true,
              message: 'register success!',
            });
          }).catch((err) => {
            return res.status( 500 ).json({ msg: err});
          })
        } else {
          return res.status( 403 ).json({ msg: 'Active code error'});
        }
    } else {
      return res.status( 403 ).json({ success: false, message: 'No such user'}) 
    }
  }).catch((err) => {
    return res.status( 403 ).json({ success: false, message: 'No any User'}) 
  })
})
 // ************************ email verify END  ***************** 
 
app.post('/api/login', function (req, res) {
  console.log('req.body.name = ' + req.body.account)
  console.log('req.body.password = ' + req.body.password)
  User.findOne(  {where:{ username: req.body.account} }  ).then(user => {
    console.log('req.body.password = ' + user.dataValues.password)
        if ( user !== undefined && (user.dataValues.password === req.body.password) && user.dataValues.isActive  ){ 
          		let token = jwt.sign(user.dataValues, app.get('secret'), {
                expiresIn: 60//60*60*24
              })
              return res.status( 200 ).json({
                success: true,
                message: 'Enjoy your token',
                access_token: token,
                expires_in: 60//60*60*24
              });
        } else {
          return res.status( 403 ).json({ success: false, message: 'Authenticate failed. Wrong password'}) 
        }
      }
      ).catch((err) => {
        return res.status( 403 ).json({ success: false, message: err}) 
      })
})

app.get('/api/reviewCountAddThenGet', cors(), function(request, response){ 
	  console.log('reviewCountAddThenGet');
  
    Review.update({reviewcount:  Sequelize.literal('reviewcount + 1')},  {where: { id: 1} } ).then(review1 => {
            Review.findOne( {where: { id: 1 } } ).then(review => {
            let now = new Date().toLocaleString();
            response.status( 200 ).json({ msg: review.dataValues.reviewcount});}

          ).catch((err) => {
            return response.status( 500 ).json({ msg: err});
          })
        }
    ).catch((err) => {
      	return response.status( 500 ).json({ msg: err});
    })
});

app.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']
  
  if (token) {
    jwt.verify(token, app.get('secret'), function (err, decoded) {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'})
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    //req.decoded = decoded
        next()
    // return res.status(403).send({
    //   success: false,
    //   message: 'No token provided.'
    // })
  }
})

app.post('/api/upload', (req, res, next) => {
  let uploadFile = req.files.file
  const fileName = req.files.file.name
  uploadFile.mv(
    `${__dirname}/public/files/${fileName}`,
    function (err) {
      if (err) {
        return res.status(500).send(err)
      }

      res.json({
        file: `public/${req.files.file.name}`,
      })
    },
  )
})

server.listen( config.APP_PORT,"0.0.0.0",function(){
    console.log('server run at ' + config.APP_HOST  +  ':' + config.APP_PORT );
});




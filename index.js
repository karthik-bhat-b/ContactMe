var nodemailer = require('nodemailer');
const path = require('path');
var express = require('express');
var app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/contact', function (req, res) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'email_address',
           pass: 'password'
       }
   });

    const mailOptions = {
      to: 'itiskarthik98@gmail.com', // list of receivers separated by comma,
      subject: req.body.subject, // Subject line
      html: `${req.body.name}  <br>  ${req.body.ph} <br>  (${req.body.email}) <br><br> says: ${req.body.message}` 
    };

    transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        res.render('contact-failure');
      }
      else {
        res.sendFile(path.join(__dirname, 'sucess.html'));
      }
    });
  })

  app.listen(8080, function(){
    console.log('Your node js server is running at 8080');
  });
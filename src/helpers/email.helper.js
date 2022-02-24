const nodemailer = require("nodemailer");
const {google} = require ('googleapis')


const CLIENT_ID = "420934377541-04m0q8qsmnff5ncvsbsnh2pbt7i0lnp8.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URL = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04mHz-g6ZN9pACgYIARAAGAQSNgF-L9IrD6S_0a8_O68i4kIRp3OESuyYeu8RQ4rF6FXOQM3as17n_oIUiPu6JepSxqg-d0ntJQ"

// const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     auth: {
//       user: "else.kirlin32@ethereal.email",
//       pass: "vW1PSpPNNjQSpTS5Gg",
//     },
//   });
// const oAuth2Client =  new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
  const send = (info) => {
    return new Promise(async (resolve, reject) => {
      try {
        // send mail with defined transport object
        
        // const accessToken = await oAuth2Client.getAccessToken()
        const transporter = await nodemailer.createTransport({
          service:"gmail",
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
          }
          // auth: {
          //   type:'OAuth2',
          //   user: "wedocleaning99@gmail.com",
          //   clientId:CLIENT_ID,
          //   clientSecret:CLIENT_SECRET,
          //   refreshToken:REFRESH_TOKEN,
          //   accessToken: accessToken
          // },
        });
          

        let result = await transporter.sendMail(info);
  
        console.log("Message sent: %s", result.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  
        resolve(result);
      } catch (error) {
        console.log(error);
      }
    });
  };
  
  const emailProcessor = ({ email, pin, type, verificationLink = "" }) => {
    let info = "";
    switch (type) {
      case "request-new-password":
        info = {
          from: '"CMR Company" <abe.kohler59@ethereal.email>', // sender address
          to: email, // list of receivers
          subject: "Password rest Pin", // Subject line
          text:
            "Here is your password rest pin" +
            pin +
            " This pin will expires in 1day", // plain text body
          html: `<b>Hello </b>
        Here is your pin 
        <b>${pin} </b>
        This pin will expires in 1day
        <p></p>`, // html body
        };
  
        send(info);
        break;
  
      case "update-password-success":
        info = {
          from: '"CMR Company" <abe.kohler59@ethereal.email>', // sender address
          to: email, // list of receivers
          subject: "Password updated", // Subject line
          text: "Your new password has been update", // plain text body
          html: `<b>Hello </b>
         
        <p>Your new password has been update</p>`, // html body
        };
  
        send(info);
        break;
  
      case "new-user-confirmation-required":
        info = {
          from: '"CMR Company" <abe.kohler59@ethereal.email>', // sender address
          to: email, // list of receivers
          subject: "Please verify your new user", // Subject line
          text:
            "Please follow the link to very your account before you can login", // plain text body
          html: `<b>Hello </b>
          <p>Please follow the link to very your account before you can login</p>
          <p>${verificationLink}</P>
          `, // html body
        };
  
        send(info);
        break;
  
      default:
        break;
    }
  };

  module.exports = { emailProcessor };
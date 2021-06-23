const nodeMailer = require("nodemailer");
const jsonWebToken = require('jsonwebtoken')


process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
// require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
let transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nelin39254@gmail.com', // generated ethereal user
    pass: '01276256028aa', // generated ethereal password
  },
});



module.exports.sendEmailToResetPassword = async (request, response) => {
  randomVerficationCode = Math.floor((Math.random() * 100) + 54);
  host = request.get('host');
  verificationLink = "http://" + request.get('host') + "/resetPassword?id=" + randomVerficationCode;
  let emailOptions = {
    from: '"Password Manager" <nelin39254@gmail.com>', // sender address
    to: request.body.userEmail, // list of receivers
    subject: "Forgot Password!", // Subject line
    html: `<div>
    <div >
        <div>
            <h2> You Have forgotten your Password!</h2><br>
            <div>
                Please Click on the link to Reset your Password.<br><a href="${verificationLink}"> Click here to Reset your Password</a>
            </div>
        </div>
    </div>
</div>`, // html body
  }
  await transporter.sendMail(emailOptions, (error) => {
    if (error) {
      console.log('You Have an Error: =>', error);
    } else {
      console.log("Email Has Been Sent");
      console.log(request.body.userEmail);
      response.render('emailVerficationPage', {
        oldInputs: { userEmail: "", userPassword: "" },
        emailExists: true, passwordCorrect: true, invalidEmail: false,
        isLoggedIn: false, profileName: '',
      })

    }

  });


}



module.exports.sendBugReport = async (request, response) => {
  // randomVerficationCode = Math.floor((Math.random() * 100) + 54);
  // host = request.get('host');
  // verificationLink = "http://" + request.get('host') + "/resetPassword?id=" + randomVerficationCode;
  let emailOptions = {
    from: `"${request.session.userName}" <${request.session.userEmail}>`, // sender address
    to: 'abrahimsaad271@gmail.com', // list of receivers
    subject: "Bug Report!! 🐛 [Account Manager]", // Subject line
    html: `<div>
    <div >
        <div>
            <h2> Bug Report From: ${request.session.userEmail} </h2><br>
            <div>
                ${request.body.bugDetailes}
            </div>
        </div>
    </div>
</div>`, // html body
  }
  await transporter.sendMail(emailOptions, (error) => {
    if (error) {
      console.log('You Have an Error: =>', error);
    } else {
      console.log("Email Has Been Sent");
      response.render('bugReportPage', {
        oldInputs: {},
        isLoggedIn: request.session.isLoggedIn,
        profileName: request.session.userName,
        showAlert: true,

      })

    }

  });
  // console.log(request.session.userEmail);

}



module.exports.sendEmailToDeleteUser = async (request, response) => {
  // randomVerficationCode = Math.floor((Math.random() * 100) + 54);
  let urlToken = jsonWebToken.sign({ userEmail: request.body.userEmail }, 'userToken')
  console.log(request.body.userEmail);
  host = request.get('host');
  verificationLink = "http://" + request.get('host') + "/deleteUser/" + urlToken;
  let emailOptions = {
    from: '"Password Manager" <nelin39254@gmail.com>', // sender address
    to: request.body.userEmail, // list of receivers
    subject: "Delete Account!", // Subject line
    html: `<div">
    <div >
        <div">
            <h2>You Want to Delete your Account!</h2><br>
            <div>
                You can't recover your data back if you deleted your account<br>Please Click The Link To Confirm That you Want to delete your account<a href="${verificationLink}">Click Here to Confirm Delete!</a>
            </div>
        </div>
    </div>
</div>`, // html body
  }
  await transporter.sendMail(emailOptions, (error) => {
    if (error) {
      console.log('You Have an Error: =>', error);
      response.render('settingsPage', {
        isLoggedIn: request.session.isLoggedIn,
        userID: request.session.userID,
        profileName: request.session.userName,
        userEmail: request.session.userEmail,

      })
    } else {
      console.log("Email Has Been Sent");
      console.log(request.body.userEmail);
      response.render('emailVerficationPage', {
        oldInputs: { userEmail: "", userPassword: "" },
        emailExists: true, passwordCorrect: true, invalidEmail: false,
        isLoggedIn: false, profileName: '',
      })

    }

  });


}


module.exports.sendEmailToChangeUserEmail = async (request, response) => {
  let urlToken = jsonWebToken.sign({ userEmail: request.body.newEmail }, 'userToken')


  // randomVerficationCode = Math.floor((Math.random() * 100) + 54);
  host = request.get('host');
  verificationLink = "http://" + request.get('host') + "/changeUserEmail/" + urlToken;
  // console.log(urlToken);
  let emailOptions = {
    from: '"Password Manager" <nelin39254@gmail.com>', // sender address
    to: request.body.newEmail, // list of receivers
    subject: "Change Account Email!", // Subject line
    html: `<div>
              <div >
                  <div>
                      <h2> You have changed your Email!</h2><br>
                      <div>
                      You have changed your Email from => ${ request.session.userEmail } to this Email => ${request.body.newEmail}!.<br><a href="${verificationLink}">Click here to Confirm your New Email!</a>
                      </div>
                  </div>
              </div>
          </div>`, // html body
  }

  await transporter.sendMail(emailOptions, (error) => {
    if (error) {
      console.log('You Have an Error: =>', error);
    } else {
      console.log("Email Has Been Sent");
      response.render('emailVerficationPage', {
        isLoggedIn: false, profileName: '',
      })

    }

  });


}
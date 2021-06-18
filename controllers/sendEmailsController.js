const nodeMailer = require("nodemailer");
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
    html: `<div style="background-color: black;">
    <div >
        <div style="margin: 15px;">
            <h2 style="color: #c7781c; font-size: larger;"> You Have forgotten your Password!</h2><br>
            <div style="font-size: large; color: white;">
                Please Click on the link to Reset your Password.<br><a style="color: green;" href="${verificationLink}"><i class="fas fa-redo"></i> Click here to Reset your Password</a>
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

    }

  });
  console.log(request.body.userEmail);
  response.render('emailVerficationPage', {
    oldInputs: { userEmail: "", userPassword: "" },
    emailExists: true, passwordCorrect: true, invalidEmail: false,
    isLoggedIn: false, profileName: '',
  })

}



module.exports.sendBugReport = async (request, response) => {
  // randomVerficationCode = Math.floor((Math.random() * 100) + 54);
  // host = request.get('host');
  // verificationLink = "http://" + request.get('host') + "/resetPassword?id=" + randomVerficationCode;
  let emailOptions = {
    from: `"${ request.session.userName }" <${request.session.userEmail}>`, // sender address
    to: 'abrahimsaad271@gmail.com', // list of receivers
    subject: "Bug Report!! 🐛 [Account Manager]", // Subject line
    html: `<div style="background-color: black;">
    <div >
        <div style="margin: 15px;">
            <h2 style="color: #c7781c; font-size: larger;"> Bug Report From: ${request.session.userEmail} </h2><br>
            <div style="font-size: large; color: white;">
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

    }

  });
  // console.log(request.session.userEmail);
  response.render('bugReportPage', {
    oldInputs: {},
    isLoggedIn: request.session.isLoggedIn,
    profileName: request.session.userName,
    showAlert: true,
    
})
}



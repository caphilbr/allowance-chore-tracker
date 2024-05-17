import nodemailer from "nodemailer"
import config from "../config.js"
// import AWS from "aws-sdk"


// AWS.config.update({
//   accessKeyId: config.awsAccess.key,
//   secretAccessKey: config.awsSecret.key,
//   region: "us-east-1"
// })

// const transporter = nodemailer.createTransport({
//   SES: new AWS.SES({
//     apiVersion: '2010-12-01'
//   })
// });
            
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: config.email.address,
    pass: config.email.password
  }
});

const emailInvite2 = async (emailAddress, inviteUrl) => {

  const emailHTML = `
    <h2>You have been invited to join CHORE CHAMPIONS!</h2>
    <h4>The easy way to manage chores and allowances</h4>
    <a href="${inviteUrl}">CLICK HERE TO JOIN</a>
  `
  const mailOptions = {
    from: config.email.address,
    to: emailAddress,
    subject: 'Chore Champion Invite',
    html: emailHTML
  };
  const response = await transporter.sendMail(mailOptions);
  console.log("emailInvite2: ", response)
}

export default emailInvite2




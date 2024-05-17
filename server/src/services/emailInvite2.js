import nodemailer from "nodemailer"
import config from "../config.js"
// import AWS from "aws-sdk"

const emailInvite2 = async (emailAddress, nickname, inviteUrl, code) => {
  
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

  const emailHTML = `
    <h2>You have been invited to join CHORE CHAMPIONS!</h2>
    <h4>${nickname}, you have been invited to join CHORE CHAMPIONS!</H4>
    <h4>The easy way to manage chores and allowances</h4>
    <a href="${inviteUrl}">CLICK HERE TO ACCEPT THE INVITE & JOIN</a>
    <p>You will need this code to join:</p>
    <h3> CODE: ${code}</h3>
  `
  const mailOptions = {
    from: config.email.address,
    to: emailAddress,
    subject: 'Chore Champion Invite',
    html: emailHTML
  };
  const response = await transporter.sendMail(mailOptions);
  return response
}

export default emailInvite2




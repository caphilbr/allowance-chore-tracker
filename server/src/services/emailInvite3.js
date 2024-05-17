import config from "../config.js"
import nodemailer from 'nodemailer'
import AWS from 'aws-sdk'

const emailInvite3 = async (emailAddress, inviteUrl) => {
  
  const smtpUsername = config.smtp.username
  const smtpPassword = config.smtp.smtpPassword

  AWS.config.update({
    accessKeyId: config.awsAccess.key,
    secretAccessKey: config.awsSecret.key,
    region: "us-east-1"
  })

  const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
      user: smtpUsername,
      pass: smtpPassword
    }
  });

  const emailHTML = `
    <h2>From AWS SMTP: You have been invited to join CHORE CHAMPIONS!</h2>
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
  console.log("emailInvite3: ", response)

}

export default emailInvite3




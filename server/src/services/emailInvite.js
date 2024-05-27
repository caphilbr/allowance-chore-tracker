import nodemailer from "nodemailer"
import config from "../config.js"

const emailInvite = async (emailAddress, nickname, inviteUrl, code) => {
  const transporter = nodemailer.createTransport({
    // service: 'hotmail',
    host: "live.smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
      user: config.email.username,
      pass: config.email.password,
    },
  })

  const emailHTML = `
    <h2>${nickname}, you have been invited to join CHORE CHAMPIONS!</h2>
    <h4>The easy way to manage chores and allowances</h4>
    <a href="${inviteUrl}">CLICK HERE TO ACCEPT THE INVITE & JOIN</a>
    <p>You will need this code to join:</p>
    <h3> CODE: ${code}</h3>
  `
  const mailOptions = {
    from: config.email.address,
    to: emailAddress,
    subject: "Chore Champion Invite",
    html: emailHTML,
  }
  const response = await transporter.sendMail(mailOptions)
  return response
}

export default emailInvite

import config from "../config.js"
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";


const emailInvite = async (emailAddress, inviteUrl) => {
  
  const SENDER_ADDRESS = config.email.address
  const RECIPIENT_ADDRESS = emailAddress
  const AWS_REGION = "us-east-1"
  const subject = 'Chore Champion Invite'
  const bodyHtml = `
    <h2>From AWS SendMail: You have been invited to join CHORE CHAMPIONS!</h2>
    <h4>The easy way to manage chores and allowances</h4>
    <a href="${inviteUrl}">CLICK HERE TO JOIN</a>
  `

  const sendEmail = async (subject, bodyHtml) => {
    try {
      const sesClient = new SESClient({ region: AWS_REGION });
  
      const params = {
        Source: SENDER_ADDRESS,
        Destination: {
          ToAddresses: [RECIPIENT_ADDRESS],
        },
        Message: {
          Subject: {
            Charset: "UTF-8",
            Data: subject,
          },
          Body: {
            ...(bodyHtml && {
              Html: {
                Charset: "UTF-8",
                Data: bodyHtml,
              },
            }),
          },
        },
      };

      const sendEmailCommand = new SendEmailCommand(params);
      const sendEmailResponse = await sesClient.send(sendEmailCommand);
  
      console.log("Email sent successfully from emailInvite v1:", sendEmailResponse.MessageId);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  sendEmail(subject, bodyHtml)
}

export default emailInvite




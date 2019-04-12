const nodemailer = require('nodemailer');
const _ = require('lodash');
const handlebars = require('handlebars');
const { readFile, styledStatus } = require('../utils');

/**
 * Send email message to registered recipients.
 *
 * @param {Object} message Message payload.
 */
module.exports = async (message) => {
  console.log(`Sending email to (${process.env.EMAIL_RECIPIENTS})`);

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: _.toNumber(process.env.EMAIL_SMTP_PORT),
    // true for 465, false for other ports
    secure: process.env.EMAIL_USE_TLS === 'true',
    auth: {
      user: process.env.EMAIL_SMTP_USER,
      pass: process.env.EMAIL_SMTP_PASS,
    }
  });

  // Read HTML template file
  const htmlTemplate = await readFile('./assets/email.html');
  const template = handlebars.compile(htmlTemplate);

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM_ADDRESS,
    to: process.env.EMAIL_RECIPIENTS,
    subject: `Build \`${message.id}\``,
    html: template({
      status: styledStatus(message.status),
      id: message.id,
      logUrl: message.logUrl,
    }),
  });

  console.log("Message sent: %s", info.messageId);
};

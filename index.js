const slack = require('./notifiers/slack');
const email = require('./notifiers/email');

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.receivedMessage = async (event, context) => {
  const pubsubMessage = event.data;
  // Parse base64 encoded message payload from cloud-build
  const message = JSON.parse(Buffer.from(pubsubMessage, 'base64').toString());

  // Slack
  if (process.env.SLACK_WEBHOOK_URL) {
    const slackNotifyOn = process.env.SLACK_NOTIFY_ON.split(',');
    if (slackNotifyOn.includes(message.status)) {
      await slack(message).catch(err => console.error(err));
    }
  }

  // Email
  if (process.env.EMAIL_SMTP_HOST && process.env.EMAIL_SMTP_USER) {
    const emailNotifyOn = process.env.EMAIL_NOTIFY_ON.split(',');
    if (emailNotifyOn.includes(message.status)) {
      await email(message).catch(err => console.error(err));
    }
  }
};

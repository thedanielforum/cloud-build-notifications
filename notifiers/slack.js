const IncomingWebhook = require('@slack/client').IncomingWebhook;
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

/**
 * Publishes message to slack channel.
 *
 * @param {Object} message Message payload.
 */
module.exports = async (message) => {
  console.log('Posting notification to slack');
  const msg = {
    text: `Build \`${message.id}\``,
    mrkdwn: true,
    username: 'Cloud Build Notifications',
    attachments: [
      {
        title: 'Build logs',
        title_link: message.logUrl,
        fields: [{
          title: 'Status',
          value: message.status
        }]
      }
    ]
  };

  await webhook.send(msg);
};

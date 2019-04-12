const fs = require('fs');
const _ = require('lodash');

const readFile = (path, opts = 'utf8') => new Promise((resolve, reject) => {
  fs.readFile(path, opts, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const styledStatus = (status) => {
  switch (status) {
    case 'SUCCESS':
      return `<span style="color: #28a745;">${_.toUpper(status)}</span>`;
    case 'FAILURE':
      return `<span style="color: #dc3545;">${_.toUpper(status)}</span>`;
    case 'CANCELLED':
      return `<span style="color: #ffc107;">${_.toUpper(status)}</span>`;
    default: return `<span>${_.toUpper(status)}</span>`;
  }
}

module.exports = {
  readFile,
  styledStatus,
};

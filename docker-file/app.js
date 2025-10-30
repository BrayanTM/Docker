const cron = require('node-cron');
const { syncDB } = require('./tasks/sync-db');

cron.schedule('1-59/5 * * * * *', syncDB);

console.log('Cron job scheduled to run every 5 seconds, starting at second 1.');
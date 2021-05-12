const schedule = require('node-schedule');
const process = require('child_process');
const { writeLog } = require('./app/common');
const { mailConfig: { mailTime } } = require('./app/config/pushConfig');

const rule = new schedule.RecurrenceRule();
Object.assign(rule, mailTime);

const run = () => {
  const child = process.spawn('node', ['app/utils/mail.js']);
  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stdout.on('end', () => {
    writeLog('Run job on #{new Date().toString()}');
    process.exit(0);
  });

  child.on('error', (err) => {
    console.log(`error:${err}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
};

schedule.scheduleJob(rule, () => {
  run();
});

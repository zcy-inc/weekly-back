module.exports = {
  apps: [{
    name: 'weekly',
    script: './app/app.js',
    watch: false,
    args: '--web --port 4092',
    interpreter: 'node',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    error_file: './logs/process/error_file.log',
    out_file: './logs/process/out_file.log',
  }, {
    name: 'mail-job',
    script: './job.js',
    watch: false,
    args: '--web --port 4092',
    interpreter: 'node',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    error_file: './logs/process-job/error_file.log',
    out_file: './logs/process-job/out_file.log',
  }],
};

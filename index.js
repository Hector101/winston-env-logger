const winston = require('winston');
const moment = require('moment');
const chalk = require('chalk');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const shouldOutputToFile = process.env.NODE_ENV === 'production';

const chalkNone = str => str;
const chalkTitle = chalk.cyanBright;
const newLinePrefix = '\n  ';

const getWinstonArguments = (options) => {
  const fullMessage = [];
  let messageText;

  if (typeof options === 'string') {
    messageText = options;
    options = {};
  } else if (options.message) {
    messageText = options.message;
    delete options.message;
  }

  if (options.request) { // express request object
    fullMessage.push(`${chalkTitle(`API Request ${options.request.loggingCounter}`)}: ${options.request.method} ${options.request.originalUrl}`);
    delete options.request;
  }

  if (messageText) {
    fullMessage.push(messageText);
  }

  if (options.error) { // caught error
    fullMessage.push(`${chalkTitle('Error')}: ${options.error.message}`);

    let stackTrace = options.error.stack;
    fullMessage.push(`${chalkTitle('Stack trace')}: ${stackTrace}`);
    delete options.error;
  }

  if (options.sql) {
    // limit the logged sql to 1000 length on prod
    let sql = options.sql;
    const regexResult = sql.match(/^Executing \(([^)]+)\):/);
    const transaction = (regexResult && regexResult.length > 1 && regexResult[1]) || 'default';
    sql = sql.replace(/^Executing \([^)]+\): /, '');

    if (transaction === 'default') { // no transaction
      fullMessage.push(`${chalkTitle('SQL')}: ${sql}`);
    } else {
      fullMessage.push(`${chalkTitle('SQL')}: Txn (${transaction}) ${sql}`);
    }
    delete options.sql;
  }

  // in local dev, add an empty line at the end to make reading easier
  fullMessage.push('');

  return [fullMessage.join(newLinePrefix), options];
};

const Transport = shouldOutputToFile ? winston.transports.File : winston.transports.Console;

const transportOptions = {
  json: false, // so error object makes it to the formatter function
};

if (shouldOutputToFile) {
  transportOptions.filename = path.resolve(__dirname, path.join('logs', `${moment().format('MMMM')} - ${moment().format('YYYY')}.log`));
}

const wLogger = winston.createLogger({
  transports: [
    new (Transport)(transportOptions),
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level.toLowerCase()}: ${info.message}${info.splat !== undefined ? `${info.splat}` : ' '}`),
  ),
});

const loggerOptions = {
  info: options => wLogger.info.apply(wLogger, getWinstonArguments(options)),
  warn: options => wLogger.warn.apply(wLogger, getWinstonArguments(options)),
  error: options => wLogger.error.apply(wLogger, getWinstonArguments(options)),
}

function logger() {
  let requestCounter = 1;

  return function(req, res, next) {
    req.loggingCounter = requestCounter++;

    let logData = { request: req };
    if (req.body && req.body.query) {
      logData.graphqlQuery = req.body.query
        .replace(/#.*\n/g, '\n') // remove comments
        .replace(/\n/g, '');     // remove new line characters
    }

    loggerOptions.info(logData);
    next();
  };
}


module.exports = {
  ...loggerOptions,
  logger,
};

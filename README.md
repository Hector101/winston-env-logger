# winston-logger


An express logger based on winston used to debug your app on different environments. It can write monthly logs to files with timestamp on production environment by setting NODE_ENV to `production`, and displays on the Console on other environments.

## Install

`npm install winston-logger`

## Basic Usage

```javascript

  import express from 'express';
  import winstonLogger from 'winston-logger';

  const app = express();

  app.use(winstonLogger.logger());

```

```javascript

    logger.info('Welcome to winston logger'); // 2019-06-09 09:20:40 info: Welcome to winston logger

    logger.info({
      message: 'Welcome to winston logger',
      info: dataObject
    });

    logger.warn({
      message: 'Welcome to winston logger'
      ...otherProperties
    });

    logger.error({
      message: 'Welcome to winston logger'
      ...otherProperties
    });

```

## How to contribute
To contribute, fork this repo to your private repository and create a pull request based on the feature you want to add.

## Disclaimer
This app and its functions are limited by time constraint and is in no way at its best.

### FAQ
+ Can I fork this repository?
  + Yes you can.
+ Can I contribute to the project?
  + Yes you can, however it is advised you follow the AirBnB style guide for your PR to be considered being merged to the project
+ Can I modify the project, for usage?
  + This project is an open source project, so you can.

## Dependencies
+  **[winston](https://www.npmjs.com/package/winston)** - A logger for just about everything.
+  **[dotenv](https://www.npmjs.com/package/dotenv)** - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
+  **[chalk](https://www.npmjs.com/package/chalk)** - Terminal string styling done right.


## Authors
Hector Johnson - github.com/hector101


## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const dotenv = require('dotenv');
dotenv.config();

const configMiddleware = require('./config/apiMiddleware');
const bodyParser = require('body-parser');
const config = require('./config/app');
if (config.env === 'production') {
  require('newrelic');
}
const apiMiddleware = require('node-mw-api-prodest').middleware;
const express = require('express');

let app = express();

app.use(bodyParser.json());

require('./routes/home')(app);
require('./routes/push')(app);

app.use(
  apiMiddleware({
    compress: true,
    cors: true,
    log: true,
    authentication: {
      jwtPublicKey: config.jwtPublicKey
    }
  })
);

// load our routes
require('./routes/driverAcessoCidadao')(app);

app.use(
  apiMiddleware({
    limit: {
      max: parseInt(configMiddleware.max),
      duration: parseInt(configMiddleware.time) * 60 * 1000,
      perSecond: parseInt(configMiddleware.maxSecond),
      redisUrl: config.redisUrl,
      apiId: 'api-detran'
    }
  })
);

app.use(
  apiMiddleware({
    limit: {
      max: parseInt(configMiddleware.max2),
      duration: parseInt(configMiddleware.duration2Sec) * 1000,
      perSecond: parseInt(configMiddleware.perSecond2),
      redisUrl: config.redisUrl,
      apiId: 'api-detran-2'
    }
  })
);

// load limited routes
require('./routes/driver')(app);
require('./routes/vehicle')(app);

app.use(
  apiMiddleware({
    error: {
      notFound: true,
      debug: config.env === 'development'
    }
  })
);

let pathApp = express();

let path = config.path;
pathApp.use(path, app);

module.exports = pathApp;

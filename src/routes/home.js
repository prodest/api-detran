const acessoCidadao = require('../config/acesso-cidadao');
const validateAtEndpoint = require('node-mw-api-prodest').validateAtEndpoint(acessoCidadao.userInfoUrl);

module.exports = app => {
  app.get('/ping', (req, res) => res.json({ ping: 'pong' }));
};

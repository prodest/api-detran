module.exports = app => {
  app.get('/ping', (req, res) => res.json({ ping: 'pong' }));
};

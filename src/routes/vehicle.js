module.exports = app => {
  const vehicleController = require('../controllers/vehicleController')();

  app.get('/vehicle', vehicleController.getData);

  app.get('/vehicle/tickets', vehicleController.getTickets);
};

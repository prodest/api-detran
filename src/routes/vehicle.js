const config = require( '../config/app' );

const verifyBasicAuthentication = ( req, res, next ) => {
    const authorizationHeader = req.get( 'Authorization' );
    if ( !authorizationHeader || authorizationHeader !== config.apiAuthToken ) {
        res.statusCode = 401;
        res.send( 'Access denied' );
    } else {
        next();
    }
};

module.exports = app => {
  const vehicleController = require('../controllers/vehicleController')();

  app.get('/vehicle', vehicleController.getData);

  app.get('/vehicle/tickets', vehicleController.getTickets);

  app.post('/vehicle/tickets', verifyBasicAuthentication, vehicleController.createTicket);
};

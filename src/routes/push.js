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

  app.post('/vehicle/tickets', verifyBasicAuthentication, vehicleController.sendPushTicket);
};

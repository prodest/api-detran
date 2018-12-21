const rp = require( 'request-promise' );
const push = require( '../config/push' );

module.exports = () => {
    var pushService = new Object();

    pushService.sendPush = ( data ) => {
        const basicAuth = 'Basic ' + Buffer.from( push.username + ':' + push.password ).toString( 'base64' );

        const options = {
            method: 'POST',
            uri: push.push_url,
            body: data,
            json: true,
            headers: {
                'Authorization': basicAuth
            }
        };

        return rp( options );
    };

    return pushService;
};

const rp = require( 'request-promise' );
const sql = require( 'mssql' );
const detran = require( '../config/detran' );
const espm = require( '../config/espm' );

const SP_DADOS_VEICULO = detran.detranNet.SPDadosVeiculo;
const SP_INFRACOES = detran.detranNet.SPInfracoes;
const config = detran.detranNet.sqlConnectionConfig;

module.exports = () => {
    const vehicleService = new Object();
    const connection = new sql.Connection( config );

    vehicleService.getDadosVeiculo = function( plate, renavam ) {
        return connection.connect()
            .then( conn => {
                return new sql.Request( conn )
                    .input( 'placa', sql.VarChar( 10 ), plate )
                    .input( 'renavam', sql.BigInt, renavam )
                    .execute( SP_DADOS_VEICULO );
            } )
            .then( recordsets => {
                connection.close();
                return recordsets[ 0 ][ 0 ];
            } )
            .catch( err => {
                connection.close();
                return Promise.reject( err );
            } );
    };

    vehicleService.getInfracoes = function( plate, renavam ) {
        return connection.connect()
            .then( conn => {
                return new sql.Request( conn )
                    .input( 'placa', sql.VarChar( 10 ), plate )
                    .input( 'renavam', sql.BigInt, renavam )
                    .execute( SP_INFRACOES );
            } )
            .then( recordsets => {
                connection.close();
                return recordsets[ 0 ];
            } )
            .catch( err => {
                connection.close();
                return Promise.reject( err );
            } );
    };

    vehicleService.getUsersByVehiclePlate = ( plate ) => {
        const options = {
            uri: espm.vehicle_data_service_url.replace( ':plate', plate ),
            headers: {
                'Authorization': espm.espmApiAuthToken
            },
            json: true
        };
        return rp( options );
    };

    return vehicleService;
};

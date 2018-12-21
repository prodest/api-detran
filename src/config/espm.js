module.exports = {
    vehicle_data_service_url: process.env.VEHICLE_DATA_SERVICE_URL || 'http://localhost:4242/detran/data/vehicles/:plate/users',
    espmApiAuthToken: process.env.ESPM_API_AUTH_TOKEN || '1234',
}
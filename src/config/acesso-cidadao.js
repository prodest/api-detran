const _identityServerUrl = process.env.IDENTITY_SERVER_URL || 'https://acessocidadao.es.gov.br/is/';


module.exports = {
    identityServerUrl: _identityServerUrl,
    userInfoUrl: process.env.USER_INFO_URL || `${_identityServerUrl}connect/userinfo`,
    getDadosScope: process.env.GET_DADOS_SCOPE || 'SCOPE'
};

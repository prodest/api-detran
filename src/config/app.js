module.exports = {
    env: process.env.NODE_ENV || '',
    port: process.env.PORT || '4242',
    path: process.env.REQUEST_PATH || '',
    redisUrl: process.env.REDIS_URL || 'redis://redis:6379',
    jwtPublicKey: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArYaYlPnnrxBVwC4o0ykG\nVg8gjH/TerrrXS3GmsZeON6SCNuOBzUj+7RiEF64lE//gLY01nTJZtnUIPvmKJW/\n1+eWxGNW1Mh1JpT/f3A6Q5rp2WNKSBwvEFPE58lkD63Tewsn3+0dw+aFKaSW+l3A\nZ7WS4AxXxBLIRr2zpTL3DOCbeT/m2yEQ8Do662/d+ty7F08FJVaaz2PxmnLEeSQX\n6RTRPeFRPlGVj91H4h85Ln+0Oc0U/oiqa+AKwobWXLOqDKhn8HYZuoya368TqZ9X\n26QEp1g7psaT8kiNRFAt0Yb4WbgFSWf2r92HDS8dj25TNTeeLkvZ48KylTKU23DT\nqQIDAQAB\n-----END PUBLIC KEY-----',
    apiAuthToken: process.env.API_AUTH_TOKEN || '1234',
};

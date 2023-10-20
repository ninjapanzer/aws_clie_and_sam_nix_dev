var jwt = require('jsonwebtoken');
var jwksClient = require('jwks-rsa');
const tenant_id_key = 'https://my-api.exampleco.com/request-ip'
const auth0_tenant_id = 'dev-3b1u8061rge5es0e.us.auth0.com'


var client = jwksClient({
    jwksUri: `https://${auth0_tenant_id}/.well-known/jwks.json`
});
function getKey(header, callback){
    client.getSigningKey(header.kid, function(err, key) {
        var signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

exports.handler = async (event) => {
    const authHeader = event.headers['Authorization'];
    try {
        // const decoded = jwt.verify(authHeader, getKey, { algorithms: ['RS256'] })
        const options = {
            algorithms: ['RS256']
        }

        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(authHeader, getKey, options, function(err, decoded) {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });

        console.log("decodede")
        // const decoded = jwt.decode(authHeader);
        if (!decoded) {
            return { "isAuthorized": false }
        }
        console.log(decoded)
        if(decoded.sub) {
            return {
                "isAuthorized": true,
                "context": {
                    "sub": decoded.sub,
                    "tenant": decoded[tenant_id_key]
                }
            }
        } else {
            return { "isAuthorized": false }
        }
    } catch(error) {
        console.log(error)
        return { "isAuthorized": false }
    }
};

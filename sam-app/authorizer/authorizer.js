var jwt = require('jsonwebtoken');
const key = "qwertyuiopasdfghjklzxcvbnm123456"

exports.handler = async (event) => {
    const authHeader = event.headers['Authorization'];
    try {
        const decoded = jwt.verify(authHeader, key)
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
                    "tenant": decoded.tenant
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

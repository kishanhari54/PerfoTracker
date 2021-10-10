const expressjwt = require('express-jwt');

const auth = function() {
    const secret = process.env.JWT_SECRET_KEY;
    const api = process.env.API_URL;
    return expressjwt({
            secret: secret,
            algorithms: ['HS256'],
            isRevoked: isRevoked
        })
        .unless({
            path: [
                `/${api}/users/login`,
                // `/${api}/users/register`,
                { url: /\/api\/v1\/events(.*)/, methods: ['GET', 'OPTIONS]'] }
            ]
        })
}

async function isRevoked(req, payload, done) {
    /*if (!payload.isAdmin) {
        done(null, true);
    } else {
        done();
    }*/
    done();
}

module.exports = auth;
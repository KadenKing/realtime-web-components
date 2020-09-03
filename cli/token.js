const crypto = require('crypto');

const SECRET = "SUPERSECRET";

const getToken = (username, projectName) => {
    return crypto.createHmac('sha1', SECRET)
        .update(`${username}:${projectName}`)
        .digest('hex');
}

module.exports = {
    getToken
}
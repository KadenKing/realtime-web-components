const crypto = require('crypto');

const SECRET = "SUPERSECRET";

const getToken = (username, projectName) => {
    const signature = crypto.createHmac('sha256', SECRET)
        .update(`${username}:${projectName}`)
        .digest('hex');

    const token = {
        username,
        projectName,
        signature,
    }

    return JSON.stringify(token);
}

module.exports = {
    getToken
}
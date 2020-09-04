const crypto = require('crypto');
const fs = require('fs');

const SECRET = "SUPERSECRET";

const getAuthToken = (username, password) => {
    const now = new Date();
    const expiration = now.setDate(now.getDate() + 14);

    const signature = crypto.createHmac('sha256', SECRET)
        .update(`${username}:${expiration.toString()}`)
        .digest('hex');

    const token = {
        username,
        expiration,
        signature,
    }

    return JSON.stringify(token);
}

const getUsernameFromToken = () => {
    const str = fs.readFileSync('auth.txt');
    const token = JSON.parse(str);

    return token.username;
}

module.exports = {
    getAuthToken,
    getUsernameFromToken,
}
const fs = require('fs')
const os = require('os')
const path = require('path')
const dir = path.join(os.homedir(), '.rtc-config');

const getTokenFromDisk = () => {
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const tokenString = fs.readFileSync(`${dir}/auth.txt`).toString();
        return JSON.parse(tokenString);
    } catch(e) {
        return null;
    }
}

const saveTokenToDisk = (token) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(`${dir}/auth.txt`, token);
}

module.exports = {
    getTokenFromDisk,
    saveTokenToDisk,
}
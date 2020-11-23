const axios = require('./axiosInstance');
const fs = require('fs');
const { attemptLogin } = require('./auth');
const os = require('os')
const path = require('path')
const dir = path.join(os.homedir(), '.rtc-config');

const getTokenFromFile = () => {
    return JSON.parse(fs.readFileSync(`${dir}/auth.txt`).toString()) //JSON.parse(fs.readFileSync('auth.txt').toString())
}

const createAuthHeader = (token) => {
    return  {'Authorization': token}
    
}

const axiosRequest = async (method, url, data) => {
    const token = getTokenFromFile()
    try {
        return await axios({method, url, data, headers: createAuthHeader(token.access_token)})
    } catch(e) {
        try {
            const resp = await axios.post('/api/session/renew', {}, createAuthHeader(token.renewal_token))
            //fs.writeFileSync('auth.txt', JSON.stringify(resp.data.data))
            fs.writeFileSync(`${dir}/auth.txt`, JSON.stringify(resp.data.data));
            return await axios({method, url, data, headers: createAuthHeader(resp.data.data.access_token)})
        } catch(e2) {
            await attemptLogin()
            return axiosRequest(method, url, data)
        }
    }
    
}

const getProjects = async () => {
    const resp = await axiosRequest('get','/projects', {})
    return resp.data
}

module.exports = {
    getProjects,
}
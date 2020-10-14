const axios = require('axios');
const fs = require('fs');
const { attemptLogin } = require('./auth');

const getTokenFromFile = () => {
    return JSON.parse(fs.readFileSync('auth.txt').toString())
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
            const resp = await axios.post('http://localhost:4000/api/session/renew', {}, createAuthHeader(token.renewal_token))
            fs.writeFileSync('auth.txt', JSON.stringify(resp.data.data))
            return await axios({method, url, data, headers: createAuthHeader(resp.data.data.access_token)})
        } catch(e2) {
            await attemptLogin()
            return axiosRequest(method, url, data)
        }
    }
    
}

const getProjects = async () => {
    const resp = await axiosRequest('get','http://localhost:4000/projects', {})
    return resp.data
}

module.exports = {
    getProjects,
}
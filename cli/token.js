const crypto = require('crypto');
const axios = require('axios');
const SECRET = "SUPERSECRET";

const getToken = async (username, projectName) => {
    return axios
    .post('http://localhost:4000/api/signToken', {
        username,
        projectName
    })
    .then ( res => {
        return JSON.stringify(res.data)
    })
    .catch(error => {
        console.error(error)
    })
    

}

module.exports = {
    getToken
}
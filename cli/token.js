const crypto = require('crypto');
const axios = require('axios');
const SECRET = "SUPERSECRET";
const fs = require('fs');
// const getToken = async (username, projectName) => {
//     return axios
//     .post('http://localhost:4000/api/signToken', {
//         username,
//         projectName
//     })
//     .then ( res => {
//         return JSON.stringify(res.data)
//     })
//     .catch(error => {
//         console.error(error)
//     })
// }


const getProtected = async () => {
    let token = JSON.parse(fs.readFileSync('auth.txt').toString())["access_token"]
    console.log({token})
    return axios
    .get('http://localhost:4000/protected',{
        headers: {
            'Authorization': token
          }
    })
    .then ( res => {
        return JSON.stringify(res.data)
    })
    .catch(error => {
        console.error(error)
    })
}

module.exports = {
    getProtected
}
const axios = require('axios');
const fs = require('fs');

const newProject = async () => {
    let token = JSON.parse(fs.readFileSync('auth.txt').toString())["access_token"]
    return axios
    .get('http://157.230.236.37:4000/projects',{
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
    newProject
}
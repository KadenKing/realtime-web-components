const axios = require('axios');

//axios.defaults.baseURL = 'https://realtimewebcomponents.com';

const instance = axios.create({
    baseURL: 'https://realtimewebcomponents.com'
});

module.exports = instance;
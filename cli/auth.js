const fs = require('fs');
const axios = require('axios')

const getAuthToken = async (email, password) => {
    try {
        const res = await axios.post('http://localhost:4000/api/session', {user: {email, password}})
        const data = JSON.stringify(res.data.data);
        return data
    } catch(e) {
        console.log(`error: ${e}`)
    }

}

// const getUsernameFromToken = () => {
//     const str = fs.readFileSync('auth.txt');
//     const token = JSON.parse(str);

//     return token.username;
// }

module.exports = {
    getAuthToken/*,
    getUsernameFromToken,*/
}
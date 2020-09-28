const fs = require('fs');
const inquirer = require('inquirer');

const axios = require('axios')

const noAuthQuestions = [
    {
        type: 'confirm',
        name: 'hasAccount',
        message: 'Do you already have an account?',
        default: false,
    },
];

const noAccountQuestions = [
   {
       type: 'input',
       name: 'username',
       message: 'What is your desired username?',
   },
   {
       type: 'password',
       name: 'password',
       message: 'What is your desired password?',
   },
   {
       type: 'password',
       name: 'confirmPassword',
       message: 'Confirm password',
   },
];

const hasAccountLogin = [
   {
       type: 'input',
       name: 'username',
       message: 'What is your username?',
   },
   {
       type: 'password',
       name: 'password',
       message: 'What is your password?',
   },
];

const noAuth = async () => {
    const answers = await inquirer.prompt(noAuthQuestions);
    if (!answers.hasAccount) {
        const signupAnswers = await inquirer.prompt(noAccountQuestions);

        return {
            username: signupAnswers.username, 
            password: signupAnswers.password,
        }
    }

    const loginAnswers = await inquirer.prompt(hasAccountLogin);
    return {
        username: loginAnswers.username,
        password: loginAnswers.password,
    }
}

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    return attemptLogin();
    // return Promise.reject(error);
  });

const getAuthToken = async (email, password) => {
    try {
        const res = await axios.post('http://localhost:4000/api/session', {user: {email, password}})
        const data = JSON.stringify(res.data.data);
        return data
    } catch(e) {
        console.log(`error: ${e}`)
    }

}

const attemptLogin = async () => {
    const {username, password} = await noAuth();
    const token = await getAuthToken(username, password);
    return token
}

// const getUsernameFromToken = () => {
//     const str = fs.readFileSync('auth.txt');
//     const token = JSON.parse(str);

//     return token.username;
// }

module.exports = {
    attemptLogin/*,
    getUsernameFromToken,*/
}
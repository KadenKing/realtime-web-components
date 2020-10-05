const fs = require('fs');
const inquirer = require('inquirer');
const promiseRetry = require('promise-retry');

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

const getAuthToken = async (email, password) => {
    const res = await axios.post('http://localhost:4000/api/session', {user: {email, password}})
    const data = JSON.stringify(res.data.data);
    return data
}

const attemptLogin = async () => {
    return promiseRetry({retries: 2}, async (retry, number) => {
        try {
            const {username, password} = await noAuth();
            const token = await getAuthToken(username, password);
            fs.writeFileSync('auth.txt', token);
            return token
        } catch(e) {
            console.log('Could not log in, please try again')
            retry(e);
        }
    })
}

module.exports = {
    attemptLogin
}
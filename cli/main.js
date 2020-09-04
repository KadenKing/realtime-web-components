const inquirer = require('inquirer');
const fs = require('fs');
const {getToken} = require('./token.js');
const {getAuthToken, getUsernameFromToken} = require('./auth.js');

/**
 * 
 */

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

const createProjectQuestions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
    }, 
]

const handleAuth = async () => {
    if (!fs.existsSync('auth.txt')){
        const {username, password} = await noAuth()
        const tokenString = getAuthToken(username, password);
        fs.writeFileSync('auth.txt', tokenString);
    }
}

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

const handleProject = async () => {
    const answers = await inquirer.prompt(createProjectQuestions);
    const username = getUsernameFromToken();

    const token = getToken(username, answers.projectName);
    fs.writeFileSync('project.txt', token);

}

handleAuth()
.then(() => {
    handleProject()
})

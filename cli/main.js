const inquirer = require('inquirer');
const fs = require('fs');
const {getProtected} = require('./token.js');
const {attemptLogin/*, getUsernameFromToken*/} = require('./auth.js');

/**
 * manual retrying is a nightmare use https://www.npmjs.com/package/axios-retry
 */

/**
 * rewrite this to be not a nightmare
 * get username from auth token, user will have multiple projects
 * try out the auth from the cli by accessing the protected endpoint
 * handle renewing tokens silently
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

        const tokenString = await attemptLogin();

        fs.writeFileSync('auth.txt', tokenString);
        
        return JSON.parse(tokenString);
    }

    const tokenString = fs.readFileSync('auth.txt').toString();
    return JSON.parse(tokenString);
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
    //const username = getUsernameFromToken();

    const token = await getProtected();
    fs.writeFileSync('project.txt', token);

}

/** rewrite */
handleAuth()
.then((token) => {
    console.log({token})
})
.catch(e => {
    console.log({e});
})

/*********** */

// handleAuth()
// .then(() => {
//     handleProject()
// })

const inquirer = require('inquirer');
const {getToken} = require('./token.js')

/**
 * save the username to disk after authenticating so we don't have to ask over and over
 * add auth token once user is authenticated
 * 
 * make separate tokens for auth and project config
 * auth token is secret, project config token can be public maybe
 */


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
];

const hasAccountQuestions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
    }, 
]

var defaultQuestions = [
  {
    type: 'confirm',
    name: 'checkForAccount',
    message: 'Do you already have an account?',
    default: false,
  },
];

inquirer.prompt(defaultQuestions).then(async (answers) => {
    var username = undefined;
    if(!answers.checkForAccount) {
        const signupAnswers = await inquirer.prompt(noAccountQuestions)
        console.log(`you signed up!! ${JSON.stringify(signupAnswers)}`)
        username = signupAnswers.username;
    }
        
    const creationQuestions = await inquirer.prompt(hasAccountQuestions)

    console.log(`you made your token!!! ${getToken(username, creationQuestions.projectName)}`);

});
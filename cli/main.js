const inquirer = require('inquirer');
const fs = require('fs');
const {newProject} = require('./token.js');
const {attemptLogin/*, getUsernameFromToken*/} = require('./auth.js');
const {getProjects} = require('./requests.js')

/**
 * manual retrying is a nightmare use https://www.npmjs.com/package/axios-retry
 */

/**
 * rewrite this to be not a nightmare
 * get username from auth token, user will have multiple projects
 * try out the auth from the cli by accessing the protected endpoint
 * handle renewing tokens silently
 */

const whatDo = [
    {
        type: 'list',
        name: 'whatDo',
        message: 'What do you want to do?',
        choices: ['Manage an existing project', 'Create a new project', 'Manage my account'],
    }
]

const handleAuth = async () => {
    if (!fs.existsSync('auth.txt')){

        const tokenString = await attemptLogin();

       
        
        return JSON.parse(tokenString);
    }

    const tokenString = fs.readFileSync('auth.txt').toString();
    return JSON.parse(tokenString);
}


/** rewrite */
handleAuth()
.then((token) => {
    return inquirer.prompt(whatDo)
})
.then(async (answers) => {
    const choice = answers.whatDo;
    if (choice === "Create a new project") {
        const resp = await newProject()
        console.log(resp);
    } else if (choice === "Manage an existing project") {
        const projects = await getProjects()
        const questionText = 'Which project do you want to manage?'
        const question = {
            type: 'list',
            name: questionText,
            choices: projects,
        }
        const ans = await inquirer.prompt(question);
        const selectedProject = projects.find(project => project.name === ans[questionText])
        
        const config = {
            ...selectedProject
        }

        const configString = JSON.stringify(config, undefined, 2)

        console.log(`Your client configuration: \n\n${configString}`)
    }
})

.catch(e => {
    console.log({e});
})

/*********** */

// handleAuth()
// .then(() => {
//     handleProject()
// })

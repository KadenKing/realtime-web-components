#! /usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const {newProject} = require('./token.js');
const {attemptLogin/*, getUsernameFromToken*/} = require('./auth.js');
const {getProjects} = require('./requests.js')
const {getTokenFromDisk} = require('./storeToken.js')
const os = require('os')
const path = require('path')
const dir = path.join(os.homedir(), '.rtc-config');

/**
 * manual retrying is a nightmare use https://www.npmjs.com/package/axios-retry
 */

/**
 * rewrite this to be not a nightmare
 * get username from auth token, user will have multiple projects
 * try out the auth from the cli by accessing the protected endpoint
 * handle renewing tokens silently
 */

 /**
  * main menu options
  */
const whatDo = [
    {
        type: 'list',
        name: 'whatDo',
        message: 'What do you want to do?',
        choices: ['Manage an existing project', 'Create a new project', 'Manage my account', new inquirer.Separator(), 'Quit'],
    }
]

/**
 * 
 */
const handleAuth = async () => {
    if (!fs.existsSync(`${dir}/auth.txt`)){

        const tokenString = await attemptLogin();

       
        
        return JSON.parse(tokenString);
    }

    return getTokenFromDisk();
}

const start = async () => {
    handleAuth()
    .then((token) => {
        return inquirer.prompt(whatDo)
    })
    .then(async (answers) => {
        const choice = answers.whatDo;
        if (choice === "Create a new project") {
    
            const resp = await newProject()
    
        } else if (choice === "Manage an existing project") {
            const projects = await getProjects()
            const questionText = 'Which project do you want to manage?'
            const question = {
                type: 'list',
                name: questionText,
                choices: [...projects, new inquirer.Separator(), {name : 'return to main menu'}],
            }
            const ans = await inquirer.prompt(question);

            if (ans[questionText] === 'return to main menu') {
                return;
            }

            const selectedProject = projects.find(project => project.name === ans[questionText])
            
            const config = {
                ...selectedProject
            }
    
            const configString = JSON.stringify(config, undefined, 2)
    
            console.log(`Your client configuration: \n\n${configString}\n\n`)
        } else if (choice === "Quit") {
            process.exit(0);
        }
    })
    .then(async () => {
        await start();
    })
    .catch(e => {
        console.log({e});
    })
}

start();

/*********** */

// handleAuth()
// .then(() => {
//     handleProject()
// })

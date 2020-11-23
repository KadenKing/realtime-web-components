const axios = require('./axiosInstance');
const fs = require('fs');
const inquirer = require('inquirer');
const os = require('os')
const path = require('path')
const dir = path.join(os.homedir(), '.rtc-config');

const questions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'What do you want to call your project?',
    },
];

const newProject = async () => {
    const token = JSON.parse(fs.readFileSync(`${dir}/auth.txt`).toString())["access_token"]
    //let token = JSON.parse(fs.readFileSync('auth.txt').toString())["access_token"]

    const {projectName} = await inquirer.prompt(questions);

    return axios
    .post('/projects',
    {name: projectName},
    
    {
        headers: {
            'Authorization': token
          }
    })
    .then ( res => {
        console.log('successfully created new project!')
        return JSON.stringify(res.data)
    })
    .catch(error => {
        console.log('an error occurred')
        console.error(error)
    })
}

module.exports = {
    newProject
}
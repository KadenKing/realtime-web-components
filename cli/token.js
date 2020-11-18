const axios = require('./axiosInstance');
const fs = require('fs');
const inquirer = require('inquirer');

const questions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'What do you want to call your project?',
    },
];

const newProject = async () => {
    let token = JSON.parse(fs.readFileSync('auth.txt').toString())["access_token"]

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
#!/usr/bin/env node

const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'project name is:'
    },
    {
        type: 'input',
        name: 'version',
        message: 'project version is:'
    },
    {
        type: 'input',
        name: 'author',
        message: 'project author is:'
    }
]).then(answers => {
    console.log(answers);
    console.log(__dirname);
    const tempDir = path.join(__dirname, 'templates')
    const destDir = process.cwd();
    fs.readdir(tempDir, (err, files) => {
        if(err) throw err
        files.forEach(file => {
            console.log(file)
            ejs.renderFile(path.join(tempDir, file), answers, (err, result) => {
                if(err) throw err
                console.log(result);
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})
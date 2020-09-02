#!/usr/bin/env node
const parseArgs = require('minimist')

const parsed = parseArgs(process.argv.slice(2))

console.log(parsed)
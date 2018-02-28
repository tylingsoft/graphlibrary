#!/usr/bin/env node

var pkg = require('../../package.json')
console.log('module.exports = \'' + pkg.version + '\';')

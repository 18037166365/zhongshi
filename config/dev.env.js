'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PREFIX: '""',
  REDIRECT_URL: '"http://http://192.168.1.3:8089/#/client/login/index"'
})


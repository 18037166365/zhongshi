'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PREFIX: '""',
  REDIRECT_URL: '"http://0010.94lang.com/client/login/index"'
})


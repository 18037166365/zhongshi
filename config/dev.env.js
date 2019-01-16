'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  config: '"this is config form development"',
  BASE_URL: '"1"'
})
// 开发模式下env 是来自于这个文件  产品模式下是来自于 prod.env.js
// 比如说我在开发模式下想注入一个配置 叫config

//就需要这样写 然后我们去产品模式下进行配置,
// 你可以直接在这里配置

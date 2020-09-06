const merge = require('webpack-merge');
const devEnv = require('./dev.env');

module.exports = merge(devEnv, {
    root: '',
    domain: '',
    NODE_ENV: '"testing"'
});

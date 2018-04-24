const pluginTester = require('babel-plugin-tester')
const plugin = require('../index.js')

pluginTester({
    plugin,
    tests: {
        'works with custom prefix': {
            code: `var a = '!iconName'`,
            pluginOptions: { prefix: '!' },
            snapshot: true
        }
    }
})
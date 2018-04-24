const pluginTester = require('babel-plugin-tester')
const plugin = require('../index.js')

pluginTester({
    plugin,
    tests: {
        'transforms string expression': {
            code: `
                var a = '~iconName'
            `,
            snapshot: true
        },
        'transforms string in function': {
            code: `
                function foo() {
                    var a = '~iconName'
                }
            `,
            snapshot: true
        },
        'transforms string in jsx': {
            code: `
                function foo() {
                    return <icon name="~iconName"/>
                }
            `,
            snapshot: true
        },
        'doesn\'t generate duplicate imports': {
            code: `
                var a = '~iconName'
                var b = '~iconName'
                function foo() {
                    return <icon name="~iconName"/>
                }
            `,
            snapshot: true
        },
        'works with expressions': {
            code: `
                function foo() {
                    return <icon name={'~iconName'}/>
                }
            `,
            snapshot: true
        },
    }
})
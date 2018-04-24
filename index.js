module.exports = ({ types: t }) => ({
    name: 'transform-string-to-import',
    inherits: require('babel-plugin-syntax-jsx'),
    pre() {
        this.idents = {}
    },
    visitor: {
        StringLiteral(path, { opts: { prefix = '~' } }) {
            const { node } = path
            if (!node.value.startsWith(prefix)) return

            const file = path.findParent(path => path.parent.type === 'File')
            const requirePath = node.value.replace(prefix, '')
            if (!this.idents[requirePath]) {
                this.idents[requirePath] = file.scope.generateUidIdentifier(requirePath)
                file.unshiftContainer('body',
                    t.importDeclaration(
                        [t.importDefaultSpecifier(this.idents[requirePath])],
                        t.stringLiteral(requirePath)
                    )
                )
            }
            path.replaceWith(t.isJSXAttribute(path.parent)
                ? t.jSXExpressionContainer(this.idents[requirePath])
                : this.idents[requirePath])
        }
    }
})
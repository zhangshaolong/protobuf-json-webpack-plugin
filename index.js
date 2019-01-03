const pbjs = require('protobufjs/cli/pbjs')
const fs = require('fs')
const path = require('path')

const compileProtos = (inputs, output) => {

  pbjs.main(['-t', 'json'].concat(inputs), (err, content) => {
    if (!err) {
      try {
        fs.writeFileSync(output, JSON.stringify(JSON.parse(content)))
      } catch (e) {}
    }
  })
}

class Proto2JsonPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    if (compiler.hooks) {
      compiler.hooks.beforeCompile.tap('Proto2JsonPlugin', (compilation) => {
        compileProtos(this.options.inputs, this.options.output)
        console.log(`compile protos ${JSON.stringify(this.options.inputs)} done!`)
      })
    } else {
      compiler.plugin('compile', () => {
        compileProtos(this.options.inputs, this.options.output)
        console.log(`compile protos ${JSON.stringify(this.options.inputs)} done!`)
      })
    }
  }
}

module.exports = Proto2JsonPlugin
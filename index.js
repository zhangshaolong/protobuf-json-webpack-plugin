const pbjs = require('protobufjs/cli/pbjs')
const fs = require('fs')
const path = require('path')

const compileProtos = (inputs, output) => {

  pbjs.main(['-t', 'json'].concat(inputs), (err, content) => {
    if (!err) {
      try {
        fs.writeFileSync(output, generateJsonStruct(JSON.stringify(JSON.parse(content), null, 2)))
      } catch (e) {}
    }
  })
}

const generateJsonStruct = (content) => {
  return `import protobuf from 'protobufjs'\n
const struct = ${content}\n
export default protobuf.Root.fromJSON(struct)
`
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
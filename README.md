# protobuf-json-webpack-plugin
protobuf compile to json file

install
```javascript
  npm install protobuf-json-webpack-plugin --save-dev
```

webpack config
```javascript
const Proto2JsonPlugin = require('protobuf-json-webpack-plugin')


plugins: [
  new Proto2JsonPlugin(
    inputs: ['/a/b/c.proto', '/a/c/*.proto'],
    output: '/a/b/c/xxxx.json'
  )
]

```

js call
```javascript
const struct = require('${output js file path}')
const yyyy = struct.lookupType('xxx.Yyyy')
const jsData = yyyy.decode(data)
```
const path = require('path')
const fs = require('fs')

var Plugin = function(options) {
  this.options = options || {}
  // this.options.object = options.object || {}
  this.options.path = options.path || ''
  this.options.replace = options.replace || '/'
  this.options.filename = options.filename || 'site.webmanifest'
  this.options.pretty = options.pretty ? null : 2
}

Plugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', this.createObj.bind(this))
}

Plugin.prototype.createObj = function(compilation, callback) {
  const pkg = JSON.parse(fs.readFileSync('./package.json'))

  const source = JSON.stringify(
    JSON.parse(fs.readFileSync(this.options.source))
  ).replace(/{PUBLIC}/g, this.options.replace)

  const merged = Object.assign({}, JSON.parse(source), {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    author: pkg.author,
    homepage_url: pkg.homepage,
  })

  var json = JSON.stringify(merged, null, this.options.pretty)
  var output = path.join(this.options.path, this.options.filename)

  compilation.assets[output] = {
    source: function() {
      return json
    },
    size: function() {
      return json.length
    },
  }

  callback()
}

module.exports = Plugin
const getOptions = require('loader-utils').getOptions

/** Merge site.webmanifest with package.json data for PWA */
// const siteManifest = ({ source, dist }) => {
//   const pkg = JSON.parse(fs.readFileSync('./package.json'))
//   source = JSON.stringify(JSON.parse(fs.readFileSync(source)))
//   source = source.replace(/{PUBLIC}/g, PUBLIC)

//   const merged = Object.assign({}, JSON.parse(source), {
//     name: pkg.name,
//     description: pkg.description,
//     version: pkg.version,
//     author: pkg.author,
//     homepage_url: pkg.homepage,
//   })

//   const indent = PRODUCTION ? null : 2
//   const result = JSON.stringify(merged, null, indent) + '\n'
//   fs.writeFileSync(dist, result)
//   return result
// }

module.exports = function(source) {
  this.cacheable()

  const options = getOptions(this)
  const public = options.public || ''

  // console.log('THIS', this)

  const callback = this.async()
  source = source.replace(/{PUBLIC}/g, public)
  // fs.readFile(headerPath, 'utf-8', function(err, header) {
  //   if (err) return callback(err)
  callback(null, source)
  // })
}
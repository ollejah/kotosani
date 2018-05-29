const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const fs = require('fs')
const express = require('express')
const compression = require('compression')
const spdy = require('spdy')
const argv = require('yargs').argv
const stage = !!argv.stage

/**
 * App config
 */
const PORT = 5008
const PUBLIC = stage ? '/kotosani/' : '/'
const DIST = resolve('../dist/')
const app = express()
app.use(compression())

// const options = {
//   dotfiles: 'ignore',
//   etag: false,
//   index: false,
//   maxAge: '10d',
//   redirect: false,
//   // setHeaders: (res, path, stat) => {
//   //   res.set('x-timestamp', Date.now())
//   // }
// }

/**
 * https with spdy
 * https://publishing-project.rivendellweb.net/node-and-http-2/
 */
const options = {
  key: fs.readFileSync(resolve('../cert/server.key')),
  cert: fs.readFileSync(resolve('../cert/server.crt')),

  spdy: {
    protocols: ['h2', 'spdy/3.1', 'http/1.1'],
    plain: false,
    'x-forwarded-for': false,

    connection: {
      windowSize: 1024 * 1024, // Server's window size
      autoSpdy31: false,
    },
  },
}

/** Start Server */
spdy.createServer(options, app).listen(PORT, () => {
  console.log(`Server start ->
    at 🥁  ${Date().toLocaleString()}
    on 🔑  https://localhost:${PORT}${PUBLIC}
  `)
})

/**  Serve Static */
app.get(PUBLIC, (req, res) => res.sendFile(`${DIST}/index.html`))
app.use(PUBLIC, express.static(`${DIST}/`, options))
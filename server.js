const path = require('path')
const fs = require('fs')
const express = require('express')
const compression = require('compression')
const spdy = require('spdy')

const PUBLIC = __dirname + '/dist'

/**
 * App config
 */
const PORT = 5008
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
  key: fs.readFileSync(path.resolve(`${__dirname}/cert/server.key`)),
  cert: fs.readFileSync(path.resolve(`${__dirname}/cert/server.crt`)),

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
    on 🔑  https://localhost:${PORT}
  `)
})

/**  Serve Static */
app.get('/', (req, res) => res.sendFile(`${PUBLIC}/index.html`))
app.get('*', express.static(`${PUBLIC}/`, options))
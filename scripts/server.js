const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const fs = require('fs')
const express = require('express')
const compression = require('compression')
const spdy = require('spdy')


/**
 * App config
 */
const PORT = 5008
const PUBLIC = resolve('../dist/')
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
    on 🔑  https://localhost:${PORT}
  `)
})

/**  Serve Static */
app.get('/', (req, res) => res.sendFile(`${PUBLIC}/index.html`))
app.get('*', express.static(`${PUBLIC}/`, options))
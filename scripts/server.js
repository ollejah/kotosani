const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const fs = require('fs')
const express = require('express')
const compression = require('compression')
const spdy = require('spdy')

const argv = require('yargs').argv
const stage = !!argv.stage
const test = !!argv.test
const cypress = require('cypress')

/** 
 * Macos port mapping
 * https://salferrarello.com/mac-pfctl-port-forwarding/
 */
/*
1. Add to /etc/hosts
127.0.0.1 pwa.dev
::1   pwa.dev

2. Forward Port 80 and 443 with Mac pfctl Port Forwarding, cli:
echo "
rdr pass inet proto tcp from any to any port 80 -> 127.0.0.1 port 8080
rdr pass inet proto tcp from any to any port 443 -> 127.0.0.1 port 8443
" | sudo pfctl -ef -

3. Remove Port Forwarding
sudo pfctl -F all -f /etc/pf.conf && pfctl -s nat
*/

/**
 * App config
 */
const PORT = 8443
const PUBLIC = stage ? '/kotosani/' : '/'
const DIST = resolve('../dist/')
const app = express()
app.use(compression())

/**
 * https with spdy
 * https://publishing-project.rivendellweb.net/node-and-http-2/
 */
const options = {
  key: fs.readFileSync(resolve('../cert/server.key')),
  cert: fs.readFileSync(resolve('../cert/server.crt')),
  // dotfiles: 'ignore',
  // etag: false,
  // index: false,
  // maxAge: '10d',
  // redirect: false,
  // setHeaders: (res, path, stat) => {
  //   res.set('x-timestamp', Date.now())
  // }

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
  // kick off a cypress run
  return test && cypress.open()
})

/**  Serve Static */
app.get(PUBLIC, (req, res) => res.sendFile(`${DIST}/index.html`))
app.use(PUBLIC, express.static(`${DIST}/`, options))
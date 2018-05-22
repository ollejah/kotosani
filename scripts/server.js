const compression = require('compression')
const express = require('express')
// const proxy = require('http-proxy-middleware')

const PORT = 5000
const app = express()
app.use(compression())

const options = {
  dotfiles: 'ignore',
  etag: false,
  index: false,
  maxAge: '10d',
  redirect: false,
  setHeaders: (res, path, stat) => {
    res.set('x-timestamp', Date.now())
  }
}

const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const dist = resolve('../dist/')

app.get('/', (req, res) => res.sendFile(dist + 'index.html'))
app.use('/', express.static(dist, options))
// app.use('/', proxy({target: '/', changeOrigin: true}))

app.listen(PORT, () => {
  console.log(`Server start ->
    at 🥁  ${Date().toLocaleString()} 
    on 🔑  http://localhost:${PORT}
  `)
})
/**
 * Upload via vinyl-fs
 * https://github.com/morris/vinyl-ftp
 */

const fs = require('vinyl-fs')
const ftp = require('vinyl-ftp')

/** https://github.com/motdotla/dotenv */
const dotenv = require('dotenv').config()
const config = dotenv.parsed

/** @type {Object} ftp connect config */
const conn = new ftp({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  parallel: 10,
})

conn.rmdir(config.ROOT_DIR + '/**', () => {
  console.log('clean remote, start upload...')
  fs.src(['./dist/**'], { buffer: false }).pipe(conn.dest(config.ROOT_DIR))
})
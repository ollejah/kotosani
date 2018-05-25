/**
 * Upload via vinyl-fs
 * https://github.com/morris/vinyl-ftp
 */

const fs = require('vinyl-fs')
const ftp = require('vinyl-ftp')

/** pass args */
const argv = require('yargs').argv
const stage = !!argv.stage
const ENV_PATH = stage ? '.env.stage' : '.env'

/** https://github.com/motdotla/dotenv */
const config = require('dotenv').config({ path: ENV_PATH }).parsed

/** build dir for upload */
const DIR = stage ? 'docs' : 'dist'

/** Connect config */
const conn = new ftp({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  parallel: 10,
})

conn.rmdir(config.ROOT_DIR + '/**', () => {
  console.log('clean remote, start upload...')
  fs.src([`./${DIR}/**`], { buffer: false }).pipe(conn.dest(config.ROOT_DIR))
})
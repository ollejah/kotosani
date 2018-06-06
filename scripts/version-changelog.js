'use strict'

const { exec } = require('child_process')
const execCallback = require('./execCallback')

// Get type of release: patch, minor, major...
const release = JSON.parse(process.env.npm_config_argv).original.pop()

// $ changelog -p && git add CHANGELOG.md && git commit -m 'updated CHANGELOG.md' && npm version patch && git push origin && git push origin --tags
const runScript = opts =>
	exec(
		`changelog ${opts} && git add CHANGELOG.md && git commit -m 'updated CHANGELOG.md'`,
		(err, stdout, stderr) => execCallback(err, stdout, stderr)
	)

switch (release) {
	case 'patch':
		runScript('-p')
		break
	case 'minor':
		runScript('-m')
		break
	case 'major':
		runScript('-M')
		break
	default:
		exec(`exit 1`)
}

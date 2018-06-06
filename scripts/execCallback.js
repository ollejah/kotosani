'use strict'

module.exports = function execCallback(error, stdout, stderr) {
	if (error) {
		console.error(`exec error: ${error}`)
		error = true
		return
	}
	console.log(`stdout: \n${stdout}`)
	!!stderr && console.log(`stderr: \n${stderr}`)
}
'use strict'

const { exec } = require('child_process')
const workingBranch = require('git-branch').sync()
const execCallback = require('./execCallback')

let error = false

if (workingBranch !== 'master') {
	console.log(` Current branch is [${workingBranch}], switch to [master]`)

	exec(`git checkout master`, (error, stdout, stderr) => {
		execCallback(error, stdout, stderr)

		if (!error) {
			exec(
				`git merge --no-ff --no-edit ${workingBranch}`,
				(error, stdout, stderr) => {
					execCallback(error, stdout, stderr)
					console.log(` Merge [develop] into [master]`)
				}
			)
		}
	})
}

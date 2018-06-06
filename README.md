# КотоСани
_Первое в Сочи антикафе с котиками_

Demo: [https://ollejah.github.io/kotosani/]()

### Setup

**Install nodejs, npm or yarn, git, VSCode and follow instruction...**

* Install Yarn [https://yarnpkg.com/en/docs/install#alternatives-tab]()
`curl -o- -L https://yarnpkg.com/install.sh | bash`

* Install dependencies 
`yarn install` or `npm install`

Make SSL certificate for PWA stage locally `server.key, server.crt`.
CLI `node scripts/server.js`, see `scripts/server.js`

### Development

git branch develop

* Build and run your project locally `yarn start`
* Run dev-server `yarn dev`

### Production

* Bump version `yarn patch|minor|major`
* Manual build `yarn build`

Make copy from `env.example` to `.env`, add config for access to remote server (for upload, etc.):

```
HOST = 'localhost'
USER = ''
PASSWORD = ''
PUBLIC = '/home/www'
```

* Manual  deploy code to remote server `yarn deploy`

### Stage `gh-pages` or custom domain

* Build `yarn stage:build`
* Run locally `yarn stage:start`
* Deploy to branch `gh-pages` only build files -> `yarn stage:deploy`
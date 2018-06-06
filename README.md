# КотоСани
_Первое в Сочи антикафе с котиками_

Demo: [https://ollejah.github.io/kotosani/]()

### Setup

* Install Yarn [https://yarnpkg.com/en/docs/install#alternatives-tab]()
`curl -o- -L https://yarnpkg.com/install.sh | bash`

* Install dependencies 
`yarn`

Make SSL certificate for PWA stage host `server.key, server.crt`.
CLI `node scripts/server.js`, see `scripts/server.js`

### Development

* Build and run your project locally `yarn start`
* Run dev-server `yarn dev`

### Production

* Bump version `yarn patch|minor|major`
* Manual build `run build `yarn build`

Make copy from `env.example` to `.env`, add config for access to remote server (for upload, etc.):

```
HOST = 'localhost'
USER = ''
PASSWORD = ''
PUBLIC = '/home/www'
```

* Deploy code to repo `yarn deploy`
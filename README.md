![mongodb](https://www.ambientelivre.com.br/media/k2/items/cache/e9432fccf28a953514f077b86e5e657a_L.jpg)


[![codecov](https://codecov.io/gh/danizavtz/tokenAuthMongo/branch/master/graph/badge.svg?token=WC3VXD6KTJ)](https://codecov.io/gh/danizavtz/tokenAuthMongo)
# tokenAuthMongo
generate jwt token and persist in mongodb

## Instructions to run

1. Copy a env-sample to .env
`$ cp env-sample .env`
2. Fill in the variables with your environment configuration
3. Install dependencies
`$ npm install`
4. Seed the database
`$ npm run seeddb`
5. Just start the server
`$npm run start`

## Run tests and coverage

1. Unit tests
`$ npm t`
2. Coverage tests
`npm run coverage`
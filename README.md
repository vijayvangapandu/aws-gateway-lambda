# aws lambda gateway
The lambda implementation of the public api to photo service integraton.
 

To run mocha tests:
```
cd src
npm run test
```

To deploy to an environment, you will need an aws cli installed.
To deploy to dev run:
```
cd src
npm run deploy
```

To deploy to prod run:
```
cd src
npm run deploy-prod
```

To release a new version run:
```
cd src
npm run release
```

Then manually update the version in packages.json to the next version.

How to test?
curl -iv -H "Authorization: Bearer 901df9a3-6b38-4a5a-a146-1532afaeda2a" https://thpfdcy0sl.execute-api.us-west-2.amazonaws.com/qa/PhotoDataSave
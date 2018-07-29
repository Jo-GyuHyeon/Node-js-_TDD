const app = require('../index');
const syncDb = require('./sync-db');

syncDb().then(_=>{
  console.log('Sync databases!');
  app.listen(3000,() =>{
    console.log('Example app listening on port 3000');
  });
});


const mb = require('mountebank');
const mbHelper = require('mountebank-helper');
const config = require('./config');

const firstImposter = new mbHelper.Imposter({
    'mountebankPort': 5000,
    'imposterPort' : 5001
});
 
const sample_response = {
    'uri' : '/hello',
    'verb' : 'GET',
    'res' : {
      'statusCode': 200,
      'responseHeaders' : { 'Content-Type' : 'application/json' },
      'responseBody' : JSON.stringify({ 'hello' : 'world' })
    }
  };

firstImposter.addRoute(sample_response);

mb.create({
  port: config.port,
  pidfile: '../mb.pid',
  logfile: '../mb.log',
  protofile: '../protofile.json',
  ipWhitelist: ['*']
}).then(() => {
  firstImposter.postToMountebank()
  .then( () => {
    console.log('Imposter Posted! Go to http://localhost:3000/hello');
  });
});

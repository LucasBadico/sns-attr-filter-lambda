'use strict';

module.exports.createPaymentAccount = (event, context, callback) => {
    console.log('took the received data', event)
    console.log('use the topaz client to create a bank account')
    console.log('save the bank account on payment account domain')
  return callback(
    JSON.stringify({
      message: 'job done!',
    }),
  );

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

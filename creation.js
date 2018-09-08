'use strict';

module.exports.sendConfirmationEmail = async (event, context, callback) => {
    console.log('took the account data', event)
    console.log('use the verification event domain to generate 3 tokens')
    console.log('send the tokens to inspiring cli')
    return callback(
        JSON.stringify({
            message: 'job done!',
        }),
    );

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

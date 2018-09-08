const AWS = require('aws-sdk')
let sns = new AWS.SNS({
    region: 'us-east-1'
})

const publish_sns = (params, callback) => {
    sns.publish(params).promise().then(done => {
      console.log(JSON.stringify(done))
      callback(done)
    }).catch(error => {
      console.log(JSON.stringify(error))
      callback(error)
    })
  }

  const with_attribute = (callback) => {
    const topicArn = process.env['TOPIC_ARN']
    console.log(`publishing to topic: ${topicArn}`)
    const params = {
      Message: 'should be received',
      MessageAttributes: {
        'kind': {
          DataType: 'String',
          StringValue: 'creation-done'
        }
      },
      Subject: "Successful message",
      TopicArn: topicArn
    }
  
    publish_sns(params,callback)
  
  }

with_attribute(console.log)
const AWS = require("aws-sdk");
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  const testEmail=(text) => { 
    
console.log(text)

const ses = new AWS.SES({ apiVersion: "2010-12-01" });
const params = {
  Destination: {
    ToAddresses: ["ajayranjan@live.com", "erajayranjan@gmail.com"] // Email address/addresses that you want to send your email
  },
  ConfigurationSetName: process.env.CONFIGURATION_SET_NAME, //"<<ConfigurationSetName>>",
  Message: {
    Body: {
      Html: {
        // HTML Format of the email
        Charset: "UTF-8",
        Data:
          "<html><body><h1>Hello  Ajay Ranjannn(H1)</h1><p style='color:red'>Thank you for contacting BonzerCode. This is an informative mail as you have registered a callback request to us.</p> <p>Time 1517831318946</p></body></html>"
      },
      Text: {
        Charset: "UTF-8",
        Data: "Hello Ajay Ranjann Sample description time 1517831318946"
      }
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Test email sent for providing just formal details of contact!!!"
    }
  },
  Source: "info@bonzercode.com"
};

const sendEmail = ses.sendEmail(params).promise();

sendEmail
  .then(data => {
    console.log("email submitted to SES", data);
  })
  .catch(error => {
    console.log(error);
  });

}

  module.exports=testEmail

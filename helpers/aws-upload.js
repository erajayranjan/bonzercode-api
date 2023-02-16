const AWS = require('aws-sdk');
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
const s3 = new AWS.S3({});

/**
 * @description Uploads an image to S3
 * @param imageName Image name
 * @param base64Image Image body converted to base 64
 * @param type Image type
 * @return string S3 image URL or error accordingly
 */
async function upload(imageName, base64Image, type) {
    const params = {
        Bucket: `${BUCKET_NAME}/images`,
        Key: imageName,
        Body: new Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
        ContentType: type
    };

    let data;

    try {
        data = await promiseUpload(params);
    } catch (err) {
        console.error(err);

        return "";
    }

    return data.Location;
}

/**
 * @description Promise an upload to S3
 * @param params S3 bucket params
 * @return data/err S3 response object
 */
function promiseUpload(params) {
    return new Promise(function (resolve, reject) {
        s3.upload(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = {upload};











// // Load the SDK and UUID
// var AWS = require('aws-sdk');
// var uuid = require('uuid');

// // Create unique bucket name
// var bucketName = 'node-sdk-sample-' + uuid.v4();
// // Create name for uploaded object key
// var keyName = 'hello_world.txt';

// const uploader=()=> {

//     // Create a promise on S3 service object
//     var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();
    
//     // Handle promise fulfilled/rejected states
//     bucketPromise.then(
//       function(data) {
//         // Create params for putObject call
//         var objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
//         // Create object upload promise
//         var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
//         uploadPromise.then(
//           function(data) {
//             console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//           });
//     }).catch(
//       function(err) {
//         console.error(err, err.stack);
//     });
// }

// module.exports=uploader
const AWS = require('aws-sdk');
const uuid = require('node-uuid');
const fs = require('fs');
const s3 = new AWS.S3();
//AWS.config.update({region: 'us-east-1'});

//specify version so it doesn't get fckd up and try to pick on its own
AWS.config.apiVersions = {
  rekognition: '2016-06-27',
};

//my bucket i want to create / use
var bucketName = 'rekog-assets';

//////
// TODO: add stuff here to check if bucket exists first
// instead of relying on it to check on its own
/////

//create bucket
s3.createBucket({Bucket: bucketName}, function(){
	//what we're gonna upload to bucket
	var file = '../assets/runners.jpg';
	var keyName = 'runners';
	var params = {
		Bucket: bucketName, 
		Key: keyName, 
		Body: fs.createReadStream(file)
	};
	//upload to bucket
	s3.putObject(params, function(err, data) {
    if (err)
      console.log(err, err.stack);
    else
      console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
  });
});

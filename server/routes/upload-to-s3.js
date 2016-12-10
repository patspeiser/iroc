var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs');
//AWS.config.update({region: 'us-east-1'});

//specify version so it doesn't get fckd up and try to pick on its own
AWS.config.apiVersions = {
  rekognition: '2016-06-27',
};

//new s3 instance
var s3 = new AWS.S3();

//my bucket
var bucketName = 'rekog-assets';

//////
// add stuff here to check if bucket exists first
/////

//create bucket
s3.createBucket({Bucket: bucketName}, function(){
	//what we're gonna upload to bucket
	var file = '../assets/horses.jpg';
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



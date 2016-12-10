const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const uuid = require('node-uuid');
const rekognition = new AWS.Rekognition();

//specify version so it doesn't get fckd up and try to pick on its own
AWS.config.apiVersions = {
  rekognition: '2016-06-27',
};

//new s3 instance
const s3 = new AWS.S3();

//my bucket
var bucketName = 'rekog-assets';

var params = {
	Image: {
		S3Object: {
			Bucket: bucketName,
			Name: 'horses'
		}
	},
	MaxLabels: 100,
};

rekognition.detectLabels(params, function(err, data){
	if (err) console.log(err);
	else console.log(data);
});
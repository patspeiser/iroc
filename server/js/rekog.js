//amazon requirements
const AWS = require('aws-sdk');
const uuid = require('node-uuid');
const fs = require('fs');
const s3 = new AWS.S3();

// config AWS SDK
AWS.config.update({region: 'us-east-1'});
AWS.config.apiVersions = {
	rekognition: '2016-06-27',
};


// using rekognition endpoint so make a new instance of it
const rekognition = new AWS.Rekognition();

// our server uses these
const router = require('express').Router();
const request = require('request');
const Promise = require('bluebird');
const socket = require('socket.io-client')(process.env.SOCKET_SERVER || 'http://localhost:3000');

// database models
const Asset = require('../db').models.Asset;
const Bucket = require('../db').models.Bucket;
const Label = require('../db').models.Label;

//////////////////////////////////////
// end config                      //
////////////////////////////////////

module.exports = Rekog;

function Rekog(){}

//////////////
// Gets labels for objects in asset.image provided
// asset => { bucket: s3Bucket, image: imageNameOnS3, maxLabels: numberOfResults }
/////////////
Rekog.prototype.createRekogObject = function(asset){
	return Bucket.findById(asset.bucketId)
	.then(function(bucket){
		// the image is an s3 object so tell it how to find it
		var params = {
			Image: {
				S3Object: {
					Bucket: bucket.name,
					Name: asset.name,
				}
			},
			MaxLabels: asset.maxLabels || 100,
		};

		// the actual API request to amazon. returns a promise so we can use .then() 
		return new Promise(function(resolve, reject) {
			rekognition.detectLabels(params, function(err, data){
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	});
};

////////////
// Upload an asset to S3
// asset => { url: urlToImage, bucket: s3bucket, name: nameOfImage } 
///////////
Rekog.prototype.uploadToS3 = function(asset){
		//returns a promise
		return new Promise(function(resolve, reject){
			//fetches image from req.body.url and converts to buffer
			request({
				url: asset.url,
				encoding: null
			}, function(err, res, body) {
				//once i've got the buffer (body) i can send to s3 below
				if (err)

				//TODO: add check for image size. must be <5mb
				console.log('############5');
				//create bucket
				s3.createBucket({Bucket: asset.bucket}, function(){
					//what we're gonna upload to bucket
					var params = {
						Bucket: asset.bucket, 
						Key: asset.name,
						Body: body
					};
					//upload to bucket
					s3.putObject(params, function(err, data) {
						if (err){
							console.log(err);
							reject(err, err);
						} else {
							var payload = {
								image: asset.url,
								name: asset.name,
								bucket: asset.bucket,
								awsId: data.ETag
							};
							//this is what is returned if the request is successful
							resolve(payload);
						}
					});
				});
			});
		});
};

///////////////////////////
// get bucket contents   //
//////////////////////////
Rekog.prototype.getBucketContents = function(bucket){
	console.log(bucket);
	return new Promise(function(resolve, reject){
		var params = {
			Bucket: bucket
		};
		s3.listObjects(params, function(err, data){
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};


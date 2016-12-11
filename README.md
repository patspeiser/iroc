# iroc 

may need to run this: npm install -g pg sequelize 

Also will need a database named "iroc"

can toggle the SYNC var in the server.js file to seed the db tables. set it back to false to prevent overwriting data

npm install

npm run start:dev (to start the server if needed) locally will run http://localhost:3000/

API endpoint info:

#Assets:
- GET /api/assets  
- GET /api/assets/:id
- GET /api/assets/:id/labels
- GET /api/assets/all/labels

#Labels: 
- GET /api/labels
- GET /api/labels/:id
- GET /api/labels/:id/assets
- GET /api/labels/all/assets

#Buckets
- GET /api/buckets
- GET /api/buckets/:id
- GET /api/buckets/:id/assets
- GET /api/buckets/:id/assets/labels
- GET /api/buckets/all/assets
- GET /api/buckets/all/assets/labels

#Rekognitions
- POST /api/rekognition/:assetId   => **__req.body {image: imageName, bucket: bucketName, maxLabels: maxLabels}__**
- GET /api/rekognition/:id

#S3
- POST /api/s3/  => **__req.body {bucket: bucket, name: name, url: url} __**

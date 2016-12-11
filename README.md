# iroc 

may need to run this: npm install -g pg sequelize 

Also will need a database named "iroc"

can toggle the SYNC var in the server.js file to seed the db tables. set it back to false to prevent overwriting data

npm install

npm run start:dev (to start the server if needed) locally will run http://localhost:3000/

API endpoint info:

#Assets:
- /api/assets  
- /api/assets/:id
- /api/assets/:id/labels
- /api/assets/all/labels

#Labels: 
- /api/labels
- /api/labels/:id
- /api/labels/:id/assets
- /api/labels/all/assets

#Buckets
- /api/buckets
- /api/buckets/:id
- /api/buckets/:id/assets
- /api/buckets/:id/assets/labels
- /api/buckets/all/assets
- /api/buckets/all/assets/labels

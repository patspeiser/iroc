var router = require('express').Router();
module.exports = router;

//api routes need to be listed here
router.use('/rekog', require('./rekognition.js'));
router.use('/s3', require('./s3.js'));

router.get('/', function(req, res, next){
	res.send('/api');
});

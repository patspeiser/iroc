const env = process.env.NODE_ENV || 'dev_aws';
const config = require('../../config')[env];
const Sequelize = require('Sequelize');
const db = new Sequelize(config.database.db, config.database.user, config.database.password, {
	host: config.database.host,
	dialect: 'postgres'
});

const Bucket = db.define('bucket', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

const Asset = db.define('asset', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image: {
		type: Sequelize.STRING,
		allowNull: false
	},
	awsId: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

const Label = db.define('label', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	confidence: {
		type: Sequelize.FLOAT,
		allowNull: false
	}
});

Bucket.hasMany(Asset);
Asset.belongsTo(Bucket);

Asset.hasMany(Label);
Label.belongsTo(Asset);

module.exports = {
	db: db,
	models: {
		Asset: Asset,
		Label: Label,
		Bucket: Bucket
	}
};
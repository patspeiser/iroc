const Sequelize = require('Sequelize');
const db = new Sequelize(process.env.DATABASE_URL, {

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

const Bucket = db.define('bucket', {
	name: {
		type: Sequelize.STRING,
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
}
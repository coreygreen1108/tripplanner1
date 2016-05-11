var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/trip-planner', {
	logging: false
});

var Place = db.define('place', {
	address: {
		type: Sequelize.STRING
	},
	city: {
		type: Sequelize.STRING
	},
	state: {
		type: Sequelize.STRING
	},
	phone: {
		type: Sequelize.STRING
	},
	location: {
		type: Sequelize.ARRAY(Sequelize.FLOAT, Sequelize.FLOAT),
		allowNull: false
	}
});

var Hotel = db.define('hotel', {
	name: {
		type: Sequelize.STRING
	},
	num_stars: {
		type: Sequelize.FLOAT,
		validate: {min: 1, max: 5}
	},
	amenities: {
		type: Sequelize.STRING
		// type: Sequelize.ARRAY(Sequelize.STRING),
		// get: function(){
		// 		if (this.getDataValue('amenities')) return this.getDataValue('amenities').join(', ');
		// 		else return null;
		// 	},
		// set: function(str){
		// 		this.setDataValue('amenities', str.split(',')); 	
		// }
	}
});


var Activity = db.define('activity', {
	name: {
		type: Sequelize.STRING
	},
	age_range: {
		type: Sequelize.STRING
		// validate: {is: /\d+-\d+/}
	}
});

var Restaurant = db.define('restaurant', {
	name: {
		type: Sequelize.STRING
	},
	cuisine: {
		type: Sequelize.STRING
		// Sequelize.ARRAY(Sequelize.STRING),
		// get: function(){
		// 		if (this.getDataValue('amenities')) return this.getDataValue('amenities').join(', ');
		// 		else return null;
		// 	}
	},
	price: {
		type: Sequelize.INTEGER,
		validate: {min: 1, max: 5}
	}
});

Activity.belongsTo(Place);
Restaurant.belongsTo(Place);
Hotel.belongsTo(Place);

//
console.log(db.models.place); 
module.exports = {
	Place, Hotel, Activity, Restaurant, db
}

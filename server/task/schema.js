var mongoose = require('mongoose');
var Schema = mongoose.Schema({
	name: String,
	description: String,
	time: Number,
	date: Number,
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	moderators: [{type: mongoose.Schema.Types.ObjectId, sparse: true, ref: 'User'}],
	url: {type: String, unique: true, sparse: true, trim: true}
});

Schema.methods.create = function(obj, user, sd) {
	this.author = user._id;
	this.moderators = [user._id];
	this.name = obj.name;
	this.description = obj.description;
	this.time = obj.time;
	this.date = obj.date;
}

module.exports = mongoose.model('Task', Schema);
const User = require(__dirname + '/schema.js');
module.exports = async function(waw) {
	waw.file('user', {
		rename: (req)=>{
			return req.user._id+'.jpg'
		},
		ensure: waw.ensure,
		process: async (req, res) => {
			const user = await User.findOne({
				_id: req.user._id
			});
			user.thumb = req.files[0].url;
			await user.save();
			res.json(user.thumb);
		}
	});
	var select = function(){
		return '-password -resetPin -resetCounter -resetCreate';
	}
	waw.crud('user', {
		get: {
			ensure: waw.next,
			query: function(){
				return {};
			},
			select: select
		},
		fetch: [{
			ensure: waw.next,
			query: function(req){
				return {
					_id: req.body._id
				}
			},
			select: select
		},{
			name: 'me',
			query: function(req){
				return {
					_id: req.user._id
				}
			},
			select: select
		}],
		update: [{
			query: function(req, res, next) {
				return {
					_id: req.user._id
				}
			}
		}, {
			name: 'admin',
			ensure: waw.role('admin'),
			query: function(req, res, next) {
				return {
					_id: req.body._id
				}
			}
		}],
		delete: {
			name: 'admin',
			ensure: waw.role('admin'),
			query: function(req, res, next) {
				return {
					_id: req.body._id
				}
			}
		}
	});
};

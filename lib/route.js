import { ContactList } from '../imports/api/contacts.js'; 

FlowRouter.route('/',{
	action: function() {
		console.log(`You're on home page`);
		BlazeLayout.render('homeLayout', {
			input: 'adddata',
			table: 'display',
		});
	}
});


FlowRouter.route('/:_id',{
	action: function(params) {
		console.log(`You're on show page`)
		console.log(params._id)
		var Id = params._id;
		BlazeLayout.render('showpage', {Id: Id});
		// ContactList.findOne( _id : params._id, function(err, foundItem){
		// 	if(err){
		// 		console.log('error found' + err);
		// 	} else {
		// 		console.log(foundItem)
		// 		BlazeLayout.render('showpage', {Id: foundItem});
		// 	}
		// });
	},
	name: 'root'
});



import { ContactList } from '../imports/api/contacts.js'; 
import { Meteor } from 'meteor/meteor';

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
	var currentUSer = Meteor.userId();
		if(currentUSer){
		console.log(`You're on show page`)
		console.log(params._id)
		var Id = params._id;
		BlazeLayout.render('showpage', {Id: Id});
	} else {
		FlowRouter.go('/');
		FlashMessages.sendError("You must be Logged-in to do that!!");
	}	 
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



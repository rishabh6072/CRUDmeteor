import { Mongo } from 'meteor/mongo';

export const ContactList = new Mongo.Collection('contacts');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('contacts', function tasksPublication() {
    return ContactList.find({
    	$or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}
 

Meteor.methods({
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
    'contacts.setPrivate'(contactId, setToPrivate) {
    check(contactId, String);
    check(setToPrivate, Boolean);
 
    const contact = ContactList.findOne(contactId);
 
    // Make sure only the task owner can make a task private
    if (contact.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.update(contactId, { $set: { private: setToPrivate } });
  },
});
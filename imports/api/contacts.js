import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
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
    'contacts.setPrivate'(contactId, setToPrivate) {
    check(contactId, String);
    check(setToPrivate, Boolean);
 
    const contact = ContactList.findOne(contactId);
    
    ContactList.update(contactId, { $set: { private: setToPrivate } });
  },
});
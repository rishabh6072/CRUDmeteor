import { Mongo } from 'meteor/mongo';

export const ContactList = new Mongo.Collection('contacts');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('contacts', function tasksPublication() {
    return ContactList.find();
  });
}
 
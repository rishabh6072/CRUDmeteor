import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';

import '../imports/startup/accounts-config.js';
import './main.html';
// import '../lib/route.js';
import { ContactList } from '../imports/api/contacts.js'; 
require('bootstrap');

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('contacts');
});
Template.adddata.events({
    'submit .add' : function(event){
        event.preventDefault();
        console.log("form submitted");
        var NameVar = event.target.name.value;
        var CityVar = event.target.city.value;
        var AgeVar = event.target.age.value;
        ContactList.insert({
            name: NameVar,
            city: CityVar,
            age: AgeVar,
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
        event.target.name.value = "";
        event.target.city.value = "";
        event.target.age.value = "";  
    }, 
    'submit .update' : function(event){
        var NameVar = event.target.name.value;
        event.preventDefault();
        console.log(NameVar);
        var CityVar = event.target.city.value;
        var AgeVar = event.target.age.value;
        var selectedContact = Session.get('selectedContact');
        ContactList.update({ _id: selectedContact }, { $set: {"name": NameVar, "city" : CityVar, "age" : AgeVar }});
        event.target.name.value = "";
        event.target.city.value = "";
        event.target.age.value = "";
        Session.set('selectedItem1', '');



        var updateId = Session.get('selectedContact');
        Session.set('selectedContact2', updateId);        
        Session.set('selectedContact', '');
        //For updating effects
        // console.log(updateId);
        setTimeout(function(){ Session.set('selectedContact2', ''); }, 1500);
    },
    'reset form' : function(event){
      Session.set('selectedItem1', ''); 
      Session.set('selectedContact', '');
      Session.set('selectedContact2', '');
    }  
});


Template.display.events({
      'click .delete' : function(event) {
        
       var contactId = this._id;
       Session.set('selectedContact', contactId);
       var selectedContact = Session.get('selectedContact');
       ContactList.remove({ _id: selectedContact });
       // FlashMessages.sendError("Item Deleted!!");
       Session.set('selectedContact', '');
      },
      'click .edit' : function(event) {
       var contactId = this._id;
       Session.set('selectedContact', contactId);
       Session.set('selectedContact2', contactId);
       // var selectedContact = Session.get('selectedContact');
       // console.log(selectedContact);
       var test = ContactList.findOne({ _id: contactId });
       console.log(test);
         Session.set('selectedItem1', test.name); 
         Session.set('selectedItem2', test.city); 
         Session.set('selectedItem3', test.age); 
      },
      // 'click .show' : function(event) {
      //  var contactId = this._id;
      //  Session.set('selectedContact', contactId);
      // },

      //SORTING 
      'click .thname' : function(event) {
        var a = ContactList.find({}, { sort: {age: -1}});
        Session.set('thname', true);
        Session.set('thcity', false);
        Session.set('thage', false);
        console.log("you clicked on thname" + a )
      },
      'click .thcity' : function(event) {
        var a = ContactList.find({}, { sort: {age: -1}});
        Session.set('thname', false);
        Session.set('thcity', true);
        Session.set('thage', false);
        console.log("you clicked on thcity" + a )
      },
      'click .thage' : function(event) {
        var a = ContactList.find({}, { sort: {age: -1}});
        Session.set('thname', false);
        Session.set('thcity', false);
        Session.set('thage', true);
        console.log("you clicked on thage" + a )
      },
       'click .toggle-private'() {
        Meteor.call('contacts.setPrivate', this._id, !this.private);
      },
     
});


Template.display.helpers({
   'contact' : function(){
    var currentUserId = Meteor.userId();
       var thname = Session.get('thname');
       var thcity = Session.get('thcity');
       var thage = Session.get('thage');
        if(thname) {
          return ContactList.find({}, { sort: {name: 1}});
        } else if(thcity){
          return ContactList.find({}, { sort: {city: 1}});
        } else if(thage){
          return ContactList.find({}, { sort: {age: 1}});
        } else if(currentUserId) {
          return ContactList.find({}, { sort: {age: 1}});
        } else {
          return ContactList.find({}, { sort: {age: 1}});
          // return ContactList.find({$and: [{_id: {$ne: currentUserId}}, {private: true}]});
        }

   },
   'selecedClass' : function(){
       var selectedClass = Session.get('selectedContact');
        if(selectedClass){
            return "selected"
        }
   },
 //For updating effects
   'updatedClass' : function() {
      var updated = Session.get('selectedContact2');
      return updated;
   },
  
});


Template.adddata.helpers({
  'nm' : function(){
       return Session.get('selectedItem1');
   },
   'ct' : function(){
       return Session.get('selectedItem2');
   },
   'ag' : function(){
       return Session.get('selectedItem3');
   },
   'id' : function(){
      return Session.get('selectedContact')
   }, 
   // 'myFunction' : function() {
   //  setTimeout(function(){ alert("Hello"); }, 3000);
   // },
});

Template.registerHelper('equals', function (a, b) {
      return a === b;
    });




// FlowRouter.route('/', {
//   action(params, queryParams) {
//     console.log("Looking at a Crud page?");
//   }
// });

// FlowRouter.route('/page2/:_id', {
//   name: 'Lists.show',
//   action(params, queryParams) {
//     console.log("Looking at a page2?");
//   }
// });



Template.showpage.helpers({
  'show': function(){
    var Id = FlowRouter.getParam('_id');
    // console.log(Id);
    // var a = ContactList.findOne({ _id :Id });
    // console.log(a);
    // console.log(Template.instance());
    return ContactList.findOne({ _id :Id });
  },

});



// FLash Messages Config
  FlashMessages.configure({
    autoHide: true,
    hideDelay: 4000,
    autoScroll: true
  });
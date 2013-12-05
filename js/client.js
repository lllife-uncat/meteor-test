// Define database collections.
// This app has only one.
Messages = new Meteor.Collection("Messages");

// Client logic.
if(Meteor.isClient) {

    // Return message from database.
    // Binding messages value into "messages" template.
    // See view/messages.html
    Template.messages.messages = function () {
        return Messages.find({}, { sort: { timestamp: -1}, limit: 20 });
    };

    // Register event for "input" template. 
    // See ui in view/input.html.
    Template.input.events ({
        'click #send' : function() {
            var message = $('#newMessage').val();
            var username = $('#username').val();

            if(!message || !username) { alert('Fill out both field yo!'); }

            var message = new Message(username, message);
            Meteor.saveMessage(message);
        },
    });

    // Register event for "message" template.
    // See ui in view/message.html.
    Template.message.events({
        'click #twitter' : function() {
            Meteor.call('incTwitter', this._id);
        },
        'click #googlePlus' : function() {
            Meteor.call('incGooglePlus', this._id);
        },
        'click #facebook' : function() {
            Meteor.call('incFacebook', this._id);
        },
        'click #remove' : function() {
            Meteor.call('remove', this._id);
        },
    } );

    // Init subscription.
    Meteor.autorun(function() { Meteor.subscribe("Messages"); });

    // Save message hander.
    Meteor.saveMessage = function(message) {
        Messages.insert(message, function(err, id) { 

            // After insert.
            // Show message if something wrong.
            if(err){ alert('Something defnitely went wrong!'); } 

            // Clear ui if ok.
            if(id) { 
                // Log.
                console.log("Insert ok.");
                console.log(id);
                $('#newMessage').val(''); 
            }
        });
    };

}


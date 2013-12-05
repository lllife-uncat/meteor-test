
// Define database collections.
//Messages = new Meteor.Collection("Messages");

// Server side.
if(Meteor.isServer) {
    Meteor.startup(function() { console.log('Server startup.'); });

    Meteor.publish('Messages', function() { return Messages.find(); });

    Messages.allow( {
        'insert': function(userId, doc) { return true;},
        'remove': function(userId, doc) { return false; }
    });
    
    function incFacebook(id) {
        Messages.update(id, { $inc : { 'facebook' : 1}});
    }

    function incTwitter(id) {
        Messages.update(id, { $inc : { 'twitter' : 1 }} );
    }

    function incGooglePlus(id) {
        Messages.update(id, { $inc : { 'googlePlus' : 1 }});
    }

    function remove(id) {
        Messages.remove(id);
    }


    Meteor.methods({ 
        remove : remove,
        incFacebook : incFacebook, 
        incGooglePlus : incGooglePlus,
        incTwitter : incTwitter });
}

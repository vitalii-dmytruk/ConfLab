define([
    'backbone',
    'backbone.radio',
    'auth/User'
], function(Backbone, Radio, User) {

    return Backbone.Model.extend({
        defaults: {
            error: ''
        },

        initialize: function() {
            this.user = new User();
            this.channel = Radio.channel('auth');

            this.listenTo(this.user, 'change', this.notifyUserChanged);
        },

        initSessionUser: function() {
            this.user.fetch();
        },

        signIn: function(username, password) {
            var self = this;
            new User(username, password).fetch({
                headers: {
                    'Authorization': 'Basic ' + btoa(username + ':' + password)
                },
                success: _.bind(self.onSignIn, self)
            });
        },

        signOut: function() {
            var self = this;
            $.ajax({
                url: 'http://localhost:8080/logout',
                type: 'POST',
                success: _.bind(self.onSignOut, self)
            });
        },

        onSignIn: function(userData) {
            this.user.set(userData.toJSON());
            Backbone.history.navigate('', {trigger: true});
        },

        onSignOut: function() {
            Backbone.history.navigate('', {trigger: true});
            this.user.clear();
        },

        notifyUserChanged: function() {
            this.channel.request('onSessionUserChange', this.user.toJSON());
        }
    });
});
define([
    'backbone',
    'common/Service',
    'session/SessionModel'
], function (Backbone, Service, SessionModel) {

    'use strict';

    return Service.extend({

        channelName: 'session',

        initialize: function () {
            this.session = new SessionModel();
            this.start();
        },

        onStart: function () {
            this.channel.reply({
                getSession: this.session,
                signIn    : this.onSignIn,
                signOut   : this.onSignOut
            }, this);
        },

        onSignIn: function (username, password) {
            var session = this.session;

            session.fetch({
                headers: {
                    'Authorization': 'Basic ' + btoa(username + ':' + password)
                }
            }).done(function () {
                session.set('isAuthenticated', true);
                Backbone.history.navigate(session.redirectFrom, {trigger: true});
            });

        },

        onSignOut: function () {
            var session = this.session;

            $.ajax({
                url    : 'logout',
                type   : 'POST',
                success: function () {
                    Backbone.history.navigate('', {trigger: true});
                    session.clear();
                }
            });
        }

    });

});

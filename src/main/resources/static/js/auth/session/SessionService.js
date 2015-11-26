define([
    'backbone',
    'common/Service',
    'auth/session/SessionModel'
], function (Backbone, Service, SessionModel) {

    'use strict';

    function setAuthorized(session) {
        session.set('isAuthenticated', true);
    }

    return Service.extend({

        channelName: 'session',

        initialize: function () {
            this.session = new SessionModel();
            this.start();
        },

        onStart: function () {
            var session = this.session;

            session.fetch({
                success: function () {
                    setAuthorized(session);
                }
            });

            this.channel.reply({
                getSession: session,
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
                setAuthorized(session);
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

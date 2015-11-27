define([
    'backbone',
    'common/Service',
    'auth/session/SessionModel'
], function (Backbone, Service, SessionModel) {

    'use strict';

    function setupErrorHandling(session) {
        $.ajaxSetup({
            statusCode: {
                401: function (jqXHR) {
                    var response = '';
                    try {
                        response = jqXHR.responseJSON.error;
                        console.warn(response);
                    } catch (err) {
                    }
                    session.clear();
                    Backbone.history.navigate('#login', {trigger: true});
                }
            }
        });
    }

    return Service.extend({

        channelName: 'session',

        initialize: function () {
            this.session = new SessionModel();
            this.start();
        },

        onStart: function () {
            var session = this.session;

            session.fetch();
            setupErrorHandling(session);

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

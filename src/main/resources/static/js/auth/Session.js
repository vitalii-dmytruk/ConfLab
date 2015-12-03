define([
    'backbone'
], function (Backbone) {

    'use strict';

    return Backbone.Model.extend({
        url     : 'users/current',
        defaults: {
            user           : '',
            isAuthenticated: false,
            redirectFrom   : ''
        },

        parse: function (response) {
            var session = {};

            session.user = response;

            session.isAuthenticated = !!(response.email && response.username);

            return session;
        }
    });
});

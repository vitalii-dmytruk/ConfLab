define([
    'backbone.marionette',
    'auth/LogoutController'
], function(Marionette, LogoutController) {

    'use strict';

    return Marionette.AppRouter.extend({
        initialize: function(options) {
            this.controller = new LogoutController({application: options.application});
        },

        appRoutes: {
            'logout': 'logout'
        }
    });
});
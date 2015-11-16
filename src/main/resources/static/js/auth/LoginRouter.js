define([
    'backbone.marionette',
    'auth/LoginController'
], function(Marionette, LoginController){

    'use strict';

    return Marionette.AppRouter.extend({

        initialize: function(options) {
            this.controller = new LoginController({
                container: options.container,
                application: options.application
            });
        },

        appRoutes: {
            'login': 'login'
        }
    });

});

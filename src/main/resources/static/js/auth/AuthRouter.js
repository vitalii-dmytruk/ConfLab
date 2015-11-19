define([
    'backbone.marionette',
    'auth/AuthController'
], function(Marionette, AuthController){

    'use strict';

    return Marionette.AppRouter.extend({

        initialize: function(options) {
            this.controller = new AuthController({
                container: options.container
            });
        },

        appRoutes: {
            'login': 'login',
            'logout': 'logout'
        }
    });

});

define([
    'backbone.marionette',
    'core/HomepageController'
], function(Marionette, HomepageController) {

    'use strict';

    return Marionette.AppRouter.extend({
        initialize: function(options) {
            this.controller = new HomepageController({container: options.container});
        },

        appRoutes: {
            '': 'home'
        }
    });

});

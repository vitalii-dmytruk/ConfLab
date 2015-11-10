define([
    'backbone.marionette',
    'backbone.radio',
    'profile/ProfileController'
], function (Marionette, Radio, ProfileController) {

    'use strict';

    return Marionette.AppRouter.extend({
        initialize: function (options) {
            Radio.channel('menu').request('add', {name: 'Profile', path: 'profile'});
            this.controller = new ProfileController({container: options.container});
        },

        appRoutes: {
            'profile': 'profile'
        }

    });


});

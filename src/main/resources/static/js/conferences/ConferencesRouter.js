define([
    'backbone.marionette',
    'backbone.radio',
    'conferences/ConferencesController'
], function (Marionette, Radio, ConferencesController) {

    'use strict';

    return Marionette.AppRouter.extend({
        initialize: function (options) {
            Radio.channel('menu').request('add', {name: 'Conferences', path: 'conferences'});
            this.controller = new ConferencesController({container: options.container});
        },

        appRoutes: {
            'conferences': 'conferences'
        }

    });


});

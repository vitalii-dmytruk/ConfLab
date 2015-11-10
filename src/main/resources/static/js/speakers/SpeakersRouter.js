define([
    'backbone.marionette',
    'backbone.radio',
    'speakers/SpeakersController'
], function (Marionette, Radio, SpeakersController) {

    'use strict';

    return Marionette.AppRouter.extend({
        initialize: function (options) {
            Radio.channel('menu').request('add', {name: 'Speakers', path: 'speakers'});
            this.controller = new SpeakersController({container: options.container});
        },

        appRoutes: {
            'speakers': 'speakers'
        }

    });


});

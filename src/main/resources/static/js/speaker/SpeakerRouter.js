define([
    'backbone.marionette',
    'backbone.radio',
    'speaker/SpeakerController'
], function (Marionette, Radio, SpeakerController) {

    'use strict';

    return Marionette.AppRouter.extend({
        initialize: function (options) {
            Radio.channel('menu').request('add', {name: 'Speaker', path: 'speaker'});
            this.controller = new SpeakerController({container: options.container});
        },

        appRoutes: {
            'speaker': 'speaker'
        }

    });


});

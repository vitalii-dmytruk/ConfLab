define([
    'backbone.marionette',
    'backbone.radio',
    'conference/ConferenceController'
], function (Marionette, Radio, ConferenceController) {

    'use strict';

    return Marionette.AppRouter.extend({
        initialize: function (options) {
            Radio.channel('menu').request('add', {name: 'Conferences', path: 'conference'});
            this.controller = new ConferenceController({container: options.container});
        },

        appRoutes: {
            'conference': 'conference'
        }
    });


});

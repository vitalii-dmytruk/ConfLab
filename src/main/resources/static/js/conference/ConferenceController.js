define([
    'backbone.marionette',
    'backbone.radio'
], function (Marionette, Radio) {

    'use strict';

    return Marionette.Object.extend({

        initialize: function (options) {
            this.container = options.container;
        },

        conference: function () {
            var self = this;

            require(['conference/ConferenceLayoutView'], function (ConferenceLayoutView) {
                self.container.show(new ConferenceLayoutView());
                Radio.channel('menu').request('activate', {path: 'conference'});
            });

        }

    });

});
define([
    'backbone.marionette',
    'backbone.radio'
], function (Marionette, Radio) {

    'use strict';

    return Marionette.Object.extend({

        initialize: function (options) {
            this.container = options.container;
        },

        speakers: function () {
            var self = this;

            require(['speakers/SpeakersLayoutView'], function (SpeakersLayoutView) {
                self.container.show(new SpeakersLayoutView());
                Radio.channel('menu').request('activate', {path: 'speakers'});
            });

        }

    });

});
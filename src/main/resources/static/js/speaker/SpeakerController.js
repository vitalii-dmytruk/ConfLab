define([
    'backbone.marionette',
    'backbone.radio'
], function (Marionette, Radio) {

    'use strict';

    return Marionette.Object.extend({

        initialize: function (options) {
            this.container = options.container;
        },

        speaker: function () {
            var self = this;

            require(['speaker/SpeakerPageView', 'speaker/SpeakerCollection'], function (SpeakerPageView, SpeakerCollection) {
                var collection = new SpeakerCollection();
                self.container.show(new SpeakerPageView({collection: collection}));
                Radio.channel('menu').request('activate', {path: 'speaker'});
            });
        }
    });

});
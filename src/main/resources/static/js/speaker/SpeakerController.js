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

            require(['speaker/SpeakerLayoutView'], function (SpeakerLayoutView) {
                self.container.show(new SpeakerLayoutView());
                Radio.channel('menu').request('activate', {path: 'speaker'});
            });

        }

    });

});
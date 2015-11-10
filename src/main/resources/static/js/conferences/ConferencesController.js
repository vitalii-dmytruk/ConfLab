define([
    'backbone.marionette',
    'backbone.radio'
], function (Marionette, Radio) {

    'use strict';

    return Marionette.Object.extend({

        initialize: function (options) {
            this.container = options.container;
        },

        conferences: function () {
            var self = this;

            require(['conferences/ConferencesLayoutView'], function (ConferencesLayoutView) {
                self.container.show(new ConferencesLayoutView());
                Radio.channel('menu').request('activate', {path: 'conferences'});
            });

        }

    });

});
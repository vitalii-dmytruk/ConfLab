define([
    'backbone.marionette',
    'backbone.radio'
], function (Marionette, Radio) {

    'use strict';

    return Marionette.Object.extend({

        initialize: function (options) {
            this.container = options.container;
        },

        profile: function () {
            var self = this;

            require(['profile/ProfileLayoutView'], function (ProfileLayoutView) {
                self.container.show(new ProfileLayoutView());
                Radio.channel('menu').request('activate', {path: 'profile'});
            });

        }

    });

});
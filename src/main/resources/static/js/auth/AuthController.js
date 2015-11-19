define([
    'backbone.marionette',
    'backbone.radio'
], function (Marionette, Radio) {

    'use strict';

    return Marionette.Object.extend({

        initialize: function (options) {
            this.container = options.container;
        },

        login: function () {
            var self = this;
            require(['auth/LoginView'], function (LoginView) {
                self.container.show(new LoginView());
            });
        },

        logout: function () {
            Radio.channel('session').request('signOut');
        }
    });
});
define([
    'backbone.radio',
    'backbone',
    'backbone.marionette'
], function (Radio) {

    'use strict';

    return Marionette.Object.extend({

        constructor: function () {
            this.initialize.apply(this, arguments);
        },

        requireAuth: true,

        enter: function (args) {
            var self = this;

            if (!canEnter(this.requireAuth)) {
                return;
            }

            this.triggerMethod.apply(this, ['before:enter'].concat(args));
            this.triggerMethod.apply(this, ['before:fetch'].concat(args));

            return $.when(this.fetch.apply(this, args)).then(function () {
                self.triggerMethod.apply(self, ['fetch'].concat(args));
                self.triggerMethod.apply(self, ['before:render'].concat(args));
            }).then(function () {
                return self.render.apply(self, args);
            }).then(function () {
                self.triggerMethod.apply(self, ['render'].concat(args));
                self.triggerMethod.apply(self, ['enter'].concat(args));
            }).fail(function () {
                self.triggerMethod.apply(self, ['error'].concat(args));
            });
        },


        navigate: function () {
            var history = Backbone.history,
                args    = Array.prototype.slice.call(arguments);
            history.navigate.apply(history, args);
        },


        fetch : function () {
        },
        render: function () {
        }

    });

    function canEnter(requireAuth) {
        var auth = Radio.channel('auth');

        if (requireAuth && !auth.request('isAuthenticated')) {
            auth.request('login');
            return false;
        } else {
            return true;
        }
    }


});
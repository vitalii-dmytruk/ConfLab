define([
    'common/route/Route',
    'backbone.marionette'
], function (Route) {

    'use strict';

    return Marionette.AppRouter.extend({

        constructor: function () {
            this.listenTo(Backbone.history, 'route', this._onHistoryRoute);
            Marionette.AppRouter.apply(this, arguments);
        },

        _onHistoryRoute: function (router) {
            this.active = this === router;
        },

        execute: function (callback, args) {
            var self = this;

            if (!this.active) {
                this.triggerMethod.apply(this, ['before:enter'].concat(args));
            }

            this.triggerMethod.apply(this, ['before:route'].concat(args));

            $.when(enterRoute(this, callback, args)).then(function () {
                if (!self.active) {
                    self.triggerMethod.apply(self, ['enter'].concat(args));
                }

                self.triggerMethod.apply(self, ['route'].concat(args));
            });
        },

        triggerMethod: Marionette.triggerMethod

    });

    function enterRoute(router, callback, args) {
        var route = callback.apply(router, args);

        if (route instanceof Route) {
            return route.enter(args);
        }
    }
});

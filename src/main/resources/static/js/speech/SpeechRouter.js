define([
    'common/MenuAwareRouter',
    'speech/table/SpeechTableRoute',
    'speech/details/SpeechDetailRoute',
    'backbone.marionette'
], function (MenuAwareRouter, SpeechTableRoute, SpeechDetailRoute) {

    'use strict';

    return MenuAwareRouter.extend({

        menuButton: {
            name: 'Speeches',
            path: 'speeches'
        },

        initialize: function (options) {
            this.container = options.container;
        },

        routes: {
            'speeches'    : getRoute(SpeechTableRoute),
            'speeches/:id': getRoute(SpeechDetailRoute)
        }

    });

    function getRoute(RouteClass) {
        return function () {
            return new RouteClass({
                container: this.container
            });
        }
    }
});
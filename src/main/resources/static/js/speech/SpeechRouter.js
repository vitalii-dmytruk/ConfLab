define([
    'common/MenuAwareRouter',
    'backbone.radio',
    'speech/SpeechCollection',
    'speech/table/SpeechTableRoute',
    'speech/details/SpeechDetailRoute',
    'backbone.marionette'
], function (MenuAwareRouter, Radio, SpeechCollection, SpeechTableRoute, SpeechDetailRoute) {

    'use strict';

    return MenuAwareRouter.extend({

        menuButton: {
            name: 'Speeches',
            path: 'speeches'
        },

        initialize: function (options) {
            this.container  = options.container;
            this.collection = new SpeechCollection();
        },

        routes: {
            'speeches'    : getRoute(SpeechTableRoute),
            'speeches/:id': getRoute(SpeechDetailRoute),
        }

    });

    function getRoute(RouteClass) {
        return function () {
            return new RouteClass({
                container : this.container,
                collection: this.collection
            });
        }
    }

});

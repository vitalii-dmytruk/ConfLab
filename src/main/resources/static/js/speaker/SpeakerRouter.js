define([
    'common/MenuAwareRouter',
    'backbone.radio',
    'speaker/SpeakerCollection',
    'speaker/table/SpeakerTableRoute',
    'speaker/details/SpeakerDetailsRoute',
    'backbone.marionette'
], function (MenuAwareRouter, Radio, SpeakerCollection, SpeakerTableRoute, SpeakerDetailsRoute) {

    'use strict';

    return MenuAwareRouter.extend({

        menuButton: {
            name: 'Speakers',
            path: 'speakers'
        },

        initialize: function (options) {
            this.container = options.container;
        },

        routes: {
            'speakers'    : getRoute(SpeakerTableRoute),
            'speakers/:id': getRoute(SpeakerDetailsRoute)
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

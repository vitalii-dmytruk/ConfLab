define([
    'common/MenuAwareRouter',
    'speaker/table/SpeakerTableRoute',
    'speaker/details/SpeakerDetailsRoute',
    'backbone.marionette'
], function (MenuAwareRouter, SpeakerTableRoute, SpeakerDetailsRoute) {

    'use strict';

    return MenuAwareRouter.extend({

        menuButton: new Backbone.Model({
            name: 'Speakers',
            path: 'speakers'
        }),

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

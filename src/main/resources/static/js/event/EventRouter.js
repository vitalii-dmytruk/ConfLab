define([
    'common/MenuAwareRouter',
    'event/table/EventTableRoute',
    'event/details/EventDetailsRoute'
], function (MenuAwareRouter, EventTableRoute, EventDetailsRoute) {

    'use strict';

    return MenuAwareRouter.extend({

        menuButton: {
            name: 'Conferences',
            path: 'events'
        },

        initialize: function (options) {
            this.container = options.container;
        },

        routes: {
            'events'    : getRoute(EventTableRoute),
            'events/:id': getRoute(EventDetailsRoute)
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

define([
    'common/MenuAwareRouter',
    'backbone.radio',
    'event/EventCollection',
    'event/table/EventTableRoute',
    'event/details/EventDetailsRoute'
], function (MenuAwareRouter, Radio, EventCollection, EventTableRoute, EventDetailsRoute) {

    'use strict';

    return MenuAwareRouter.extend({

        menuButton: {
            name: 'Conferences',
            path: 'events'
        },

        initialize: function (options) {
            this.container  = options.container;
            this.collection = new EventCollection();
        },

        routes: {
            'events'         : getRoute(EventTableRoute),
            'events/:id'     : getRoute(EventDetailsRoute)
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

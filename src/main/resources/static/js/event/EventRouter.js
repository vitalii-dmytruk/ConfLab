define([
    'common/MenuAwareRouter',
    'event/table/EventTableRoute',
    'event/EventRoute'
], function (MenuAwareRouter, EventTableRoute, EventRoute) {

    'use strict';

    return MenuAwareRouter.extend({

        menuButton: new Backbone.Model({
            name: 'Conferences',
            path: 'events'
        }),

        initialize: function (options) {
            this.container = options.container;
        },

        routes: {
            'events'                : getRoute(EventTableRoute),
            'events/:id(/)(*params)': getRoute(EventRoute)
        }
    });

    function getRoute(RouteClass) {
        return function () {
            return new RouteClass({
                container: this.container,
                baseUrl  : 'events'
            });
        }
    }

});

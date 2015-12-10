define([
    'common/MenuAwareRouter',
    'backbone.radio',
    'conference/event/EventCollection',
    'conference/event/table/EventTableRoute',
    'conference/event/create/CreateEventRoute',
    'conference/event/edit/EditEventRoute',
    'conference/event/show/ShowEventRoute',
    'backbone.marionette'
], function (MenuAwareRouter, Radio, EventCollection, EventTableRoute, CreateEventRoute, EditEventRoute,
             ShowEventRoute) {

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
            'events/new'     : getRoute(CreateEventRoute),
            'events/:id'     : getRoute(ShowEventRoute),
            'events/:id/edit': getRoute(EditEventRoute)
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

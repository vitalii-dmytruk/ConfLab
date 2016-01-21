define([
    'common/MenuAwareRouter',
    'event/table/EventTableRoute',
    'event/details/EventInfoRoute',
    'event/details/EventSpeakersRoute',
    'event/details/EventSpeechesRoute',
    'event/details/EventPartnersRoute'
], function (MenuAwareRouter, EventTableRoute, EventInfoRoute, EventSpeakersRoute, EventSpeechesRoute,
    EventPartnersRoute) {

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
            'events'             : getRoute(EventTableRoute),
            'events/:id'         : getRoute(EventInfoRoute),
            'events/:id/info'    : getRoute(EventInfoRoute),
            'events/:id/speakers': getRoute(EventSpeakersRoute),
            'events/:id/speeches': getRoute(EventSpeechesRoute),
            'events/:id/partners': getRoute(EventPartnersRoute)
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

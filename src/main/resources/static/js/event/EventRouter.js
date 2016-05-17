define([
    'common/MenuAwareRouter',
    'event/table/EventTableRoute',
    'event/details/info/EventInfoRoute',
    'event/details/speakers/EventSpeakersRoute',
    'event/details/speeches/EventSpeechesRoute',
    'event/details/partners/EventPartnersRoute',
    'event/details/tracks/EventTracksRouter'
], function (MenuAwareRouter, EventTableRoute, EventInfoRoute, EventSpeakersRoute, EventSpeechesRoute,
             EventPartnersRoute, EventTracksRoute) {

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
            'events/:id/partners': getRoute(EventPartnersRoute),
            'events/:id/tracks'  : getRoute(EventTracksRoute)
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

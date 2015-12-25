define([
    'common/MenuAwareRouter',
    'event/table/EventTableRoute',
    'event/details/EventInfoRoute',
    'event/details/EventSpeakersRoute',
    'event/details/EventSpeechesRoute'
], function (MenuAwareRouter, EventTableRoute, EventInfoRoute, EventSpeakersRoute, EventSpeechesRoute) {

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
            'events/:id/speeches': getRoute(EventSpeechesRoute)
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

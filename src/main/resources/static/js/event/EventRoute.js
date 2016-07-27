define([
    'common/route/Route',
    'event/EventModel',
    'event/EventView',
    'event/EventTabsRoute'
], function EventRoute(Route, EventModel, EventView, EventTabsRoute) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container = options.container;
            this.baseUrl   = options.baseUrl;
        },

        fetch: function (eventId) {
            this.event = new EventModel({id: eventId});
            return this.event.fetch();
        },

        render: function (eventId, path) {
            var eventView;

            eventView = new EventView({model: this.event});
            this.container.show(eventView);

            new EventTabsRoute({
                baseUrl         : this.baseUrl + '/' + eventId,
                event           : this.event,
                navsRegion      : eventView.getRegion('tabsRegion'),
                currentNavRegion: eventView.getRegion('currentTabRegion')
            }).enter([path]);

        }

    });

});
define([
    'common/navigation/NavigationRoute',
    'event/details/info/EventInfoRoute',
    'event/details/speakers/EventSpeakersRoute',
    'event/details/speeches/EventSpeechesRoute',
    'event/details/partners/EventPartnersRoute',
    'event/details/tracks/EventTracksRoute',
    'event/details/schedule/EventScheduleRoute',
    'event/EventTabView'
], function EventTabsRoute(NavigationRoute, EventInfoRoute, EventSpeakersRoute, EventSpeechesRoute, EventPartnersRoute,
                           EventTracksRoute, EventScheduleRoute, EventTabView) {

    'use strict';

    return NavigationRoute.extend({

        className: 'nav nav-tabs',
        childView: EventTabView,

        getRouteClass: function (nav) {
            return nav.get('routeClass');
        },

        routeOptions: function (options) {
            return {event: options.event}
        },

        navsCollection: new Backbone.Collection([
            {
                id        : 'info',
                label     : 'Info',
                routeClass: EventInfoRoute
            }, {
                id        : 'speakers',
                label     : 'Speakers',
                routeClass: EventSpeakersRoute
            }, {
                id        : 'speeches',
                label     : 'Speeches',
                routeClass: EventSpeechesRoute
            }, {
                id        : 'partners',
                label     : 'Partners',
                routeClass: EventPartnersRoute
            }, {
                id        : 'tracks',
                label     : 'Tracks',
                routeClass: EventTracksRoute
            }, {
                id        : 'schedule',
                label     : 'Schedule',
                routeClass: EventScheduleRoute
            }
        ])
    });

});
define([
    'common/route/Route',
    'event/details/schedule/EventScheduleView',
    'track/TracksCollection'
], function EventScheduleRoute(Route, EventScheduleView, TracksCollection) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.event      = options.event;
            this.container  = options.container;
            this.tracks     = new TracksCollection();
            this.tracks.url = this.event.url() + this.tracks.url;
        },

        fetch: function () {
            return this.tracks.fetch();
        },

        render: function () {
            var eventScheduleView = new EventScheduleView({
                model : this.event,
                tracks: this.tracks
            });
            this.container.show(eventScheduleView);
        }
    });
});
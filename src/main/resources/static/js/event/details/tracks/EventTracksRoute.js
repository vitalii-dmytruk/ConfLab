define([
    'common/route/Route',
    'event/details/tracks/TrackViewFactory',
    'track/TracksCollection'
], function EventTracksRouter(Route, trackViewFactory, TracksCollection) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.event     = options.event;
            this.container = options.container
        },

        fetch: function () {
            this.tracks     = new TracksCollection();
            this.tracks.url = this.event.url() + this.tracks.url;

            return this.tracks.fetch();
        },

        render: function () {
            var eventView = trackViewFactory.newEventView({
                model          : this.model,
                collection     : this.tracks,
                attachmentRoute: {
                    enter: function () {

                    }
                }
            });

            this.container.show(eventView);
        }
    })
});
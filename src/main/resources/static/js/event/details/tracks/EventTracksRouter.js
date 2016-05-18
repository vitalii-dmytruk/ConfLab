define([
    'event/details/EventDetailsRoute',
    'event/details/tracks/TrackViewFactory',
    'track/model/TracksCollection'
], function EventTracksRouter(EventDetailsRoute, trackViewFactory, TracksCollection) {

    'use strict';

    return EventDetailsRoute.extend({

        fetch: function () {
            this.tracks     = new TracksCollection();
            this.tracks.url = this.model.url() + this.tracks.url;

            return this.tracks.fetch();
        },

        render: function () {
            var eventView = trackViewFactory.newEventView({
                model     : this.model,
                collection: this.tracks,
                attachmentRoute: {
                    enter: function () {

                    }
                }
            });

            this.view.showTracksTab(eventView);
        }
    })
});
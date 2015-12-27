define([
    'event/details/EventDetailsRoute',
    'speaker/speakerViewFactory',
    'speaker/SpeakerCollection'
], function (EventDetailsRoute, speakerViewFactory, SpeakerCollection) {

    'use strict';

    return EventDetailsRoute.extend({

        fetch: function () {
            this.speakers                 = new SpeakerCollection();
            this.speakers.url             = this.model.url() + this.speakers.url;
            this.speakersSearchCollection = new SpeakerCollection();

            return $.when(this.model.fetch(), this.speakers.fetch(), this.speakersSearchCollection.fetch());
        },

        render: function () {
            this.view.showSpeakersTab(new speakerViewFactory.itemsInEventView({
                collection      : this.speakers,
                searchCollection: this.speakersSearchCollection
            }));
        }
    });
});
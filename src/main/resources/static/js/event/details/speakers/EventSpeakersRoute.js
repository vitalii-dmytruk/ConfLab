define([
    'event/details/EventDetailsRoute',
    'event/details/EventItemAttachmentRoute',
    'speech/speechViewFactory',
    'speaker/speakerViewFactory',
    'speech/SpeechCollection',
    'speaker/SpeakerCollection'
], function (EventDetailsRoute, EventItemAttachmentRoute, speechViewFactory, speakerViewFactory,
             SpeechCollection, SpeakerCollection) {
    'use strict';

    return EventDetailsRoute.extend({

        fetch: function () {
            this.speakers                 = new SpeakerCollection();
            this.speakers.url             = this.model.url() + this.speakers.url;
            this.speakersSearchCollection = new SpeakerCollection();

            return $.when(this.model.fetch(), this.speakers.fetch(), this.speakersSearchCollection.fetch());
        },

        render: function () {
            var eventView = speakerViewFactory.newEventView({
                model           : this.model,
                collection      : this.speakers,
                searchCollection: this.speakersSearchCollection,
                attachmentRoute: new EventItemAttachmentRoute({
                    attachedCollectionType: SpeechCollection,
                    attachmentView        : speechViewFactory.attachedItemTableView
                })
            });

            this.view.showSpeakersTab(eventView);
        }
    });
});
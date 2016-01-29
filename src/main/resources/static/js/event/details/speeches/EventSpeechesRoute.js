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
            this.speeches                 = new SpeechCollection();
            this.speeches.url             = this.model.url() + this.speeches.url;
            this.speechesSearchCollection = new SpeechCollection();

            return $.when(this.model.fetch(), this.speeches.fetch(), this.speechesSearchCollection.fetch());
        },

        render: function () {
            var eventView = speechViewFactory.newEventView({
                model           : this.model,
                collection      : this.speeches,
                searchCollection: this.speechesSearchCollection,
                attachmentRoute : new EventItemAttachmentRoute({
                    attachedCollectionType: SpeakerCollection,
                    attachmentView        : speakerViewFactory.attachedItemTableView
                })
            });
            this.view.showSpeechesTab(eventView);
        }
    });
});
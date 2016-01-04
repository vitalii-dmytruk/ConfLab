define([
    'event/details/EventDetailsRoute',
    'event/details/EventItemView',
    'speaker/speakerViewFactory',
    'speech/speechViewFactory',
    'speaker/SpeakerCollection',
    'speech/SpeechCollection'
], function (EventDetailsRoute, EventItemView, speakerViewFactory, speechViewFactory, SpeakerCollection, SpeechCollection) {

    'use strict';

    return EventDetailsRoute.extend({

        fetch: function () {
            this.speakers                 = new SpeakerCollection();
            this.speakers.url             = this.model.url() + this.speakers.url;
            this.speakersSearchCollection = new SpeakerCollection();

            return $.when(this.model.fetch(), this.speakers.fetch(), this.speakersSearchCollection.fetch());
        },

        render: function () {
            this.view.showSpeakersTab(new EventItemView({
                model                 : this.model,
                collection            : this.speakers,
                searchCollection      : this.speakersSearchCollection,
                attachedCollectionType: SpeechCollection,
                searchLabelAttribute  : speakerViewFactory.searchLabelAttribute,
                detailsView           : speakerViewFactory.itemDetailsView,
                attachmentView        : speechViewFactory.attachedItemTableView
            }));
        }
    });
});
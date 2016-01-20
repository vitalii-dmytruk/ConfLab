define([
    'event/details/EventDetailsRoute',
    'speech/speechViewFactory',
    'speaker/speakerViewFactory',
    'speech/SpeechCollection'
], function (EventDetailsRoute, speechViewFactory, speakerViewFactory, SpeechCollection) {

    'use strict';

    return EventDetailsRoute.extend({

        fetch: function () {
            this.partners                 = new SpeechCollection();
            this.partners.url             = this.model.url() + this.partners.url;
            this.partnersSearchCollection = new SpeechCollection();

            return $.when(this.model.fetch(), this.partners.fetch(), this.partnersSearchCollection.fetch());
        },

        render: function () {
            var eventView = speechViewFactory.newEventView({
                model           : this.model,
                collection      : this.partners,
                searchCollection: this.partnersSearchCollection,
                attachmentView  : speakerViewFactory.attachedItemTableView
            });
            this.view.showSpeechesTab(eventView);
        }
    });
});
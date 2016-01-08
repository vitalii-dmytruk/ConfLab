define([
    'event/details/EventDetailsRoute',
    'speech/speechViewFactory',
    'speaker/speakerViewFactory',
    'speech/SpeechCollection'
], function (EventDetailsRoute, speechViewFactory, speakerViewFactory, SpeechCollection) {

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
                attachmentView  : speakerViewFactory.attachedItemTableView
            });
            this.view.showSpeechesTab(eventView);
        }
    });
});
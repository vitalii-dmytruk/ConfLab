define([
    'event/details/EventDetailsRoute',
    'speech/speechViewFactory',
    'speech/SpeechCollection'
], function (EventDetailsRoute, speechViewFactory, SpeechCollection) {

    'use strict';

    return EventDetailsRoute.extend({

        fetch: function () {
            this.speeches                 = new SpeechCollection();
            this.speeches.url             = this.model.url() + this.speeches.url;
            this.speechesSearchCollection = new SpeechCollection();
            return $.when(this.model.fetch(), this.speeches.fetch(), this.speechesSearchCollection.fetch());
        },

        render: function () {
            this.view.showSpeechesTab(new speechViewFactory.attachedItemTableView({
                collection      : this.speeches,
                searchCollection: this.speechesSearchCollection
            }));
        }
    });
});
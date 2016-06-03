define([
    'common/route/Route',
    'event/details/EventItemAttachmentRoute',
    'speech/speechViewFactory',
    'speaker/speakerViewFactory',
    'speech/SpeechCollection',
    'speaker/SpeakerCollection'
], function (Route, EventItemAttachmentRoute, speechViewFactory, speakerViewFactory,
             SpeechCollection, SpeakerCollection) {
    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.event     = options.event;
            this.container = options.container
        },

        fetch: function () {
            this.speakers                 = new SpeakerCollection();
            this.speakers.url             = this.event.url() + this.speakers.url;
            this.speakersSearchCollection = new SpeakerCollection();

            return $.when(this.speakers.fetch(), this.speakersSearchCollection.fetch());
        },

        render: function () {
            var eventView = speakerViewFactory.newEventView({
                model           : this.event,
                collection      : this.speakers,
                searchCollection: this.speakersSearchCollection,
                attachmentRoute : new EventItemAttachmentRoute({
                    attachedCollectionType: SpeechCollection,
                    title                 : speakerViewFactory.tableTitle,
                    searchLabelAttribute  : speechViewFactory.searchLabelAttribute,
                    EditView              : speechViewFactory.itemEditView,
                    rowView               : speechViewFactory.itemRowView
                })
            });

            this.container.show(eventView);
        }
    });
});
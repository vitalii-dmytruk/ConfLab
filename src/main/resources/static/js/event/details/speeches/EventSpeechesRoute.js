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
            this.speeches                 = new SpeechCollection();
            this.speeches.url             = this.event.url() + this.speeches.url;
            this.speechesSearchCollection = new SpeechCollection();

            return $.when(this.speeches.fetch(), this.speechesSearchCollection.fetch());
        },

        render: function () {
            var eventView = speechViewFactory.newEventView({
                model           : this.event,
                collection      : this.speeches,
                searchCollection: this.speechesSearchCollection,
                attachmentRoute : new EventItemAttachmentRoute({
                    attachedCollectionType: SpeakerCollection,
                    title                 : speechViewFactory.tableTitle,
                    searchLabelAttribute  : speakerViewFactory.searchLabelAttribute,
                    EditView              : speakerViewFactory.itemEditView,
                    rowView               : speakerViewFactory.itemRowView
                })
            });
            this.container.show(eventView);
        }
    });
});
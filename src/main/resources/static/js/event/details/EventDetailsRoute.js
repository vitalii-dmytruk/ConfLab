define([
   'common/route/Route',
   'event/eventViewFactory',
   'speech/speechViewFactory',
   'speaker/speakerViewFactory',
   'event/EventModel',
   'speaker/SpeakerCollection',
   'speech/SpeechCollection'
], function (Route, eventViewFactory, speechViewFactory, speakerViewFactory,  EventModel, SpeakerCollection, SpeechCollection) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container = options.container;
        },

        fetch: function (id) {
            this.model            = new EventModel({id: id});

            this.speakers       = new SpeakerCollection();
            this.speakers.url   = this.model.url() + this.speakers.url;
            this.speakersSearchCollection = new SpeakerCollection();

            this.speeches       = new SpeechCollection();
            this.speeches.url   = this.model.url() + this.speeches.url;
            this.speechesSearchCollection = new SpeechCollection();

            return $.when(this.model.fetch(),
                          this.speeches.fetch(), this.speechesSearchCollection.fetch(),
                          this.speakers.fetch(), this.speakersSearchCollection.fetch());
        },

        render: function () {
            this.view = new eventViewFactory.itemDetailsView({
                model     : this.model,
                childViews: [
                    new speakerViewFactory.attachedItemTableView({
                        collection      : this.speakers,
                        searchCollection: this.speakersSearchCollection
                    }),
                    new speechViewFactory.attachedItemTableView({
                        collection      : this.speeches,
                        searchCollection: this.speechesSearchCollection
                    })
                ]
            });
            this.container.show(this.view);
        }
    });
});
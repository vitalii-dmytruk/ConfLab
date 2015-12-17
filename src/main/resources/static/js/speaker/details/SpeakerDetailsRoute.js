define([
    'common/Route',
    'speaker/SpeakerModel',
    'speaker/details/SpeakerDetailsView',
    'speech/table/SpeechLinkTable',
    'speech/SpeechCollection',
    'backbone.marionette'
], function (Route, SpeakerModel, SpeakerDetailsView, SpeechLinkTable, SpeechCollection) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container  = options.container;
            this.collection = options.collection;
        },

        fetch: function (id) {
            this.model            = new SpeakerModel({id: id});
            this.collection       = new SpeechCollection();
            this.collection.url   = this.model.url() + '/speeches';
            this.searchCollection = new SpeechCollection();

            return $.when(this.model.fetch(), this.collection.fetch(), this.searchCollection.fetch());
        },

        render: function () {
            this.view = new SpeakerDetailsView({
                model        : this.model,
                linkTableView: new SpeechLinkTable({
                    collection      : this.collection,
                    searchCollection: this.searchCollection
                })
            });
            this.container.show(this.view);
        }
    });
});
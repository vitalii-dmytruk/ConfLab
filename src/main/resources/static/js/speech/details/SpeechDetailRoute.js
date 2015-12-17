define([
    'common/Route',
    'speech/SpeechModel',
    'speech/details/SpeechDetailsView',
    'speaker/table/SpeakerLinkTable',
    'speaker/SpeakerCollection',
    'backbone.marionette'
], function (Route, SpeechModel, SpeechDetailsView, SpeakerLinkTable, SpeakerCollection) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container  = options.container;
            this.collection = options.collection;
        },

        fetch: function (id) {
            this.model            = new SpeechModel({id: id});
            this.collection       = new SpeakerCollection();
            this.collection.url   = this.model.url() + '/speakers';
            this.searchCollection = new SpeakerCollection();

            return $.when(this.model.fetch(), this.collection.fetch(), this.searchCollection.fetch());
        },

        render: function () {
            this.view = new SpeechDetailsView({
                model        : this.model,
                linkTableView: new SpeakerLinkTable({
                    collection      : this.collection,
                    searchCollection: this.searchCollection
                })
            });
            this.container.show(this.view);
        }
    });
});
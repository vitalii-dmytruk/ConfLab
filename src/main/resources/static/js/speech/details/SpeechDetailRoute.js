define([
    'common/Route',
    'speech/SpeechModel',
    'speech/details/SpeechDetailsView',
    'backbone.marionette'
], function (Route, SpeechModel, SpeechDetailsView) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container  = options.container;
            this.collection = options.collection;
        },

        fetch: function (id) {
            this.model = this.collection.get(id);
            if (!this.model) {
                this.model = new SpeechModel({id: id});
                return this.model.fetch();
            }
        },

        render: function () {
            this.view = new SpeechDetailsView({
                model     : this.model,
                collection: this.model.get('speakers')
            });
            this.container.show(this.view);
        }
    });
});
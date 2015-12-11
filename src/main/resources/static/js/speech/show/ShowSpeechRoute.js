define([
    'common/Route',
    'speech/show/ShowSpeechView'
], function (Route, ShowSpeechView) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container  = options.container;
            this.collection = options.collection;
        },

        fetch: function (id) {
            this.model = this.collection.get(id);
            if (!this.model) {
                this.model = new this.collection.model({id: id});
                return this.model.fetch();
            }
        },

        render: function () {
            this.view = new ShowSpeechView({
                model: this.model
            });
            this.container.show(this.view);
        }
    });
});
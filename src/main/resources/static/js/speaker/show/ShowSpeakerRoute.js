define([
    'common/Route',
    'speaker/SpeakerModel',
    'speaker/show/ShowSpeakerView'
], function (Route, SpeakerModel, ShowSpeakerView) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container  = options.container;
            this.collection = options.collection;
        },

        fetch: function (id) {
            this.model = this.collection.get(id);
            if (!this.model) {
                this.model = new SpeakerModel({id: id});
                return this.model.fetch();
            }
        },

        render: function () {
            this.view = new ShowSpeakerView({
                model     : this.model,
                collection: this.model.get('speeches')
            });
            this.container.show(this.view);
        }
    });
});
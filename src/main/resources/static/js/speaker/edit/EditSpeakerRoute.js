define([
    'common/Route',
    'speaker/SpeakerModel',
    'speaker/edit/EditSpeakerView'
], function (Route, SpeakerModel, EditSpeakerView) {

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
            this.model = this.model.clone();
            this.view = new EditSpeakerView({
                model: this.model,
                collection: this.collection
            });
            this.container.show(this.view);
        }
    });
});
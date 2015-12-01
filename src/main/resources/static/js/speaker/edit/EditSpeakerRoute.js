define([
    'speaker/edit/CreateSpeakerRoute'
], function (CreateSpeakerRoute) {

    'use strict';

    return CreateSpeakerRoute.extend({

        fetch: function (id) {
            this.model = this.collection.get(id);
            if (!this.model) {
                this.model = new this.collection.model({id: id});
                return this.model.fetch();
            }
        },

        initModel: function () {
            this.model = this.model.clone();
        }
    });
});
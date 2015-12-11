define([
    'speech/create/CreateSpeechRoute'
], function (CreateSpeechRoute) {

    'use strict';

    return CreateSpeechRoute.extend({

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
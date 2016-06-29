define([
    'speech/SpeechModel',
    'common/Collection'
], function (SpeechModel, Collection) {

    'use strict';

    return Collection.extend({
        url      : '/speeches',
        model    : SpeechModel,
        updateAll: function () {
            var collection = this;
            var options    = {
                url    : '/speeches',
                success: function (model, resp, xhr) {
                    collection.reset(model);
                }
            };
            return Backbone.sync('update', this, options);
        }
    });

});
define([
    'common/Service',
    'speech/LanguageCollection',
    'backbone.radio'
], function (Service, LanguageCollection, Radio) {

    'use strict';
    var channelName = 'languages';
    var collection;
    return Service.extend({

        initialize: function () {
            var channel = Radio.channel(channelName);
            channel.reply({getLanguages: this.getLanguages});
        },

        getLanguages: function () {
            if (!collection) {
                collection = new LanguageCollection();
                collection.fetch({async: false});
            }
            return collection;
        }
    })
});
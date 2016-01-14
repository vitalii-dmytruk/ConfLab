define([
    'common/Service',
    'speech/LanguageCollection',
    'backbone.radio'
], function (Service, LanguageCollection, Radio) {

    'use strict';
    var collection;
    return Service.extend({

        channelName: 'languages',
        
        initialize: function () {
            var channel = Radio.channel(channelName);
            channel.reply({getLanguages: this.getLanguages});
            collection  = new LanguageCollection();
            collection.fetch();
        },

        getLanguages: function () {
            return collection;
        }
    })
});
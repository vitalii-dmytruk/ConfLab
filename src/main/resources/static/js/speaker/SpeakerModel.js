define([
    'speech/SpeechesCollection',
    'backbone.nested.models'
], function (SpeechesCollection) {

    'use strict';

    return Backbone.Model.extend({
        urlRoot: '/speakers',
        relations : {
            speeches : SpeechesCollection
        },
        defaults: function () {
            return {
                id      : null,
                name    : '',
                position: '',
                about   : '',
                email   : '',
                speeches: []
            }
        }
    });
});

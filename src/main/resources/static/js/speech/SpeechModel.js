define([
    'common/Model',
    'speaker/SpeakerCollection',
    'backbone'
], function (Model, SpeakerCollection) {

    'use strict';

    return Model.extend({
        urlRoot: '/speeches',

        defaults: function () {
            return {
                id         : null,
                title      : '',
                description: '',
                lang       : null,
                speakers   : new SpeakerCollection()
            }
        },

        parse: function (response) {
            response.speakers = new SpeakerCollection(response.speakers)
            return response;
        },

        validation: {
            title: {
                required : true,
                maxLength: 255
            }
        }
    });
});
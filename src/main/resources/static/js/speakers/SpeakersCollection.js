define([
    'backbone',
    'speakers/SpeakerModel'
], function (Backbone, SpeakerModel) {

    'use strict';

    return Backbone.Collection.extend({

        url  : 'speakers',
        model: SpeakerModel

    });

});
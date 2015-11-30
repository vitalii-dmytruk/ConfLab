define([
    'speaker/SpeakerModel',
    'common/Collection'
], function (SpeakerModel, Collection) {

    'use strict';

    return Collection.extend({
        url  : '/speakers',
        model: SpeakerModel
    });

});



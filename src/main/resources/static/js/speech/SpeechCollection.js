define([
    'speech/SpeechModel',
    'common/Collection'
], function (SpeechModel, Collection) {

    'use strict';

    return Collection.extend({
        url  : '/speeches',
        model: SpeechModel
    });

});
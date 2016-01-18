define([
    'speech/LanguageModel',
    'common/Collection'
], function (LanguageModel, Collection) {

    'use strict';

    return Collection.extend({
        url  : '/languages',
        model: LanguageModel
    });
});
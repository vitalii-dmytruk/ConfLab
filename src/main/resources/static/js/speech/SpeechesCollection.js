define([
    'speech/Speech',
    'common/Collection'
], function (Speech, Collection) {
    'use strict';

    return Collection.extend({
        url  : '/speeches',
        model: Speech
    });
});
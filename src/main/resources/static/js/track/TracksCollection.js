define([
    'common/Collection',
    'track/Track'
], function TracksCollection(Collection, Model) {
    'use strict';

    return Collection.extend({
        url  : '/tracks',
        model: Model
    });
});
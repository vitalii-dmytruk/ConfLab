define([
    'common/Collection',
    'track/model/Track'
], function TracksCollection(Collection, Model) {
    'use strict';

    return Collection.extend({
        url  : '/tracks',
        model: Model
    });
});
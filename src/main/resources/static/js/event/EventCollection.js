define([
    'event/EventModel',
    'common/Collection'
], function (EventModel, Collection) {

    'use strict';

    return Collection.extend({
        url  : '/events',
        model: EventModel
    });

});
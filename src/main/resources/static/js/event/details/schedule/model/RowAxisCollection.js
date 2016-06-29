define([
    'event/details/schedule/model/RowAxisModel',
    'backbone'
], function RowAxisCollection(Model) {

    'use strict';

    return Backbone.Collection.extend({
        model: Model
    });
});
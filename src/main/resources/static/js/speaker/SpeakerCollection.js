define([
    'speaker/Speaker',
    'backbone'
], function (Speaker) {

    'use strict';

    return Backbone.Collection.extend({
        url  : '/speakers',
        model: Speaker
    });

});



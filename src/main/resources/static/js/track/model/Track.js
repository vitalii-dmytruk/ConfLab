define([
    'backbone'
], function Track() {

    'use strict';

    return Backbone.Model.extend({

        defaults: {
            title   : null,
            capacity: null
        }
    });
});
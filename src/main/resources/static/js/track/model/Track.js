define([
    'backbone'
], function Track() {

    'use strict';

    return Backbone.Model.extend({

        defaults: {
            name   : null,
            capacity: null
        }
    });
});
define([
    'backbone'
], function Track() {

    'use strict';

    return Backbone.Model.extend({

        defaults: function () {
            return {
                id      : null,
                name    : null,
                capacity: null
            }
        }
    });
});
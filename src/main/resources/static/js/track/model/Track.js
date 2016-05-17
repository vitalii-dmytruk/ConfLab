define([
    'backbone'
], function Track() {

    'use strict';

    return Backbone.Model.extend({
        urlRoot: '/tracks',

        defaults: function () {
            return {
                id      : null,
                name    : null,
                capacity: null
            }
        },

        validation: {
            name    : {
                required : true,
                maxLength: 255
            },
            capacity: {
                range: [0, 10000000]
            }
        }
    });
});
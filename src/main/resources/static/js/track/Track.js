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
                capacity: 0
            }
        },

        validation: {
            name    : {
                required : true,
                maxLength: 255
            },
            capacity: {
                required: false,
                range   : [0, 10000000]
            }
        }
    });
});
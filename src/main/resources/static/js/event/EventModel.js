define([
    'backbone'
], function () {

    'use strict';

    return Backbone.Model.extend({
        urlRoot: '/events',

        defaults: function () {
            return {
                id         : null,
                name       : '',
                description: '',
                startDate  : '',
                endDate    : ''
            }
        }
    });
});
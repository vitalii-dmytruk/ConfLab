define([
    'backbone'
], function () {

    'use strict';

    return Backbone.Model.extend({
        urlRoot: '/speeches',

        defaults: function () {
            return {
                id         : null,
                title      : '',
                description: '',
                lang       : ''
            }
        }
    });
});
define([
    'backbone'
], function () {

    'use strict';

    return Backbone.Model.extend({
        urlRoot: '/speakers',

        defaults: function () {
            return {
                id      : null,
                name    : '',
                position: '',
                about   : '',
                email   : ''
            }
        }
    });
});

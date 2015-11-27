define([
    'backbone'
], function () {

    'use strict';

    return Backbone.Model.extend({
        urlRoot: '/speakers',

        defaults: function () {
            return {
                name    : '',
                position: '',
                about   : '',
                email   : ''
            }
        }
    });
});

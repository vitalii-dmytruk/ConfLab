define([
    'backbone'
], function (Backbone) {

    'use strict';

    return Backbone.Model.extend({

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
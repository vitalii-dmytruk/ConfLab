define([
    'backbone'
], function (Backbone) {

    'use strict';

    return Backbone.Model.extend({
        url     : 'users/current',
        defaults: {
            username       : '',
            email          : '',
            firstName      : '',
            lastName       : '',
            isAuthenticated: false,
            redirectFrom   : ''
        }
    });
});

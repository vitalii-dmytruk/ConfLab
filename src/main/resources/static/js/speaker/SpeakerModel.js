define([
    'backbone'
], function () {

    'use strict';

    return Backbone.Model.extend({
        urlRoot: '/speakers',

        defaults       : function () {
            return {
                id      : null,
                name    : '',
                position: '',
                about   : '',
                email   : '',
                speeches: []
            }
        },
        validation     : {
            name    : {
                required : true,
                minLength: 5,
                maxLength: 40,
                msg      : 'Please enter a valid name'
            },
            email   : {
                required : true,
                pattern  : 'email',
                maxLength: 255,
                msg      : 'Please enter a valid email',
                fn       : 'withoutCyrillic'
            },
            position: {
                maxLength: 255,
                msg      : 'Please enter a valid position information'
            }
        },
        withoutCyrillic: function (value) {
            var indexOf = /^[a-zA-Z.-_@]+$/.test(value);
            if (!indexOf) {
                return 'Value is invalid';
            }
        }
    });
});
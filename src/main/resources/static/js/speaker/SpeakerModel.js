define([
    'common/Model',
    'backbone'
], function (Model) {

    'use strict';

    return Model.extend({
        urlRoot: '/speakers',

        defaults  : function () {
            return {
                id      : null,
                name    : '',
                position: '',
                about   : '',
                email   : '',
                company : {}
            }
        },
        validation: {
            name    : {
                required : true,
                minLength: 2,
                maxLength: 40
            },
            email   : {
                required : true,
                pattern  : 'email',
                maxLength: 255
            },
            position: {
                maxLength: 255
            }
        }
    });
});
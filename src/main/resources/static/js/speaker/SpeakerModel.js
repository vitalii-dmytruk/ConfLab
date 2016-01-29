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
                company : null
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
            },
            company : function (company) {
                if(company && company.name && company.name.length > 255){
                    return "Company name should not be longer than 255 characters."
                }
            }
        }
    });
});
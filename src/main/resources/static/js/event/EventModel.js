define([
    'common/Model',
    'backbone'
], function (Model) {

    'use strict';

    return Model.extend({
        urlRoot: '/events',

        defaults  : function () {
            return {
                id         : null,
                name       : '',
                description: '',
                startDate  : '',
                country    : '',
                city       : '',
                address    : '',
                endDate    : '',
                contacts   : '',
                speakers   : []
            }
        },
        validation: {
            name   : {
                required : true,
                minLength: 3,
                maxLength: 40
            },
            address: {
                required : false,
                minLength: 2,
                maxLength: 255
            },
            city   : {
                required : false,
                minLength: 2,
                maxLength: 80
            },
            country: {
                required : false,
                minLength: 2,
                maxLength: 80
            },
            endDate: function (value, attr, computedState) {
                if (value < computedState.startDate) {
                    return "End date can not be earlier than start date";
                }
            }
        }
    });
});
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
            name     : {
                required : true,
                minLength: 3,
                maxLength: 40
            },
            address  : {
                required : false,
                minLength: 2,
                maxLength: 255
            },
            city     : {
                required : false,
                minLength: 2,
                maxLength: 80
            },
            country  : {
                required : false,
                minLength: 2,
                maxLength: 80
            },
            contacts : {
                required : false,
                maxLength: 255
            },
            startDate: function (value) {
                return validateDate(value);
            },
            endDate  : function (value, attr, computedState) {
                var validateMsg = validateDate(value);
                if (validateMsg) {
                    return validateMsg;
                }
                if (new Date(value).getTime() < new Date(computedState.startDate).getTime()) {
                    return 'End date can not be earlier than start date';
                }
            }
        }
    });

    function validateDate(date) {
        if (new Date(date).getYear() + 1900 > 9999) {
            return 'Year can not be larger than 9999';
        }
    }
});
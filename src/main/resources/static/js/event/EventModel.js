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
                speakers   : []
            }
        },
        validation: {
            name   : {
                required : true,
                minLength: 3,
                maxLength: 40
            },
            endDate: function (value, attr, computedState) {
                if (value < computedState.startDate) {
                    return "End date can not be earlier than start date";
                }
            }
        }
    });
});
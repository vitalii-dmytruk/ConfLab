define([
    'common/Model',
    'backbone'
], function (Model) {

    'use strict';

    return Model.extend({
        urlRoot: '/speeches',

        defaults  : function () {
            return {
                id         : null,
                title      : '',
                description: '',
                lang       : null
            }
        },
        validation: {
            title: {
                required : true,
                maxLength: 255
            },
            lang : function (value) {
                if (value != null && value.length > 8) {
                    return "Language must be at most 8 characters";
                }
            }
        }
    });
});
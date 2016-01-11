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
                lang       : ''
            }
        },
        validation: {
            title: {
                required : true,
                maxLength: 255
            },
            lang : {
                maxLength: 8,
                msg      : 'Language must be at most 8 characters'
            }
        }
    });
});
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
            }
        }
    });
});
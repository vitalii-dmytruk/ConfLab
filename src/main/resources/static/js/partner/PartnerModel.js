define([
    'common/Model',
    'backbone'
], function PartnerModel(Model) {

    'use strict';

    return Model.extend({
        urlRoot: '/companies',

        defaults  : function () {
            return {
                id  : null,
                name: '',
                url : ''
            }
        },
        validation: {
            name: {
                required : true,
                minLength: 1,
                maxLength: 255
            },
            url : {
                required : false,
                pattern: 'url',
                msg    : 'Please enter a valid URL (e.g. http://www.example.com)'
            }
        }
    });
});
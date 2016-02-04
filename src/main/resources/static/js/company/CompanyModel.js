define([
    'common/image/ImageModel',
    'backbone'
], function CompanyModel(ImageModel) {

    'use strict';

    var MAIN_URL = '/companies';

    return ImageModel.extend({
        urlRoot: MAIN_URL,

        defaults  : function () {
            return {
                id  : null,
                name: '',
                url : '',
                image: null
            }
        },
        validation: {
            name: {
                required : true,
                minLength: 1,
                maxLength: 255
            },
            url : [{
                required: false
            }, {
                maxLength: 255
            }, {
                pattern: 'url',
                msg    : 'Please enter a valid URL (e.g. http://www.example.com)'
            }]
        },

        getUrl: function () {
            return MAIN_URL + '/' + this.get('id') + "/logo";
        }
    });
});
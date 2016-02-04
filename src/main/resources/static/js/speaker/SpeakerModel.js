define([
        'common/image/ImageModel',
        'backbone',
        'jquery'
    ], function (ImageModel) {

        'use strict';

        var MAIN_URL = '/speakers';
        return ImageModel.extend({
            urlRoot: MAIN_URL,

            defaults  : function () {
                return {
                    id      : null,
                    name    : '',
                    position: '',
                    about   : '',
                    email   : '',
                    company : null,
                    image   : null
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
                    if (company && company.name && company.name.length > 255) {
                        return "Company name should not be longer than 255 characters."
                    }
                }
            },

            getUrl: function () {
                return MAIN_URL + '/' + this.get('id') + "/avatar";
            }
        });
    }
);
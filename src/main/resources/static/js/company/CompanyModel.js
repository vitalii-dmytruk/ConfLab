define([
    'common/Model',
    'backbone'
], function CompanyModel(Model) {

    'use strict';

    return Model.extend({
        urlRoot: '/companies',

        defaults  : function () {
            return {
                id  : null,
                name: '',
                url : '',
                image: '/img/default-logo.png'
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

        sync: function (method, model, options) {
            if (method === 'create' || method === 'update') {
                options = _.extend(options || {}, {
                    contentType: false,
                    data       : getFormData(this)
                });
            }
            return Backbone.sync(method, model, options);
        }
    });
    function getFormData(model) {
        var formData = new FormData(),
            fileName = 'logo.png',
            fileData = model.image;

        if (fileData) {
            formData.append('image', fileData, fileName);
        }

        formData.append('company', new Blob([JSON.stringify(model.toJSON())], {
            type: "application/json"
        }));

        return formData;
    }
});
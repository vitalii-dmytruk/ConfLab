define([
    'common/Model',
    'backbone'
], function (Model) {

    'use strict';

    return Model.extend({
        urlRoot: '/speakers',

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
                if(company && company.name && company.name.length > 255){
                    return "Company name should not be longer than 255 characters."
                }
            }
        },

        sync: function (method, model, options) {
            if (method === 'create') {
                options = _.extend(options || {}, {
                    contentType: false,
                    data       : getFormData(this)
                });
            }
            return Backbone.sync(method, model, options);
        }
    });

    function getFormData(model) {

        var formData;
        var fileData;

        fileData = $('input[name="image"]')[0].files[0];
        model.attributes.image= fileData.name;
        formData = new FormData();
        formData.append('speaker', new Blob([JSON.stringify(model.toJSON())], {
            type: "application/json"
        }));
        formData.append('image', fileData);
        return formData;
    }
});
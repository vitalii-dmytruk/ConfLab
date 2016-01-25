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
        var formData     = new FormData();
        var $avatarInput = $('#upload-avatar-button');
        var fileName;
        var fileData     = $('#imagebase64').val();

        if ($avatarInput[0].files != null && fileData) {
            fileName               = $avatarInput[0].files[0].name;
            model.attributes.image = fileName;
            formData.append('image', dataURItoBlob(fileData), fileName);
        }

        formData.append('speaker', new Blob([JSON.stringify(model.toJSON())], {
            type: "application/json"
        }));

        return formData;
    }

    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else {
            byteString = unescape(dataURI.split(',')[1]);
        }

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type: mimeString});
    }
});
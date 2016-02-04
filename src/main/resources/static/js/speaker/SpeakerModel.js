define([
        'common/Model',
        'backbone',
        'jquery'
    ], function (Model) {

        'use strict';

        var MAIN_URL = '/speakers';
        return Model.extend({
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
            saveImage : function () {
                return this.image ? buildUpdateImagePromise(this) : buildNoImagePromise(this);
            }
        });


        function buildNoImagePromise(model) {
            var promise;
            if (model.get('image') && model.isDeleted) {
                promise = $.ajax({
                    url    : getUrl(model),
                    type   : 'DELETE',
                    success: function () {
                        model.set('image', null);
                    }
                });
            } else {
                promise = $.Deferred().resolve();
            }

            return promise;
        }

        function buildUpdateImagePromise(model) {

            return $.ajax({
                url        : getUrl(model),
                type       : model.get('image') ? 'PUT' : 'POST',
                contentType: false,
                data       : getFormData(model),
                dataType   : 'text',
                processData: false,
                success    : function (response) {
                    model.set('image', response);
                }
            });
        }

        function getUrl(model) {
            return MAIN_URL + '/' + model.get('id') + "/avatar";
        }

        function getFormData(model) {
            var formData = new FormData(),
                fileName = 'avatar.png',
                fileData = model.image;

            fileData && formData.append('image', fileData, fileName);

            return formData;
        }
    }
);